<script setup lang="ts">
import type { ItemModel } from "~/lib/frontend/models/item";

const item = ref<ItemModel>({
    itemId: "",
    name: "",
    price: 0,
    stock: 0,
    sectionId: "",
    categoryId: "",
    variationsValues: [],
});

const variations = ref<object[]>([]);
const catalog = useCatalog();
const route = useRoute();

const isDisabled = computed(() => {
    if (item.value.name.length === 0) return true;

    if (!item.value.price) return true;

    if (item.value.condition?.status !== "Bom" && item.value.condition!.comment!.length === 0)
        return true;

    const category = catalog.findCategory(item.value.categoryId!);
    if (category && category.variationsIds.length > variations.value.length) return true;

    return false;
});

function save() {
    alert("Artigo salvo com sucesso!");
    navigateTo("/items");
}

let oldVariation: any[] = [];
onBeforeMount(() => {
    catalog
        .getItem(route.params.id as string)
        .then((res) => {
            item.value = res;
            oldVariation = res.variationsValues ?? [];
        })
        .catch(() => {
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
                :old-variation="oldVariation"
                @category="item.categoryId = $event"
                @variation="item.variationsValues = $event"
            />

            <ChooseSection :sectionId="item.sectionId" @section="item.sectionId = $event" />

            <input class="input-field" type="text" placeholder="Nome" v-model="item.name" />

            <input class="input-field" type="number" placeholder="Preço" v-model="item.price" />

            <ChooseCondition :condition="item?.condition" @condition="item.condition = $event" />

            <InputTags :tags="item.tags ? item.tags : []" />

            <button class="btn bg-secondary-500" :disabled="isDisabled" @click="save()">
                Salvar
            </button>
        </div>
    </div>
</template>
