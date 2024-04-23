<script setup lang="ts">
import type { ItemModel } from "~/lib/frontend/models/item";
import { CatalogService } from "~/lib/frontend/services/catalog_service";

const item = ref<ItemModel>({
    itemId: "",
    name: "",
    price: 0,
    stock: 0,
    sectionId: "",
    categoryId: "",
    variationsValues: [],
    tags: [],
});

const catalog = useCatalog();
const route = useRoute();
const itemId = route.params.id as string;
const service = new CatalogService();

const isDisabled = computed(() => {
    if (!item.value.name || !item.value.price) return true;

    if (item.value.condition?.status !== "Bom" && item.value.condition!.comment!.length === 0)
        return true;

    const category = catalog.findCategory(item.value.categoryId!);
    if (category && item.value.variationsValues) {
        if (category.variationsIds.length > item.value.variationsValues.length) return true;
    }

    return false;
});

function save() {
    service
        .updateItem(itemId, {
            ...item.value,
            comment: item.value.condition?.comment,
            variations: item.value.variationsValues,
        })
        .then(() => {
            alert("Artigo salvo com sucesso!");
            navigateTo("/items");
        })
        .catch((err) => alert(err.statusMessage));
}

onBeforeMount(() => {
    catalog
        .getItem(itemId)
        .then((res) => (item.value = res))
        .catch((err) => {
            alert(err.statusMessage);
            navigateTo("/items");
        });

    catalog.listCategories();
});
</script>

<template>
    <div class="section-content">
        <h1 class="page-title">Editar artigo</h1>

        <div class="space-y-4">
            <ChooseCategory
                :category="catalog.findCategory(item.categoryId ?? '')"
                :old-variations="item.variationsValues"
                @category="item.categoryId = $event"
                @variation="item.variationsValues = $event"
                @clear="() => (item.variationsValues = [])"
            />

            <ChooseSection :sectionId="item.sectionId" @section="item.sectionId = $event" />

            <input class="input-field" type="text" placeholder="Nome" v-model="item.name" />

            <input class="input-field" type="number" placeholder="Preço" v-model="item.price" />

            <ChooseCondition :condition="item?.condition" @condition="item.condition = $event" />

            <InputTags :old-tags="item.tags" @tags="item.tags = $event" />

            <button class="btn bg-secondary-500" :disabled="isDisabled" @click="save()">
                Salvar
            </button>
        </div>
    </div>
</template>
