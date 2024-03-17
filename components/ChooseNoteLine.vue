<script setup lang="ts">
import type VDialog from "./VDialog.vue";
import { formatVariationValues } from "@frontend/helpers/format_variation_values";
import { initializeQuantities } from "@frontend/helpers/initialize_quantities";

const dialogRef = ref<typeof VDialog>();
const quantities = ref<number[]>([]);
const props = defineProps(["note", "lines"]);

function show() {
    quantities.value = initializeQuantities(props.lines.length);
    dialogRef.value?.show();
}

defineExpose({ show });
</script>

<template>
    <VDialog ref="dialogRef" title="Escolher artigo" class="max-w-[36rem]">
        <div class="w-full overflow-x-auto">
            <table class="table">
                <thead>
                    <tr class="text-left">
                        <th class="min-w-12 w-12">ID</th>
                        <th class="min-w-36 w-36">Nome</th>
                        <th class="min-w-12 w-12 md:w-16 text-center">QTD</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(line, idx) in lines"
                        class="hover:bg-gray-50"
                        :key="line.itemId"
                        :class="{ hidden: note.isSameLine(line.itemId) }"
                    >
                        <td>{{ line.itemId }}</td>
                        <td class="cursor-pointer" @click="note.addLine(line, quantities[idx])">
                            <span>{{ line.name }}</span>
                            <br />
                            <span class="text-light-600 text-xs sm:text-sm">
                                {{ formatVariationValues(line.variationValues) }}
                            </span>
                        </td>
                        <td>
                            <ChooseQuantity
                                :initital="1"
                                :limit="line.maxToReturn"
                                :model-value="quantities[idx]"
                                @update-quantity="quantities[idx] = $event"
                                @enter="note.addLine(line, quantities[idx])"
                                @tab="note.addLine(line, quantities[idx])"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </VDialog>
</template>
