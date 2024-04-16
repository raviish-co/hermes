<script setup lang="ts">
import { CatalogService } from "~/lib/frontend/services/catalog_service";
import type { ConditionModel } from "~/lib/frontend/models/condition";

type Variation = {
    variationId: string;
    name: string;
    value?: string;
    values: string[];
};

const GOOD = "Bom";
const BAD = "Mau";

const name = ref<string>("");
const price = ref<number>();
const categoryId = ref<string>("");
const sectionId = ref<string>("");
const condition = ref<ConditionModel>({ status: "Bom" });
const tag = ref<string>("");
const tags = ref<string[]>([]);

const selectedVariations = ref<Variation[]>([]);
const showVariations = ref<boolean>(false);
const isGood = ref<boolean>(true);

const service = new CatalogService();
const variations = await service.listVariations();
const categories = await service.listCategories();
const sections = await service.listSections();

const isValid = computed(() => {
    if (!categoryId.value) return !!name.value && !!price.value;

    if (isGood.value) return isNotEmpy() && verifyVariations();

    return isNotEmpy() && !!condition.value.comment && verifyVariations();
});

function isNotEmpy() {
    return !!name.value && !!price.value && !!categoryId.value;
}

function verifyVariations() {
    if (selectedVariations.value.length === 0) return true;

    return selectedVariations.value.every((variation) => !!variation.value);
}

function addTag() {
    if (!tag.value) return;

    tags.value.push(tag.value);
    tag.value = "";
}

function removeTag(index: number) {
    tags.value.splice(index, 1);
}

function chooseCategory(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const category = categories.find((category) => category.name === value)!;

    categoryId.value = category.categoryId;
    name.value = category.name;

    if (category.variationsIds.length === 0) {
        selectedVariations.value = [];
        showVariations.value = false;
        return;
    }

    showVariations.value = true;

    const variationsIds = category.variationsIds;

    selectedVariations.value = variations.filter((v) => variationsIds.includes(v.variationId));
}

function chooseSection(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    sectionId.value = value;
}

function chooseVariation(event: Event, variation: Variation) {
    const value = (event.target as HTMLSelectElement).value;
    variation.value = value;
}

function makeVariations() {
    return selectedVariations.value.map((variation) => ({
        variationId: variation.variationId,
        name: variation.name,
        value: variation.value!,
    }));
}

function changeStatus(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (value === GOOD) {
        isGood.value = true;
        condition.value = { status: GOOD, comment: "" };
        return;
    }

    isGood.value = false;
    condition.value.status = BAD;
}

function register() {
    const variationValues = makeVariations();

    const data = {
        name: name.value,
        price: price.value!,
        categoryId: categoryId.value,
        sectionId: sectionId.value,
        variations: variationValues,
        comment: condition.value.comment,
        tags: tags.value,
    };

    service
        .registerItem(data)
        .then((res) => alert(res.message))
        .catch((err) => alert(err.statusMessage));
}
</script>
<template>
    <div class="section-content">
        <h1 class="page-title">Registrar artigo</h1>
        <div class="space-y-4">
            <select class="input-field" @change="chooseCategory">
                <option value selected disabled>Categoria</option>
                <option v-for="category in categories" :key="category.categoryId">
                    {{ category.name }}
                </option>
            </select>

            <select class="input-field" @change="chooseSection">
                <option value selected disabled>Secção</option>
                <option
                    v-for="section in sections"
                    :key="section.sectionId"
                    :value="section.sectionId"
                >
                    {{ section.name }}
                </option>
            </select>

            <div v-if="showVariations" class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div v-for="variation in selectedVariations" :key="variation.variationId">
                    <select class="input-field" @change="chooseVariation($event, variation)">
                        <option selected disabled>{{ variation.name }}</option>
                        <option v-for="value in variation.values" :key="value">
                            {{ value }}
                        </option>
                    </select>
                </div>
            </div>

            <input class="input-field" type="text" placeholder="Nome" v-model="name" />
            <input class="input-field" type="number" placeholder="Preço" v-model="price" />

            <div class="input-container">
                <select class="input-field" @change="changeStatus">
                    <option selected value="Bom">Bom</option>
                    <option value="Mau">Mau</option>
                </select>

                <input
                    type="text"
                    placeholder="Escreva uma nota sobre o estado atual do artigo."
                    v-model="condition.comment"
                    :class="isGood ? 'input-disabled' : 'input-field'"
                />
            </div>

            <div
                class="flex flex-col flex-wrap sm:flex-row border border-light-500 bg-white placeholder:text-light-500 focus:ring-0 focus:border-primary"
            >
                <div
                    class="flex flex-wrap gap-2"
                    :class="{
                        'p-0': tags.length === 0,
                        'p-2': tags.length > 0,
                    }"
                >
                    <span
                        v-for="(tag, idx) in tags"
                        class="badge-light cursor-pointer"
                        @click="removeTag(idx)"
                    >
                        {{ tag }}
                    </span>
                </div>
                <input
                    class="w-full border-0 bg-transparent focus:ring-0 focus:border-primary"
                    placeholder="Tags para o artigo"
                    v-model="tag"
                    @keypress.enter="addTag()"
                />
            </div>

            <button class="btn bg-secondary-500" :disabled="!isValid" @click="register()">
                Registrar
            </button>
        </div>
    </div>
</template>
