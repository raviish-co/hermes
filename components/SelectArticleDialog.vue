<script setup lang="ts">
import type { VDialog } from "#build/components";
import { ARTICLES } from "~/lib/data/articles";
import type { Article } from "~/lib/models/article";
import { ArticleService } from "~/lib/services/article_service";

interface Emits {
    (e: "select", article: Article): void;
}

const dialogRef = ref<typeof VDialog>();
const emits = defineEmits<Emits>();
const query = ref<string>("");
const articles = ref<Article[]>([]);
const total = ref<number>(1);

const articleService = new ArticleService();

function emitSelectedArticle(article: Article) {
    dialogRef.value?.close();
    emits("select", article);
}

async function searchArticles() {
    if (query.value.length < 3) {
        articles.value = [];
        return;
    }

    articles.value = await articleService.searchArticles(query.value);
}

async function listArticles(pageToken: number = 1) {
    const { articles: a, total: t } = await articleService.listAtricles(pageToken);

    articles.value = a;
    total.value = t;
}

function showDialog() {
    dialogRef.value?.show();
}

defineExpose({ show: showDialog });

onMounted(async () => {
    await listArticles();
});
</script>

<template>
    <VDialog ref="dialogRef" title="Pesquisar Artigo" class="max-w-[30rem]">
        <VInput
            placeholder="Pesquisar por Nome ou ID"
            type="search"
            v-model="query"
            @update:model-value="searchArticles"
        />

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-if="articles" v-for="article in articles" :key="article.id">
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

                <tr v-if="articles.length === 0">
                    <td colspan="3">Nenhum resultado encontrado</td>
                </tr>
            </tbody>
        </table>

        <p>
            <ThePagination :total="total" @changed="listArticles" />
        </p>
    </VDialog>
</template>
