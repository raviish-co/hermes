<script setup lang="ts">
import type {
    AddArticleDialog,
    SelectArticleDialog,
    DescribeArticleStateDialog,
} from "#build/components";
import type { Article, ArticleVariation, RequestArticle } from "~/lib/models/article";
import { formatCurrency } from "~/lib/helpers/format_currency";
import type { Purpose } from "~/lib/models/purpose";
import { RequestService } from "~/lib/services/request_service";
import { convertToNumber } from "~/lib/helpers/convert_to_number";

const INNER_LAUNDRY = "Interna";
const DISCARD = "Descartar";
const selectArticleDialogRef = ref<typeof SelectArticleDialog>();
const addArticleDialogRef = ref<typeof AddArticleDialog>();
const describeArticleStateDialogRef = ref<typeof DescribeArticleStateDialog>();
const selectedArticle = ref<Article>();
const selectedSections = ref<string[]>([]);
const selectedPlaceholder = ref<string>("Descrição");
const complementaryDataIsDisabled = ref<boolean>(false);
const requestList = ref<RequestArticle[]>([]);
const currentPurposeName = ref<string>("");
const currentSectionName = ref<string>("");
const securityDeposit = ref<string>("0,00");
const purpouses = ref<Purpose[]>([]);
const grandTotal = ref<string>("0,00");

const isDisabledSection = computed(() => selectedSections.value.length <= 0);

const requestService = new RequestService();

function listPurposes() {
    requestService
        .listPurposes()
        .then((p) => purpouses.value.push(...p))
        .catch((err) => console.log(err));
}

function getPurposeNames(): string[] {
    return purpouses.value.map((p) => p.name);
}

function findSectionByPurpose(purposeName: string): void {
    purpouses.value.find((purpose) => {
        if (purpose.name === purposeName) {
            changePlaceholder(purpose.placeholder!);
            disableComplementaryDataToThePurpose(purposeName);
            updateSelectedSections(purpose.sections);
        }
    });

    currentPurposeName.value = purposeName;
    updateCurrentSectionName("Secção");
}

function changePlaceholder(placeholder: string): void {
    selectedPlaceholder.value = placeholder || "";
}

function disableComplementaryDataToThePurpose(purposeName: string): void {
    if (purposeName === DISCARD) {
        complementaryDataIsDisabled.value = true;
        return;
    }

    complementaryDataIsDisabled.value = false;
}

function updateSelectedSections(sections?: string[]) {
    if (!sections) {
        selectedSections.value = [];
        return;
    }

    selectedSections.value = sections;
}

function updateCurrentSectionName(sectionName: string) {
    currentSectionName.value = sectionName;

    if (sectionName === INNER_LAUNDRY) {
        complementaryDataIsDisabled.value = true;
        return;
    }

    complementaryDataIsDisabled.value = false;

    disableComplementaryDataToThePurpose(currentPurposeName.value);
}

function removeRequestRow(id: string): void {
    requestList.value = requestList.value.filter((r) => r.requestId !== id);
}

function clearRequestList() {
    requestList.value = [];
}

function calculateGrandTotal() {
    requestList.value.forEach((row, idx) => {
        if (idx === 0) {
            grandTotal.value = row.total;
            securityDeposit.value = row.total;
            return;
        }

        const value = convertToNumber(row.total);
        const total = convertToNumber(grandTotal.value);

        const result = (value + total) / 100;
        const doubleResult = result * 2;

        securityDeposit.value = formatCurrency(doubleResult);
        grandTotal.value = formatCurrency(result);
    });
}

function onAddedArticle() {
    calculateGrandTotal();
    showSelectArticleDialog();
}

function showSelectArticleDialog() {
    selectArticleDialogRef.value?.show();
}

function addArticleToRequestList(article: Article) {
    if (requestList.value.some((r) => r.id === article.id)) return;

    const requestArticle = {
        ...article,
        requestId: new Date().getTime().toString(),
        quantity: 1,
        total: article.price,
        variations: [],
    };

    requestList.value.push(requestArticle);

    onAddedArticle();
}

