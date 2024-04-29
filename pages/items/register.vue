<script setup lang="ts">
import { CatalogService } from "~/lib/frontend/services/catalog_service";

const item = reactive({
    name: "",
    price: "",
    sectionId: "",
    categoryId: "",
    variationsValues: [],
    condition: { status: "Bom", comment: "" },
});

const catalog = useCatalog();
const tags = ref<string[]>([]);

const service = new CatalogService();

const isDisabled = computed(() => {
    if (!item.name || !item.price) return true;

    const category = catalog.findCategory(item.categoryId)!;

    if (category.variationsIds.length > item.variationsValues.length) return true;

    if (item.condition.status === "Mau" && item.condition.comment!.length === 0) return true;

    return false;
});

function register() {
    const data = {
        name: item.name,
        price: Number(item.price),
        categoryId: item.categoryId,
        sectionId: item.sectionId,
        variations: item.variationsValues,
        comment: item.condition.comment,
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
        <h1 class="page-title">Registar artigo</h1>

        <div class="space-y-4">
            <ChooseCategory
                :category="catalog.findCategory(item.categoryId)!"
                @item-name="item.name = $event"
                @category-id="item.categoryId = $event"
                @variation="item.variationsValues = $event"
                @clear="() => (item.variationsValues = [])"
            />

            <ChooseSection @section-id="item.sectionId = $event" />

            <input class="input-field" type="text" placeholder="Nome" v-model="item.name" />

            <input class="input-field" type="number" placeholder="Preço" v-model="item.price" />

            <ChooseCondition
                @status="item.condition.status = $event"
                @comment="item.condition.comment = $event"
            />

            <InputTags @tags="tags = $event" />

            <button class="btn bg-secondary-500" :disabled="isDisabled" @click="register()">
                Registrar
            </button>
        </div>
    </div>
</template>
