<script setup lang="ts">
import type { VDialog } from "#build/components";
import type { GoodsIssueItem } from "~/lib/frontend/models/goods_issue_item";

export type Status = "Bom" | "Mau";

interface Props {
    item: GoodsIssueItem;
}

const BAD = "Mau";
const GOOD = "Bom";

const pros = defineProps<Props>();

const dialogRef = ref<typeof VDialog>();
const newStatus = ref<string>("");
const newComment = ref<string>("");
const statusOptions = ["Bom", "Mau"];

const isGoodState = computed(() => newStatus.value !== BAD);

function showDialog() {
    dialogRef.value?.show();
}

function verifyIfCommentIsRequired(): boolean {
    if (newStatus.value === BAD && !newComment.value) {
        alert("Escreva uma nota relacionada ao estado do artigo.");
        return false;
    }

    return true;
}

function updateItemStatus() {
    if (!verifyIfCommentIsRequired()) return;

    if (newStatus.value === GOOD) {
        newComment.value = "";
    }

    pros.item.condition = {
        status: newStatus.value as Status,
        comment: newComment.value,
    };

    dialogRef.value?.close();
}

function updateStatus(e: Event) {
    const status = (e.target as HTMLSelectElement).value;
    newStatus.value = status;
}

function initializeItemState(status: Status, comment: string) {
    newStatus.value = status;
    newComment.value = comment;
}

defineExpose({ show: showDialog, initializeItemState });
</script>

<template>
    <VDialog ref="dialogRef" title="Descrever estado do artigo" class="max-w-[30rem]">
        <select class="input-field" @change="updateStatus">
            <option v-for="opt in statusOptions">{{ opt }}</option>
        </select>

        <textarea
            v-model="newComment"
            placeholder="Escreva uma nota sobre o estado atual do artigo."
            :rows="3"
            :disabled="isGoodState"
            class="input-field resize-none"
        />

        <button class="btn-secondary" @click="updateItemStatus">Salvar</button>
    </VDialog>
</template>
