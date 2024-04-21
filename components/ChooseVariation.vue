<script setup lang="ts">
import type { VariationModel } from "~/lib/frontend/models/variation";
import type { VariationValueModel } from "~/lib/frontend/models/variation_value";

interface Props {
    variation?: VariationModel;
    oldVariation?: VariationValueModel[];
    viewOldVariation?: boolean;
    selectedVariations?: Variation[];
}

interface Emits {
    (e: "variation", value: Variation): void;
}

interface Variation {
    variationId: string;
    name: string;
    value: string;
}

const catalog = useCatalog();
const selectedVariation = ref<Variation>();
const viewOptions = ref<boolean>(false);

function toggle() {
    viewOptions.value = !viewOptions.value;
}

function chooseVariation(variationId: string, name: string, value: string) {
    selectedVariation.value = {
        variationId: variationId,
        name: name,
        value: value,
    };

    emits("variation", selectedVariation.value);
}

defineProps<Props>();
const emits = defineEmits<Emits>();

onMounted(() => catalog.listVariations());
</script>

<template>
    <div
        v-if="variation"
        class="relative input-field form-select cursor-pointer space-x-0"
        @click="toggle()"
    >
        <div v-if="viewOldVariation">
            {{ oldVariation?.find((o) => o.variationId === variation?.variationId)?.fulltext }}
        </div>

        <div v-else>
            <span v-if="selectedVariations?.length === 0">{{ variation.name }}</span>
            <span v-else>
                {{
                    selectedVariation
                        ? `${selectedVariation.name}: ${selectedVariation.value}`
                        : variation.name
                }}
            </span>
        </div>

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
