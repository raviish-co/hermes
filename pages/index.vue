<script setup lang="ts">
import type { VDialog } from "#build/components";
import { PURPOSES, PurposeName } from "~/lib/data/purposes";
import { ARTICLES } from "~/lib/data/articles";
import type { Article, RequestRow } from "~/lib/models/article";

const dialogRef = ref<typeof VDialog>();
const selectedSections = ref<string[]>([]);
const selectedPlaceholder = ref<string>("Descrição");
const isDisabledInputText = ref<boolean>(false);
const currentVariationName = ref<string>("");
const currentVariationItems = ref<string[]>([]);
const currentVariationItem = ref<string>("");
const requestList = ref<RequestRow[]>([]);

function getPurposeNames(): string[] {
    return PURPOSES.map((p) => p.name);
}

const isDisabledSection = computed(() => selectedSections.value.length <= 0);

function findSectionByPurpose(name: string): void {
    PURPOSES.find((purpose) => {
        if (purpose.name === name) {
            changePlaceholder(purpose.placeholder!);
            disableInputDescription(name);
            updateSelectedSections(purpose.sections);
        }
    });
}

function changePlaceholder(placeholder: string): void {
    selectedPlaceholder.value = placeholder;
}

function disableInputDescription(purposeName: string): void {
    if (purposeName === PurposeName.Donation) {
        isDisabledInputText.value = true;
        return;
    }

    isDisabledInputText.value = false;
}

function updateSelectedSections(sections?: string[]) {
    if (!sections) {
        selectedSections.value = [];
        return;
    }

    selectedSections.value = sections;
}

function showDialog() {
    dialogRef.value?.show();
}

function findItemsByVariationName(article: Article): void {
    article.variations?.map((v) => {
        if (v.name === currentVariationName.value) {
            currentVariationItems.value = v.items;
        }
    });
}

function updateVariationName(e: Event, article: Article): void {
    const variationName = (e.target as HTMLSelectElement).value;
    currentVariationName.value = variationName;
    findItemsByVariationName(article);
}

function updateVariationItem(e: Event) {
    const variationItem = (e.target as HTMLSelectElement).value;
    currentVariationItem.value = variationItem;
}

function isTheSameVariation(rows: RequestRow[]): boolean {
    return rows.some(
        (row) =>
            currentVariationName.value === row.variationName &&
            currentVariationItem.value === row.variationItem
    );
}

function addArticleToRequestList(article: Article): void {
    console.log(currentVariationItem.value);
    console.log(currentVariationName.value);

    if ((!currentVariationItem.value || !currentVariationName.value) && article.variations) {
        return;
    }

    const rows = requestList.value.filter((a) => a.id === article.id);

    if (isTheSameVariation(rows)) return;

    requestList.value.push({
        id: article.id,
        name: article.name,
        isUnique: article.isUnique,
        variationItem: currentVariationItem.value,
        variationName: currentVariationName.value,
        quantity: 0,
        total: 0,
        price: article.price,
        securityDeposit: article.securityDeposit,
    });

    currentVariationItem.value = "";
    currentVariationName.value = "";
}
</script>

<template>
    <div class="w-full h-36 bg-slate-600"></div>

    <section class="section-content">
        <section class="flex items-center mb-11 mt-4">
            <h1 class="flex-1 text-center">Guia de Saída de Artigos</h1>
            <span class="text-2xl cursor-pointer">...</span>
        </section>
        <section>
            <form class="mb-6">
                <div class="flex items-center gap-x-3 mb-4">
                    <VInput placeholder="John Doe" :disabled="true" />
                    <VInput placeholder="Data prevista para a devolução[dd/mm/aaaa]" type="date" />
                </div>
                <div class="flex items-center gap-x-3 mb-4">
                    <VSelect
                        placeholder="Finalidade"
                        :options="getPurposeNames()"
                        @change="findSectionByPurpose"
                    />
                    <VSelect
                        placeholder="Secção"
                        :options="selectedSections"
                        :disabled="isDisabledSection"
                    />
                </div>
                <VInput
                    class="input-field"
                    :placeholder="selectedPlaceholder"
                    :disabled="isDisabledInputText"
                />
            </form>
        </section>
        <section>
            <div
                class="h-72 p-2 flex flex-col justify-between border border-gray-500 rounded overflow-hidden"
            >
                <div class="flex-1 overflow-y-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Item</th>
                                <th>QTD</th>
                                <th>Preço por unidade</th>
                                <th>Total</th>
                                <th>Caução</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(article, idx) in requestList" :key="idx">
                                <td>{{ article.id }}</td>
                                <td>{{ article.name }}</td>
                                <td v-if="!article.isUnique">
                                    <input type="number" value="1" />
                                </td>
                                <td>{{ article.price }}</td>
                                <td>0</td>
                                <td>{{ article.securityDeposit }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button class="btn w-full" @click="showDialog">Adicionar</button>
            </div>

            <p class="text-right space-x-1 mt-4">
                <span class="font-bold">Total:</span>
                <span>10.000,00</span>
            </p>
        </section>
        <div class="space-x-4">
            <button class="btn">Solicitar</button>
            <button class="btn">Cancelar</button>
        </div>
    </section>

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
                        <select
                            v-if="article.variations"
                            @change="(e) => updateVariationName(e, article)"
                            class="w-full border-none focus:ring-0"
                        >
                            <option selected>Variação</option>
                            <option
                                v-for="(variation, idx) in article.variations"
                                :key="idx"
                                :value="variation.name"
                            >
                                {{ variation.name }}
                            </option>
                        </select>
                    </td>
                    <td>
                        <select
                            v-if="article.variations"
                            @change="updateVariationItem"
                            class="w-full border-none focus:ring-0"
                        >
                            <option selected>Item</option>
                            <option
                                v-for="(item, idx) in currentVariationItems"
                                :key="idx"
                                :value="item"
                            >
                                {{ item }}
                            </option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <p>Paginação</p>
    </VDialog>
</template>
