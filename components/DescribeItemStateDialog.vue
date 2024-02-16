<script setup lang="ts">
import type { VDialog } from "#build/components";
import { ItemStateOption, type RequestItem } from "~/lib/models/item";
import { ItemCategory } from "~/server/backend/domain/catalog/item";

interface Props {
    row: RequestItem;
}

const pros = defineProps<Props>();

const dialogRef = ref<typeof VDialog>();
const status = ref<string>("");
const comment = ref<string>("");

const isGoodState = computed(() => status.value !== ItemStateOption.Bad);

function showDialog() {
    dialogRef.value?.show();
}

function canUpdateState(): boolean {
    const options = Object.values(ItemStateOption);

    if (!options.includes(status.value as ItemStateOption)) {
        alert("Selecione um estado!");
        return false;
    }

    if (
        status.value === ItemStateOption.Bad &&
        (comment.value === undefined || comment.value === "")
    ) {
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

function initializeItemState(state: ItemStateOption, note: string) {
    (status.value = state as ItemStateOption), (comment.value = note);
}

defineExpose({ show: showDialog, initializeItemState });
</script>

<template>
    <VDialog ref="dialogRef" title="Descrever danos do artigo" class="max-w-[30rem]">
        <VSelect value="status" placeholder="Estado" :options="Object.values(ItemStateOption)" />

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
