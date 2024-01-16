<script setup lang="ts">
import type { VDialog } from "#build/components";
import { ArticleState } from "~/lib/models/article";

const dialogRef = ref<typeof VDialog>();
const articleState = ref<string>("");
const isGoodState = computed(() => articleState.value !== ArticleState.Bad);
const stateOptions = computed(() => {
    return [ArticleState.Good, ArticleState.Bad];
});

function changeArticleState(state: string) {
    articleState.value = state;
}

function showDialog() {
    dialogRef.value?.show();
}

function updateArticleState() {
    dialogRef.value?.close();
}

defineExpose({ show: showDialog });
</script>

<template>
    <VDialog ref="dialogRef" title="Descrever danos do artigo" class="max-w-[30rem]">
        <VSelect
            v-model="articleState"
            placeholder="Estado"
            :options="stateOptions"
            @update:model-value="changeArticleState"
        />

        <textarea
            placeholder="Descrever o estado do artigo"
            :rows="3"
            :disabled="isGoodState"
            class="input-field resize-none"
        />

        <button class="btn-secondary" @click="updateArticleState">Salvar</button>
    </VDialog>
</template>
