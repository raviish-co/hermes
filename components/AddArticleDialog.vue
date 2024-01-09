<script setup lang="ts">
import { ARTICLES } from "~/lib/data/articles";
import type { VDialog } from "#build/components";
import type { Article, Variation, RequestRow } from "~/lib/models/article";

interface Props {
    requestList: RequestRow[];
}

const dialogRef = ref<typeof VDialog>();
const currentVariationName = ref<string>("");
const currentVariationItems = ref<string[]>([]);
const currentVariationItem = ref<string>("");
const props = defineProps<Props>();

function addArticleToRequestList(article: Article): void {
    const requestRows = props.requestList.filter((a) => a.id === article.id);

    if ((isNotSetVariation() || isEmptyVariation()) && article.variations) return;

    if (isTheSameVariation(requestRows)) return;

    const newRequestRow = makeRequestRow(article);

    props.requestList.push(newRequestRow);

    currentVariationItem.value = "";
}

function getVariationNamesByArticle(variations: Variation[]) {
    return variations.map((v) => v.name);
}

function makeRequestRow(article: Article): RequestRow {
    return {
        id: article.id,
        name: article.name,
        isUnique: article.isUnique,
        variationItem: currentVariationItem.value,
        variationName: currentVariationName.value,
        quantity: 0,
        total: 0,
        price: article.price,
        securityDeposit: article.securityDeposit,
    };
}

function updateVariationName(variationName: string, article: Article): void {
    currentVariationName.value = variationName;
    findItemsByVariationName(article);
}

function isTheSameVariation(rows: RequestRow[]): boolean {
    return rows.some(
        (row) =>
            currentVariationName.value === row.variationName &&
            currentVariationItem.value === row.variationItem
    );
}

function findItemsByVariationName(article: Article): void {
    currentVariationItems.value = [];
    article.variations?.map((v) => {
        if (v.name === currentVariationName.value) {
            currentVariationItems.value = v.items;
        }
    });
}

function isEmptyVariation(): boolean {
    return !currentVariationItem.value || !currentVariationName.value;
}

function isNotSetVariation(): boolean {
    return currentVariationName.value === "Variação" || currentVariationItem.value === "Item";
}

function showDialog() {
    dialogRef.value?.show();
}

defineExpose({ show: showDialog });
</script>

<template>
    <VDialog ref="dialogRef" title="Pesquisar Artigo">
        <VInput class="max-w-sm" placeholder="Pesquisar por Nome ou ID" />

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Variação</th>
                    <th>Item da Variação</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(article, idx) in ARTICLES" :key="idx">
                    <td>{{ article.id }}</td>
                    <td @click="addArticleToRequestList(article)">{{ article.name }}</td>
                    <td>
                        <VSelect
                            v-if="article.variations"
                            v-model="currentVariationName"
                            placeholder="Variação"
                            :options="getVariationNamesByArticle(article.variations)"
                            @update:model-value="(v) => updateVariationName(v, article)"
                            class="w-full"
                        />
                    </td>
                    <td>
                        <VSelect
                            v-if="article.variations"
                            v-model="currentVariationItem"
                            :options="currentVariationItems"
                            placeholder="Item"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <p>Paginação</p>
    </VDialog>
</template>
