<script setup lang="ts">
import type { VDialog } from "#build/components";
import { ItemState } from "~/lib/models/item";

const dialogRef = ref<typeof VDialog>();
const itemState = ref<string>("");

const isGoodState = computed(() => itemState.value !== ItemState.Bad);

const stateOptions = computed(() => {
    return [ItemState.Good, ItemState.Bad];
});

function changeItemState(state: string) {
    itemState.value = state;
}

function showDialog() {
    dialogRef.value?.show();
}

function updateItemState() {
    dialogRef.value?.close();
}

defineExpose({ show: showDialog });
</script>

<template>
    <VDialog ref="dialogRef" title="Descrever danos do artigo" class="max-w-[30rem]">
        <VSelect
            v-model="itemState"
            placeholder="Estado"
            :options="stateOptions"
            @update:model-value="changeItemState"
        />

        <textarea
            placeholder="Descrever o estado do artigo"
            :rows="3"
            :disabled="isGoodState"
            class="input-field resize-none"
        />

        <button class="btn-secondary" @click="updateItemState">Salvar</button>
    </VDialog>
</template>
