<script setup lang="ts">
import type { VDialog } from "#build/components";
import { ProductState } from "~/lib/models/product";

const dialogRef = ref<typeof VDialog>();
const productState = ref<string>("");

const isGoodState = computed(() => productState.value !== ProductState.Bad);

const stateOptions = computed(() => {
    return [ProductState.Good, ProductState.Bad];
});

function changeProductState(state: string) {
    productState.value = state;
}

function showDialog() {
    dialogRef.value?.show();
}

function updateProductState() {
    dialogRef.value?.close();
}

defineExpose({ show: showDialog });
</script>

<template>
    <VDialog ref="dialogRef" title="Descrever danos do artigo" class="max-w-[30rem]">
        <VSelect
            v-model="productState"
            placeholder="Estado"
            :options="stateOptions"
            @update:model-value="changeProductState"
        />

        <textarea
            placeholder="Descrever o estado do artigo"
            :rows="3"
            :disabled="isGoodState"
            class="input-field resize-none"
        />

        <button class="btn-secondary" @click="updateProductState">Salvar</button>
    </VDialog>
</template>
~/lib/models/product
