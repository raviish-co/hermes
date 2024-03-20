<script setup lang="ts">
import type { AddLineDialog, DescribeCondition } from "#build/components";
import type { Condition } from "~/lib/frontend/models/condition";

const describeConditionRef = ref<typeof DescribeCondition>();
const addLineDialogRef = ref<typeof AddLineDialog>();

function showDecribeCondition(itemId: string, condition?: Condition) {
    describeConditionRef.value?.initializeCondition(itemId, condition);
    describeConditionRef.value?.show();
}

function showItems() {
    addLineDialogRef.value?.show();
}

defineProps(["note"]);
</script>
<template>
    <VNote @add="showItems()" @clear-lines="note.clearLines()">
        <div class="overflow-y-auto">
            <table class="table">
                <thead>
                    <tr class="text-left">
                        <th class="min-w-20 w-20">Id</th>
                        <th class="min-w-64 w-64">Artigo</th>
                        <th class="min-w-20 w-20 text-center">Qtd</th>
                        <th class="min-w-24 w-24 text-center">Preço Unid (Kz)</th>
                        <th class="min-w-24 w-24 text-center">Total (Kz)</th>
                        <th class="min-w-8 w-8"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(line, idx) in note.lines" :key="idx" class="cursor-pointer">
                        <td>{{ line.itemId }}</td>
                        <td @click="showDecribeCondition(line.itemId, line.condition)">
                            {{ line.name }}

                            <br />

                            <span class="text-light-600 text-sm">
                                {{ line.formatVariationValues }}
                            </span>
                        </td>

                        <td>
                            <ChooseQuantity
                                :initital="1"
                                :limit="line.stock"
                                :model-value="line.quantity"
                                @update-quantity="note.changeQuantity(line.itemId, $event)"
                            />
                        </td>

                        <td class="text-center">{{ line.formattedPrice }}</td>
                        <td class="text-center">{{ line.formattedTotal }}</td>

                        <td
                            class="cursor-pointer text-center"
                            @click="note.removeLine(line.itemId)"
                        >
                            <span class="material-symbols-outlined">close</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </VNote>

    <AddLineDialog ref="addLineDialogRef" :note="note" />

    <DescribeCondition ref="describeConditionRef" :note="note" />
</template>
