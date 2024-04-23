<script setup lang="ts">
import { CatalogService } from "~/lib/frontend/services/catalog_service";
import type { ConditionModel } from "~/lib/frontend/models/condition";
import type { VariationModel } from "~/lib/frontend/models/variation";

interface Variation {
    variationId: string;
    name: string;
    value: string;
}

const item = reactive({
    name: "",
    price: "",
    tags: [],
    sectionId: "",
    categoryId: "",
});

const condition = ref<ConditionModel>({ status: "Bom", comment: "" });
const selectedVariations = ref<Variation[]>([]);
const variationsIds = ref<string[]>([]);
const tags = ref<string[]>([]);
const catalog = useCatalog();
const { categories } = catalog;

const service = new CatalogService();

const isDisabled = computed(() => {
    if (!item.name || !item.price) return true;

    if (toValue(variationsIds).length > toValue(selectedVariations).length) return true;

    if (toValue(condition).status === "Mau" && toValue(condition).comment!.length === 0)
        return true;

    return false;
});

function chooseCategory(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const category = catalog.findCategory(value)!;

    // Adicionar os valores das variações ao nome do item
    item.categoryId = value;
    item.name = category.name;

    variationsIds.value = category.variationsIds;

    if (category.variationsIds.length === 0) {
        selectedVariations.value = [];
        return;
    }
}

function chooseVariation(variation: VariationModel, idx: number, event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    selectedVariations.value = selectedVariations.value ?? [];
    selectedVariations.value[idx] = {
        variationId: variation.variationId,
        name: variation.name,
        value: value,
    };
}

function register() {
    const data = {
        name: item.name,
        price: Number(item.price),
        categoryId: item.categoryId,
        sectionId: item.sectionId,
        variations: selectedVariations.value,
        comment: condition.value.comment,
        tags: tags.value,
    };

    service
        .registerItem(data)
        .then((res) => alert(res.message))
        .then(() => {
            navigateTo("/items");
        })
        .catch((err) => alert(err.statusMessage));
}

onMounted(() => {
    catalog.listCategories();
    catalog.listVariations();
});
</script>
<template>
    <div class="section-content">
        <h1 class="page-title">Registrar artigo</h1>

        <div class="space-y-4">
            <select class="input-field" @change="chooseCategory">
                <option value selected disabled>Categoria</option>
                <option
                    v-for="category in categories"
                    :key="category.categoryId"
                    :value="category.categoryId"
                >
                    {{ category.name }}
                </option>
            </select>

            <div v-if="variationsIds.length > 0" class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div
                    v-for="(variation, idx) in catalog.filterVariations(variationsIds)"
                    :key="variation.variationId"
                >
                    <select class="input-field" @change="chooseVariation(variation, idx, $event)">
                        <option selected disabled>{{ variation.name }}</option>
                        <option v-for="value in variation.values" :key="value">
                            {{ value }}
                        </option>
                    </select>
                </div>
            </div>

            <ChooseSection @section="item.sectionId = $event" />

            <input class="input-field" type="text" placeholder="Nome" v-model="item.name" />

            <input class="input-field" type="number" placeholder="Preço" v-model="item.price" />

            <ChooseCondition @condition="condition = $event" />

            <InputTags @tags="tags = $event" />

            <button class="btn bg-secondary-500" :disabled="isDisabled" @click="register()">
                Registrar
            </button>
        </div>
    </div>
</template>
