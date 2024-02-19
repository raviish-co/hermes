<script setup lang="ts">
import type { VDialog } from "#build/components";
import type { GoodsIssueItem } from "~/lib/frontend/models/goods_issue_item";

export type ConditionStatus = "Bom" | "Mau";

interface Props {
    row: GoodsIssueItem;
}

const pros = defineProps<Props>();

const dialogRef = ref<typeof VDialog>();
const newStatus = ref<string>("");
const newComment = ref<string>("");
const options = ["Bom", "Mau"];
const BAD = "Mau";
const GOOD = "Bom";

const isGoodState = computed(() => newStatus.value !== BAD);

function showDialog() {
    dialogRef.value?.show();
}

function verifyComment(): boolean {
    if (newStatus.value === BAD && !newComment.value) {
        alert("Escreva uma nota relacionada ao estado do artigo.");
        return false;
    }

    return true;
}

function updateItemState() {
    if (!verifyComment()) return;

    if (newStatus.value === GOOD) {
        newComment.value = "";
    }

    pros.row.condition = {
        status: newStatus.value as ConditionStatus,
        comment: newComment.value,
    };

    dialogRef.value?.close();
}

function updateStatus(e: Event) {
    const s = (e.target as HTMLSelectElement).value;
    newStatus.value = s;
}

function initializeItemState(status: ConditionStatus, comment: string) {
    newStatus.value = status;
    newComment.value = comment;
}

defineExpose({ show: showDialog, initializeItemState });
</script>

<template>
    <VDialog ref="dialogRef" title="Descrever danos do artigo" class="max-w-[30rem]">
        <select class="input-field" @change="updateStatus">
            <option v-for="opt in options">{{ opt }}</option>
        </select>

        <textarea
            v-model="newComment"
            placeholder="Descrever o estado do artigo"
            :rows="3"
            :disabled="isGoodState"
            class="input-field resize-none"
        />

        <button class="btn-secondary" @click="updateItemState">Salvar</button>
    </VDialog>
</template>
~/lib/frontend/models/item
