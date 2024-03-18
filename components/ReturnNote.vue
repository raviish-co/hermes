<script setup lang="ts">
import type { Condition } from "~/lib/frontend/models/condition";
import type { ChooseNoteLine, DescribeCondition } from "#build/components";
import { formatVariationValues } from "@frontend/helpers/format_variation_values";

const describeConditionRef = ref<typeof DescribeCondition>();
const chooseNoteLineRef = ref<typeof ChooseNoteLine>();

function showDecribeCondition(itemId: string, condition?: Condition) {
    describeConditionRef.value?.initializeCondition(itemId, condition);
    describeConditionRef.value?.show();
}

function showRequestedLines() {
    if (props.requestedLines.length === props.note.lines.length) return;

    chooseNoteLineRef.value?.show();
}

const props = defineProps(["note", "requestedLines"]);
</script>
<template>
    <BaseNote @add="showRequestedLines()" @clear-lines="note.clearLines()">
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
                    <tr v-for="(line, idx) in note.lines" :key="idx" class="cursor-pointer">
                        <td>{{ line.itemId }}</td>
                        <td @click="showDecribeCondition(line.itemId, line.condition)">
                            {{ line.name }}

                            <br />

                            <span class="text-light-600 text-sm">
                                {{ formatVariationValues(line.variationValues) }}
                            </span>
                        </td>

                        <td>
                            <ChooseQuantity
                                :initital="line.quantity"
                                :limit="line.maxToReturn"
                                :model-value="line.quantity"
                                @update-quantity="line.changeQuantity($event)"
                            />
                        </td>

                        <td class="text-center">{{ line.quantityRequested }}</td>
                        <td class="text-center">{{ line.quantityReturned }}</td>

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
    </BaseNote>

    <DescribeCondition ref="describeConditionRef" :note="note" />
    <ChooseNoteLine ref="chooseNoteLineRef" :note="note" :lines="requestedLines" />
</template>
