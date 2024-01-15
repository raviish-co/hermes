<script setup lang="ts">
import { ARTICLES } from "~/lib/data/articles";
import type { VDialog } from "#build/components";
import type { Article } from "~/lib/models/article";

interface Emits {
    (e: "select", article: Article): void;
}

const dialogRef = ref<typeof VDialog>();
const emits = defineEmits<Emits>();

function emitSelectedArticle(article: Article) {
    dialogRef.value?.close();
    emits("select", article);
}

function showDialog() {
    dialogRef.value?.show();
}

defineExpose({ show: showDialog });
</script>

<template>
    <VDialog ref="dialogRef" title="Pesquisar Artigo">
        <VInput placeholder="Pesquisar por Nome ou ID" type="search" />

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="article in ARTICLES" :key="article.id">
                    <td class="w-16">{{ article.id }}</td>
                    <td class="w-96" @click="emitSelectedArticle(article)">
                        {{ article.name }}
                    </td>
                    <td>
                        <span
                            v-if="article.isUnique"
                            class="px-2 py-1 bg-secondary-600 rounded-3xl text-sm text-white"
                        >
                            Único
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <p>Paginação</p>
    </VDialog>
</template>
