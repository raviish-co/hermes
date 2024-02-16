<script setup lang="ts">
import type { VDialog } from "#build/components";
import { ItemStateOption, type RequestItem } from "~/lib/models/item";

interface Props {
    row: RequestItem;
}

const pros = defineProps<Props>();

const dialogRef = ref<typeof VDialog>();
const status = ref<string>("");
const comment = ref<string>("");
const options = Object.values(ItemStateOption);

const isGoodState = computed(() => status.value !== ItemStateOption.Bad);

function showDialog() {
    status.value = ItemStateOption.Good;
    comment.value = "";
    dialogRef.value?.show();
}

function canUpdateState(): boolean {
    if (status.value === ItemStateOption.Bad && !comment.value) {
        alert("Descreva o estado do artigo.");
        return false;
    }

    return true;
}

function updateItemState() {
    if (!canUpdateState()) return;

    if (status.value === ItemStateOption.Good) {
        comment.value = "";
    }

    pros.row.state = {
        status: status.value as ItemStateOption,
        comment: comment.value,
    };

    dialogRef.value?.close();
}

function updateStatus(e: Event) {
    const s = (e.target as HTMLSelectElement).value;
    status.value = s;
}

function initializeItemState(state: ItemStateOption, note: string) {
    (status.value = state as ItemStateOption), (comment.value = note);
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
