<script setup lang="ts">
import type { VDialog } from "#build/components";
import type { GoodsIssueLine } from "@frontend/models/goods_issue";

export type Status = "Bom" | "Mau";

interface Props {
    line: GoodsIssueLine;
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

function updateLineStatus() {
    if (!verifyIfCommentIsRequired()) return;

    if (newStatus.value === GOOD) {
        newComment.value = "";
    }

    pros.line.condition = {
        status: newStatus.value as Status,
        comment: newComment.value,
    };

    dialogRef.value?.close();
}

function updateStatus(e: Event) {
    const status = (e.target as HTMLSelectElement).value;
    newStatus.value = status;
}

function initializeLineState(status: Status, comment: string) {
    newStatus.value = status;
    newComment.value = comment;
}

defineExpose({ show: showDialog, initializeLineState });
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

        <button class="btn-secondary" @click="updateLineStatus">Salvar</button>
    </VDialog>
</template>
