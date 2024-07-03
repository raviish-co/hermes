<script setup lang="ts">
import type { ChooseNoteLine, DescribeReturnCondition } from "#build/components";
import type { GoodsIssueNote } from "~/lib/frontend/domain/goods_issue_note";
import type { GoodsIssueNoteLine } from "~/lib/frontend/domain/goods_issue_note_line";
import type { GoodsReturnNote } from "~/lib/frontend/domain/goods_return_note";
import type { NoteLine } from "~/lib/frontend/domain/note_line";

interface Emits {
    (e: "invalid-line", value: boolean): boolean;
}

interface Props {
    goodsReturnNote: GoodsReturnNote;
    goodsIssueNote: GoodsIssueNote;
    isReturned: boolean;
    quantities: number[];
}
const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const describeConditionRef = ref<typeof DescribeReturnCondition>();
const chooseNoteLineRef = ref<typeof ChooseNoteLine>();
const hasEmptyQuantity = computed(() => props.quantities.some((q) => q.toString() === ""));

function showDecribeCondition(line: NoteLine) {
    if (line.isFullyReturned()) return;

    describeConditionRef.value?.show(line.itemId, line.totalToReturn);
}

function addLine(line: GoodsIssueNoteLine, quantity: number) {
    props.goodsReturnNote.addLine(line, quantity);
    props.goodsReturnNote.updateQuantitiesToReturn(line.itemId, quantity, 0);

    const i = props.goodsReturnNote.lines.findIndex((l) => l.itemId === line.itemId);

    props.quantities[i] = quantity;

    emits("invalid-line", false);
}

function removeLine(itemId: string) {
    props.goodsReturnNote.removeLine(itemId);

    if (props.goodsReturnNote.lines.length === 0) emits("invalid-line", true);
}

function clearLines() {
    props.goodsReturnNote.clearLines();
    emits("invalid-line", true);
}

function showRequestedLines() {
    if (props.goodsIssueNote.lines.length === props.goodsReturnNote.lines.length) return;
    chooseNoteLineRef.value?.show();
}

function changeLineQuantity(line: NoteLine, quantity: number) {
    line.updateQuantitiesToReturn(quantity, 0);

    if (hasEmptyQuantity) {
        emits("invalid-line", true);
        return;
    }

    emits("invalid-line", false);
}

function updateQuantity(data: { itemId: string; total: number }) {
    const line = props.goodsReturnNote.lines.find((l) => l.itemId === data.itemId);

    if (!line) return;

    const idx = props.goodsReturnNote.lines.indexOf(line);

    props.quantities[idx] = Number(data.total);

    emits("invalid-line", hasEmptyQuantity.value);
}
</script>
<template>
    <VNote
        :show-buttons="!props.isReturned"
        @add="showRequestedLines()"
        @clear-lines="clearLines()"
    >
        <div class="overflow-y-auto">
            <table class="table">
                <thead>
                    <tr class="text-left">
                        <th class="min-w-20 w-20">Id</th>
                        <th class="min-w-64 w-64">Artigo</th>
                        <th class="min-w-20 w-20 text-center">A Devolver</th>
                        <th class="min-w-24 w-24 text-center">Solicitados</th>
                        <th class="min-w-24 w-24 text-center">Devolvidos</th>
                        <th class="min-w-8 w-8"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(line, idx) in goodsReturnNote.lines"
                        :key="idx"
                        class="cursor-pointer"
                    >
                        <td>{{ line.itemId }}</td>
                        <td @click="showDecribeCondition(line)">
                            {{ line.name }}
                            <br />
                            <span class="text-light-600 text-sm">
                                {{ line.formattedVariationsValues }}
                            </span>
                        </td>

                        <td class="text-center">
                            <input
                                type="number"
                                class="input-number text-center"
                                placeholder="QTD"
                                v-model="quantities[idx]"
                                min="1"
                                :max="line.totalToReturn"
                                :required="true"
                                :disabled="line.isFullyReturned()"
                                @input="changeLineQuantity(line, quantities[idx])"
                            />
                        </td>

                        <td class="text-center">{{ line.quantityRequested }}</td>
                        <td class="text-center">{{ line.quantityReturned }}</td>
                        <td
                            v-if="!line.isFullyReturned()"
                            class="cursor-pointer text-center"
                            @click="removeLine(line.itemId)"
                        >
                            <span class="material-symbols-outlined">close</span>
                        </td>
                        <td v-else></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </VNote>

    <DescribeReturnCondition
        ref="describeConditionRef"
        :note="goodsReturnNote"
        @update-quantity="updateQuantity"
    />

    <ChooseNoteLine
        ref="chooseNoteLineRef"
        :note="goodsReturnNote"
        :lines="goodsIssueNote.lines ?? []"
        @choose-line="addLine"
    />
</template>
