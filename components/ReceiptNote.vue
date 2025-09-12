<script setup lang="ts">
import type { AddLineDialog, DescribeCondition } from "#components";
import type { GoodsReceiptNote } from "~/lib/frontend/domain/goods_receipt_note";
import type { NoteLine } from "~/lib/frontend/domain/note_line";

const describeConditionRef = ref<typeof DescribeCondition>();
const addLineDialogRef = ref<typeof AddLineDialog>();

function showDecribeCondition(line: NoteLine) {
    describeConditionRef.value?.initializeCondition(line.itemId, line.condition);
    describeConditionRef.value?.initializeQuantities(line.quantity, line.badQuantities);
    describeConditionRef.value?.show();
}

function showItems() {
    addLineDialogRef.value?.show();
}

defineProps<{ note: GoodsReceiptNote }>();
</script>
<template>
    <VNote @add="showItems()" @clear-lines="note.clearLines()">
        <div class="overflow-y-auto">
            <table class="table">
                <thead>
                    <tr class="text-left">
                        <th class="min-w-20 w-20">Id</th>
                        <th class="min-w-64 w-64">Artigo</th>
                        <th class="min-w-64 w-64">Preço de Consignação</th>
                        <th class="min-w-20 w-20 text-center">Qtd</th>
                        <th class="min-w-8 w-8"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(line, idx) in note.lines" :key="idx" class="cursor-pointer">
                        <td>{{ line.itemId }}</td>
                        <td @click="showDecribeCondition(line)">
                            {{ line.name }}

                            <br />

                            <span class="text-light-600 text-sm">
                                {{ line.formattedVariationsValues }}
                            </span>
                        </td>

                        <td>
                            <input
                                type="number"
                                class="input-number text-center"
                                placeholder="Preço de Consignação"
                                min="1000"
                                :value="line.consignmentPrice"
                                @input="line.changeConsignmentPrice(line.consignmentPrice)"
                                :required="true"
                            />
                        </td>

                        <td>
                            <ChooseQuantity
                                :initital="1"
                                :model-value="line.quantity"
                                @update-quantity="note.changeQuantity(line.itemId, $event)"
                            />
                        </td>

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

    <AddLineDialog ref="addLineDialogRef" :note="note" :has-limit="false" />

    <DescribeCondition ref="describeConditionRef" :note="note" />
</template>
