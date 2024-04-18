<script setup lang="ts">
import type { VariationModel } from "~/lib/frontend/models/variation";
import type { VariationValueModel } from "~/lib/frontend/models/variation_value";

interface Props {
    categoryId?: string;
    oldVariations?: VariationValueModel[];
}

interface Emits {
    (e: "category", value: string): void;
    (e: "variation", value: any): void;
}

let cache: string = "";
const catalog = useCatalog();
const variationsIds = ref<string[]>([]);
const variationsValues = ref<string[]>([]);
const selectedVariations = ref();

function chooseCategory(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const category = catalog.findCategory(value);
    variationsIds.value = category!.variationsIds;

    if (cache === value) {
        selectedVariations.value = props.oldVariations;
        emits("category", value);
        emits("variation", selectedVariations.value);
        return;
    }

    selectedVariations.value = [];
    catalog.filterVariations(variationsIds.value);
    emits("category", value);
    emits("variation", selectedVariations.value);
}

function chooseVariation(variation: VariationModel, idx: number, event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    selectedVariations.value = selectedVariations.value ?? [];
    selectedVariations.value[idx] = {
        variationId: variation.variationId,
        name: variation.name,
        value: variation.values.at(parseInt(value)),
    };

    emits("variation", selectedVariations.value);
}

const makeVariationsIds = () => {
    return props.oldVariations!.map((v) => v.variationId);
};

const makeVariationsValues = () => {
    return props.oldVariations!.map((v) => v.fulltext.split(": ").at(1) ?? "");
};

const emits = defineEmits<Emits>();
const props = defineProps<Props>();
onMounted(() => {
    catalog.listCategories();
    catalog.listVariations();

    variationsIds.value = makeVariationsIds();
    variationsValues.value = makeVariationsValues();
    selectedVariations.value = props.oldVariations;
    cache = props.categoryId as string;
});
</script>

<template>
    <select class="input-field" @change="chooseCategory($event)">
        <option disabled :selected="categoryId === undefined">Categoria</option>
        <option
            v-for="category in toValue(catalog.categories)"
            :key="category.categoryId"
            :selected="category.categoryId === categoryId"
            :value="category.categoryId"
        >
            {{ category.name }}
        </option>
    </select>

    <div
        v-show="variationsIds.length > 0"
        class="grid grid-cols-1 gap-4 my-4 sm:grid-cols-4"
        :class="{ hidden: !variationsIds.length }"
    >
        <div
            v-for="(variation, idx) in catalog.filterVariations(variationsIds)"
            @change="chooseVariation(variation, idx, $event)"
        >
            <select class="input-field">
                <option disabled :selected="categoryId !== cache">{{ variation.name }}</option>
                <option
                    v-for="value in variation.values"
                    :key="value"
                    :selected="categoryId === cache && variationsValues.includes(value)"
                    :value="variation.values.indexOf(value)"
                >
                    {{ value }}
                </option>
            </select>
        </div>
    </div>
</template>
