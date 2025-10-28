<script setup lang="ts">
import type { VariationModel } from "@frontend/models/variation";
import type { VariationValueModel } from "@frontend/models/variation_value";

interface Props {
    variation: VariationModel;
    oldVariation?: VariationValueModel;
}

interface Emits {
    (e: "variation", value: VariationValueModel): void;
}

const catalog = useCatalog();
const selectedVariation = ref<VariationValueModel>();
const viewOptions = ref<boolean>(false);
const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const result = computed(() => {
    if (!props.oldVariation && !selectedVariation.value) {
        return props.variation.name;
    }

    if (props.oldVariation && !selectedVariation.value) return props.oldVariation.fulltext;

    if (selectedVariation.value && !props.oldVariation) {
        return selectedVariation.value.fulltext;
    }

    if (selectedVariation.value && props.oldVariation) return selectedVariation.value.fulltext;

    return selectedVariation.value;
});

function toggle() {
    viewOptions.value = !viewOptions.value;
}

function chooseVariation(variationId: string, name: string, value: string) {
    selectedVariation.value = {
        variationId: variationId,
        name: name,
        value: value,
        fulltext: `${name}: ${value}`,
    };

    emits("variation", selectedVariation.value);
}

onMounted(() => catalog.listVariations());
</script>

<template>
    <div class="relative input-field form-select cursor-pointer space-x-0" @click="toggle()">
        <div>{{ result }}</div>

        <div
            class="w-full h-48 mt-4 border bg-white absolute left-0 overflow-y-auto z-10 shadow-md"
            v-show="viewOptions"
        >
            <ul>
                <li
                    class="px-3 py-2"
                    v-for="value in variation.values"
                    @click="chooseVariation(variation.variationId, variation.name, value)"
                >
                    {{ value }}
                </li>
            </ul>
        </div>
    </div>
</template>
