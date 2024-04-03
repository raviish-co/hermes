<script setup lang="ts">
import type VDialog from "./VDialog.vue";
import { initializeQuantities } from "@frontend/helpers/initialize_quantities";
import type { GoodsIssueNoteLine } from "~/lib/frontend/domain/goods_issue_note_line";
import type { GoodsReturnNote } from "~/lib/frontend/domain/goods_return_note";

interface Props {
    note: GoodsReturnNote;
    lines: GoodsIssueNoteLine[];
}

interface Emits {
    (e: "chooseLine", line: GoodsIssueNoteLine, quantity: number): void;
}

const dialogRef = ref<typeof VDialog>();
const quantities = ref<number[]>([]);

const props = defineProps<Props>();

function show() {
    quantities.value = initializeQuantities(props.lines.length);
    dialogRef.value?.show();
}

defineEmits<Emits>();
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
                        <td
                            class="cursor-pointer"
                            @click="$emit('chooseLine', line, quantities[idx])"
                        >
                            <span>{{ line.name }}</span>
                            <br />
                            <span class="text-light-600 text-xs sm:text-sm">
                                {{ line.formattedVariationsValues }}
                            </span>
                        </td>
                        <td>
                            <ChooseQuantity
                                :initital="1"
                                :limit="line.maxToReturn"
                                :model-value="quantities[idx]"
                                @update-quantity="quantities[idx] = $event"
                                @enter="$emit('chooseLine', line, quantities[idx])"
                                @tab="$emit('chooseLine', line, quantities[idx])"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </VDialog>
</template>
