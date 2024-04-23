<script setup lang="ts">
import type { CategoryModel } from "~/lib/frontend/models/category";
import type { VariationModel } from "~/lib/frontend/models/variation";
import type { VariationValueModel } from "~/lib/frontend/models/variation_value";

interface Props {
    category?: CategoryModel;
    oldVariations?: VariationValueModel[];
}

interface Emits {
    (e: "category", value: string): void;
    (e: "variation", value: any): void;
    (e: "clear"): void;
}

const catalog = useCatalog();
const variations = ref<VariationModel[]>([]);
const selectedVariations = ref<VariationValueModel[]>([]);
const viewOldVariation = ref<boolean>(true);

const result = computed(() => {
    if (props.oldVariations) return props.oldVariations;
    return selectedVariations.value;
});

function chooseCategory(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    viewOldVariation.value = false;
    selectedVariations.value = [];

    emits("category", value);
    emits("variation", selectedVariations.value);
    emits("clear");
}

function emit(i: number, value: any) {
    selectedVariations.value[i] = value;
    emits("variation", selectedVariations.value);
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

onMounted(() => {
    catalog.listVariations();
    catalog.listCategories();
});
</script>

<template>
    <select class="input-field" @change="chooseCategory($event)">
        <option disabled :selected="category?.categoryId === undefined">Categoria</option>
        <option
            v-for="c in toValue(catalog.categories)"
            :key="c.categoryId"
            :selected="c.categoryId === category?.categoryId"
            :value="c.categoryId"
        >
            {{ c.name }}
        </option>
    </select>

    <div
        class="grid grid-cols-1 gap-4 my-4 sm:grid-cols-4"
        :class="{ hidden: category?.variationsIds.length === 0 }"
    >
        <ChooseVariation
            v-for="(v, idx) in catalog.filterVariations(category?.variationsIds)"
            :key="v.variationId"
            :old-variation="result[idx]"
            :variation="v"
            :view-old-variation="viewOldVariation"
            @variation="emit(idx, $event)"
        />
    </div>
</template>
