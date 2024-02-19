<script setup lang="ts">
import type { VDialog } from "#build/components";
import { type ConditionStatus, type ItemModel } from "~/lib/models/item";

interface Props {
    row: ItemModel;
}

enum ItemStatus {
    Good = "Bom",
    Bad = "Mau",
}

const pros = defineProps<Props>();

const dialogRef = ref<typeof VDialog>();
const status = ref<string>("");
const comment = ref<string>("");
const options = Object.values(ItemStatus);

const isGoodState = computed(() => status.value !== ItemStatus.Bad);

function showDialog() {
    status.value = ItemStatus.Good;
    comment.value = "";
    dialogRef.value?.show();
}

function canUpdateState(): boolean {
    if (status.value === ItemStatus.Bad && !comment.value) {
        alert("Descreva o estado do artigo.");
        return false;
    }

    return true;
}

function updateItemState() {
    if (!canUpdateState()) return;

    if (status.value === ItemStatus.Good) {
        comment.value = "";
    }

    pros.row.condition = {
        status: status.value as ConditionStatus,
        comment: comment.value,
    };

    dialogRef.value?.close();
}

function updateStatus(e: Event) {
    const s = (e.target as HTMLSelectElement).value;
    status.value = s;
}

function initializeItemState(s: ConditionStatus, note: string) {
    status.value = s;
    comment.value = note;
}

defineExpose({ show: showDialog, initializeItemState });
</script>

<template>
    <VDialog ref="dialogRef" title="Descrever danos do artigo" class="max-w-[30rem]">
        <select class="input-field" @change="updateStatus">
            <option v-for="opt in options">{{ opt }}</option>
        </select>

        <textarea
            v-model="comment"
            placeholder="Descrever o estado do artigo"
            :rows="3"
            :disabled="isGoodState"
            class="input-field resize-none"
        />

        <button class="btn-secondary" @click="updateItemState">Salvar</button>
    </VDialog>
</template>
