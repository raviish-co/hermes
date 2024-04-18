<script setup lang="ts">
import type { ItemModel } from "~/lib/frontend/models/item";

const item = toValue(useState<ItemModel>("item"));
const variations = ref<object[]>([]);
const catalog = useCatalog();

const isDisabled = computed(() => {
    if (item.name.length === 0) return true;

    if (!item.price) return true;

    if (item.condition?.status !== "Bom" && item.condition!.comment!.length === 0) return true;

    const category = catalog.findCategory(item.categoryId!);
    if (category && category.variationsIds.length > variations.value.length) return true;

    return false;
});

function save() {
    alert("Artigo salvo com sucesso!");
    navigateTo("/items");
}

onMounted(() => {
    catalog.listCategories();
    variations.value = item.variationsValues ?? [];
});
</script>

<template>
    <div class="section-content">
        <h1 class="page-title">Editar artigo</h1>
        <div class="space-y-4">
            <ChooseCategory
                :category-id="item.categoryId"
                :old-variations="item.variationsValues"
                @category="item.categoryId = $event"
                @variation="variations = $event"
            />

            <ChooseSection :sectionId="item.sectionId" @section="item.sectionId = $event" />

            <input class="input-field" type="text" placeholder="Nome" v-model="item.name" />

            <input class="input-field" type="number" placeholder="Preço" v-model="item.price" />

            <ChooseCondition :condition="item.condition" @condition="item.condition = $event" />

            <InputTags :tags="item.tags ? item.tags : []" />

            <button class="btn bg-secondary-500" :disabled="isDisabled" @click="save()">
                Salvar
            </button>
        </div>
    </div>
</template>
