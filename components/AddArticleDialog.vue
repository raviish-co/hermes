<script setup lang="ts">
import type { VDialog } from "#build/components";
import type { Article, ArticleVariation, RequestArticle } from "~/lib/models/article";

interface Props {
    article: Article;
    requestList: RequestArticle[];
}

const dialogRef = ref<typeof VDialog>();
const quantities = ref<number[]>([]);
const total = ref<number>(0);
const props = defineProps<Props>();

function defineQuantity(idx: number, quantity: string) {
    if (parseInt(quantity) > 0) {
        quantities.value[idx] = Number(quantity);
    }
}

function quantityNotDefined() {
    return quantities.value.length === 0;
}

function isTheSameRequestArticle(article: RequestArticle) {
    return props.requestList.some((r) => r.id === article.id);
}

function isTheSameVariations(variations: ArticleVariation[]) {
    return props.requestList.find((ra) => ra.variations?.at(0) === variations);
}

function makeRequestArticle(article: Article, quantity: number, varitations?: ArticleVariation[]) {
    return {
        ...article,
        requestId: new Date().getTime().toString(),
        quantity: quantity,
        total: total.value,
        variations: varitations ? [varitations] : [],
    };
}

function addArticleWithoutVariations() {
    if (quantityNotDefined()) {
        dialogRef.value?.close();
        return;
    }

    const quantity = quantities.value[0];

    const requestArticle = makeRequestArticle(props.article, quantity);

    if (isTheSameRequestArticle(requestArticle)) return;

    props.requestList.push(requestArticle);

    dialogRef.value?.close();

    quantities.value = [];

    return;
}

function addArticleToRequestList(): void {
    if (!props.article.variations) {
        addArticleWithoutVariations();
        return;
    }

    const requestArticles: RequestArticle[] = [];

    props.article.variations?.forEach((variations, idx) => {
        const quantity = quantities.value[idx];
        if (quantity > 0) {
            const requestArticle = makeRequestArticle(props.article, quantity, variations);

            if (isTheSameVariations(variations) && quantity === requestArticle.quantity) return;

            requestArticles.push(requestArticle);
        }
    });

    props.requestList.push(...requestArticles);

    quantities.value = [];

    dialogRef.value?.close();
}

function showDialog() {
    dialogRef.value?.show();
}

defineExpose({ show: showDialog });
</script>

<template>
    <VDialog ref="dialogRef" title="Adicionar artigo a lista de solicitação" class="max-w-[40rem]">
        <div class="flex items-center gap-x-4 w-full">
            <h2 class="font-medium flex-1">{{ article?.id }} # {{ article?.name }}</h2>

            <div v-if="!article?.variations">
                <VInput
                    v-if="!article?.isUnique"
                    type="number"
                    placeholder="QTD"
                    @update:model-value="(quantity: string) => defineQuantity(0, quantity)"
                    class="max-w-24"
                    default="1"
                />
            </div>
        </div>

        <div class="w-full" v-if="article?.variations">
            <div
                v-for="(variations, idx) in article?.variations"
                :key="idx"
                class="flex gap-x-4 items-center p-2 mb-1"
            >
                <div class="flex flex-1 gap-x-2 cursor-pointer">
                    <div v-for="variation in variations" class="flex space-x-1">
                        <span>{{ variation.name }}</span>
                        <span> : </span>
                        <span>{{ variation.value }}</span>
                    </div>
                </div>

                <span class="px-2 py-1 bg-secondary-600 rounded-3xl text-sm text-white">
                    3 em stock
                </span>

                <VInput
                    v-if="!article.isUnique"
                    type="number"
                    class="max-w-24"
                    placeholder="QTD"
                    @update:model-value="(quantity: string) => defineQuantity(idx, quantity)"
                />
            </div>
        </div>

        <button class="btn-secondary" @click="addArticleToRequestList">Adicionar</button>
    </VDialog>
</template>
