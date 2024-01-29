<script setup lang="ts">
import type { VDialog } from "#build/components";
import { formatCurrency } from "~/lib/helpers/formatCurrency";
import type { Article, ArticleVariation, RequestArticle } from "~/lib/models/article";

interface Props {
    article: Article;
    requestList: RequestArticle[];
}

interface Emits {
    (e: "added"): void;
}

const dialogRef = ref<typeof VDialog>();
const quantities = ref<number[]>([]);
const total = ref<string>("0");
const props = defineProps<Props>();
const emits = defineEmits<Emits>();

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

function calculateTotal(quantity: number): string {
    const price = Number(props.article.price.replace(",", "."));
    const total = price * quantity;
    return formatCurrency(total);
}

function addArticleWithoutVariations() {
    if (quantityNotDefined()) {
        dialogRef.value?.close();
        return;
    }

    const quantity = quantities.value[0];

    total.value = calculateTotal(quantity);

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
            total.value = calculateTotal(quantity);

            const requestArticle = makeRequestArticle(props.article, quantity, variations);

            if (isTheSameVariations(variations) && quantity === requestArticle.quantity) return;

            requestArticles.push(requestArticle);
        }
    });

    props.requestList.push(...requestArticles);

    quantities.value = [];
    dialogRef.value?.close();

    emits("added");
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
                <input v-model="quantities[0]" type="number" class="max-w-24" placeholder="QTD" />
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

                <input v-model="quantities[idx]" type="number" class="max-w-24" placeholder="QTD" />
            </div>
        </div>

        <button class="btn-secondary" @click="addArticleToRequestList">Adicionar</button>
    </VDialog>
</template>
