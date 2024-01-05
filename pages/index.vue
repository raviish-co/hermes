<script setup lang="ts">
import type { VDialog } from "#build/components";
import { PURPOSES, PurposeName } from "~/lib/data/purposes";

const selectedSections = ref<string[]>([]);
const selectedPlaceholder = ref<string>("Descrição");
const isDisabledInputText = ref<boolean>(false);
const dialogRef = ref<typeof VDialog>();

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
                            <tr>
                                <td>XPTO</td>
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
    <VDialog ref="dialogRef" title="Pesquisar Artigo" />
</template>
