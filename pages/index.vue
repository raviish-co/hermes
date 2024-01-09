<script setup lang="ts">
import type { AddArticleDialog, DescribeArticleState } from "#build/components";
import type { RequestRow } from "~/lib/models/article";
import { PURPOSES, PurposeName } from "~/lib/data/purposes";

const addArticleDialogRef = ref<typeof AddArticleDialog>();
const describeArticleStateDialog = ref<typeof DescribeArticleState>();
const selectedSections = ref<string[]>([]);
const selectedPlaceholder = ref<string>("Descrição");
const isDisabledInputText = ref<boolean>(false);
const requestList = ref<RequestRow[]>([]);
const currentPurposeName = ref<string>("");
const currentSectionName = ref<string>("");
const isDisabledSection = computed(() => selectedSections.value.length <= 0);

function getPurposeNames(): string[] {
    return PURPOSES.map((p) => p.name);
}

function findSectionByPurpose(purposeName: string): void {
    PURPOSES.find((purpose) => {
        if (purpose.name === purposeName) {
            changePlaceholder(purpose.placeholder!);
            disableInputDescription(purposeName);
            updateSelectedSections(purpose.sections);
        }
    });

    currentPurposeName.value = purposeName;
    updateCurrentSectionName("Secção");
}

function changePlaceholder(placeholder: string): void {
    selectedPlaceholder.value = placeholder || "";
}

function disableInputDescription(purposeName: string): void {
    if (purposeName === PurposeName.Discard) {
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

function updateCurrentSectionName(sectionName: string) {
    currentSectionName.value = sectionName;
}

function removeRequestRow(id: string): void {
    requestList.value = requestList.value.filter((r) => r.id !== id);
}

function clearRequestList() {
    requestList.value = [];
}

function showAddArticleDialog() {
    addArticleDialogRef.value?.show();
}

function showDescribeArticleStatusDialog() {
    describeArticleStateDialog.value?.show();
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
                        v-model="currentPurposeName"
                        placeholder="Finalidade"
                        :options="getPurposeNames()"
                        @update:model-value="findSectionByPurpose"
                    />
                    <VSelect
                        v-model="currentSectionName"
                        placeholder="Secção"
                        :options="selectedSections"
                        :disabled="isDisabledSection"
                        @update:model-value="updateCurrentSectionName"
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
                <button @click="clearRequestList" class="text-right">Limpar</button>

                <div class="flex-1 overflow-y-auto">
                    <table class="table">
                        <thead>
                            <tr @click="showDescribeArticleStatusDialog">
                                <th>ID</th>
                                <th>Item</th>
                                <th>QTD</th>
                                <th>Preço por unidade</th>
                                <th>Total</th>
                                <th>Caução</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, idx) in requestList" :key="idx">
                                <td>{{ row.id }}</td>
                                <td @click="showDescribeArticleStatusDialog">{{ row.name }}</td>
                                <td v-if="!row.isUnique">
                                    <input type="number" value="1" />
                                </td>
                                <td>{{ row.price }}</td>
                                <td>0</td>
                                <td>{{ row.securityDeposit }}</td>
                                <td
                                    class="cursor-poidescribeArticleDamageDialogRefnter"
                                    @click="removeRequestRow(row.id)"
                                >
                                    x
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button class="btn w-full" @click="showAddArticleDialog">Adicionar</button>
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

    <AddArticleDialog ref="addArticleDialogRef" :request-list="requestList" />

    <DescribeArticleState ref="describeArticleStateDialog" />
</template>
