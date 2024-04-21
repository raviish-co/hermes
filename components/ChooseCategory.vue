<script setup lang="ts">
import type { CategoryModel } from "~/lib/frontend/models/category";
import type { VariationModel } from "~/lib/frontend/models/variation";
import type { VariationValueModel } from "~/lib/frontend/models/variation_value";

interface Props {
    category?: CategoryModel;
    oldVariation?: VariationValueModel[];
}

interface Emits {
    (e: "category", value: string): void;
    (e: "variation", value: any): void;
}

interface Variation {
    variationId: string;
    name: string;
    value: string;
}

const catalog = useCatalog();
const variations = ref<VariationModel[]>([]);
const selectedVariations = ref<Variation[]>([]);
const viewOldVariation = ref<boolean>(true);
const viewOptions = ref<boolean>(false);

function chooseCategory(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    viewOldVariation.value = false;
    selectedVariations.value = [];

    // catalog.variations.value = [];

    // const category = catalog.findCategory(value);
    // variations.value = catalog.filterVariations(category?.variationsIds);

    emits("category", value);
    emits("variation", variations.value);
}

// function chooseVariation(variation: VariationModel, idx: number, value: string) {
//     variations.value[idx] = {
//         variationId: variation.variationId,
//         name: variation.name,
//         value: value,
//     };

//     emits("variation", variations.value);
// }

function event() {
    viewOptions.value = !viewOptions.value;
    viewOldVariation.value = false;
}

function init() {
    viewOptions.value;
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
            :variation="v"
            :old-variation="oldVariation"
            :view-old-variation="viewOldVariation"
            :selectedVariations="selectedVariations"
            @variation="selectedVariations[idx] = $event"
        />
    </div>
</template>

<!-- <div
            v-show="viewOld"
            v-for="variation in old"
            class="input-field form-select cursor-pointer"
            @click="() => (viewOld = false)"
        >
            {{ variation.value }}
        </div>

        <div
            v-show="!viewOld"
            v-for="(variation, idx) in catalog.filterVariations(category?.variationsIds)"
        >
            <select
                class="input-field cursor-pointer"
                @change="chooseVariation(variation, idx, $event)"
            >
                <option disabled selected>{{ variation.name }}</option>
                <option
                    v-for="value in variation.values"
                    :key="value"
                    :value="variation.values.indexOf(value)"
                >
                    {{ value }}
                </option>
            </select>
        </div> 

    <div
        class="grid grid-cols-1 gap-4 my-4 sm:grid-cols-4"
        :class="{ hidden: category?.variationsIds.length === 0 }"
    >
        <div
            class="relative input-field form-select cursor-pointer space-x-0"
            v-for="(variation, idx) in catalog.filterVariations(category?.variationsIds)"
            @click="event()"
        >
            <span v-if="!viewOldVariation">{{ variation.name }}</span>

            <div v-if="viewOldVariation">{{ oldVariation?.[idx]?.fulltext }}</div>

            <span v-if="variations.length > 0">: {{ variations?.at(idx)?.value ?? "" }}</span>

            <div
                class="w-full h-48 mt-4 border bg-white absolute left-0 overflow-y-auto z-10 shadow-md"
                v-show="viewOptions && viewOldVariation === false"
            >
                <ul>
                    <li
                        class="px-3 py-2"
                        v-for="value in variation.values"
                        @click="chooseVariation(variation, idx, value)"
                    >
                        {{ value }}
                    </li>
                </ul>
            </div>
        </div> 
    </div>
-->
