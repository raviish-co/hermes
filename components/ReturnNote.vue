<script setup lang="ts">
import type { ChooseNoteLine, DescribeCondition } from "#build/components";
import type { GoodsIssueNote } from "~/lib/frontend/domain/goods_issue_note";
import type { GoodsReturnNote } from "~/lib/frontend/domain/goods_return_note";
import type { NoteLine } from "~/lib/frontend/domain/note_line";

interface Emits {
    (e: "invalid-line", value: boolean): boolean;
}

interface Props {
    returnNote: GoodsReturnNote;
    issueNote: GoodsIssueNote;
    isReturned: boolean;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const describeConditionRef = ref<typeof DescribeCondition>();
const chooseNoteLineRef = ref<typeof ChooseNoteLine>();

function showDecribeCondition(line: NoteLine) {
    describeConditionRef.value?.initializeCondition(line.itemId, line.condition);
    describeConditionRef.value?.show();
}

function changeQuantity(line: NoteLine, quantity: number) {
    if (quantity === 0) emits("invalid-line", true);

    if (quantity > 0) emits("invalid-line", false);

    line.changeQuantity(quantity);
}

function showRequestedLines() {
    if (props.issueNote.lines.length === props.returnNote.lines.length) return;
    chooseNoteLineRef.value?.show();
}
</script>
<template>
    <VNote
        @add="showRequestedLines()"
        @clear-lines="returnNote.clearLines()"
        :is-returned="isReturned"
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
                    <tr v-for="(line, idx) in returnNote.lines" :key="idx" class="cursor-pointer">
                        <td>{{ line.itemId }}</td>
                        <td @click="showDecribeCondition(line)">
                            {{ line.name }}

                            <br />

                            <span class="text-light-600 text-sm">
                                {{ line.formattedVariationsValues }}
                            </span>
                        </td>

                        <td class="text-center">
                            <ChooseQuantity
                                :initital="line.quantity"
                                :limit="line.maxToReturn"
                                :model-value="line.quantity"
                                :class="{ 'input-disabled border-none': line.isFullyReturned() }"
                                @update-quantity="changeQuantity(line, $event)"
                            />
                        </td>

                        <td class="text-center">{{ line.quantityRequested }}</td>
                        <td class="text-center">{{ line.quantityReturned }}</td>

                        <td
                            v-if="!line.isFullyReturned()"
                            class="cursor-pointer text-center"
                            @click="returnNote.removeLine(line.itemId)"
                        >
                            <span class="material-symbols-outlined">close</span>
                        </td>
                        <td v-else></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </VNote>

    <DescribeCondition ref="describeConditionRef" :note="returnNote" />
    <ChooseNoteLine ref="chooseNoteLineRef" :note="returnNote" :lines="issueNote.lines" />
</template>