function showAddArticleDialog(article: Article) {
    if (article.isUnique) {
        addArticleToRequestList(article);
        return;
    }

    selectedArticle.value = article;
    addArticleDialogRef.value?.initializeQuantities(article.variations);

    addArticleDialogRef.value?.show();
}

function showDescribeArticleStatusDialog() {
    describeArticleStateDialogRef.value?.show();
}

function listVariations(articleVariation?: ArticleVariation[]) {
    if (!articleVariation) return "";

    const values = articleVariation.map((v) => `${v.name}: ${v.value}`);

    return values.join(" | ");
}

listPurposes();
</script>

<template>
    <div class="w-full h-24 py-4 bg-primary flex justify-center items-center">
        <img src="/images/logo.png" alt="Logotipo da Raviish" class="h-full" />
    </div>

    <section class="section-content mb-20">
        <h1 class="flex-1 text-center mb-11 mt-4">Guia de Saída de Artigos</h1>

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
                        v-model="currentPurposeName"
                        @update:model-value="findSectionByPurpose"
                    />
                    <VSelect
                        placeholder="Secção"
                        :options="selectedSections"
                        :disabled="isDisabledSection"
                        v-model="currentSectionName"
                        @update:model-value="updateCurrentSectionName"
                    />
                </div>
                <VInput
                    :placeholder="selectedPlaceholder"
                    :disabled="complementaryDataIsDisabled"
                    class="input-field"
                />
            </form>
        </section>

        <section>
            <div
                class="h-table-lg p-3 flex flex-col justify-between border border-light-500 overflow-hidden"
            >
                <button
                    class="ms-auto hover:bg-light-500 px-4 py-1 hover:bg-opacity-25 mb-2"
                    @click="clearRequestList"
                >
                    Limpar
                </button>

                <div class="flex-1 overflow-y-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Item</th>
                                <th>QTD</th>
                                <th>Preço Unid (Kz)</th>
                                <th>Total (Kz)</th>
                                <th>Caução (Kz)</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(row, idx) in requestList" :key="idx" class="cursor-pointer">
                                <td class="w-16">{{ row.id }}</td>
                                <td @click="showDescribeArticleStatusDialog">
                                    {{ row.name }}
                                    <br />
                                    <span class="text-light-600 text-sm">{{
                                        listVariations(row?.variations?.[0])
                                    }}</span>
                                </td>
                                <td>{{ row.quantity }}</td>
                                <td class="w-36">{{ row.price }}</td>
                                <td class="w-36">{{ row.total }}</td>
                                <td class="w-36">
                                    {{ row.securityDeposit }}
                                </td>
                                <td class="cursor-pointer" @click="removeRequestRow(row.requestId)">
                                    X
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button class="btn-secondary w-full" @click="showSelectArticleDialog">
                    Adicionar
                </button>
            </div>
        </section>
    </section>

    <section class="w-full fixed mx-auto bottom-0 z-50 shadow-lg shadow-primary">
        <div class="flex justify-between items-center section-content p-4 bg-white">
            <div class="space-x-4">
                <button class="btn-secondary">Solicitar</button>
                <button class="btn-light">Cancelar</button>
            </div>

            <div class="flex gap-4 flex-wrap">
                <p class="text-right space-x-1">
                    <span class="font-medium">Total Geral(kz):</span>
                    <span>{{ grandTotal }}</span>
                </p>

                <p class="text-right space-x-1">
                    <span class="font-medium">Caução(kz):</span>
                    <span>{{ securityDeposit }}</span>
                </p>
            </div>
        </div>
    </section>

    <SelectArticleDialog ref="selectArticleDialogRef" @select="showAddArticleDialog" />

    <AddArticleDialog
        ref="addArticleDialogRef"
        :article="selectedArticle!"
        :request-list="requestList"
        @added="onAddedArticle"
    />

    <DescribeArticleStateDialog ref="describeArticleStateDialogRef" />
</template>
