<script setup lang="ts">
import type { AddLineDialog, DescribeLineStatusDialog } from "#build/components";
import type { GoodsIssueLine, VariationValue } from "@frontend/models/goods_issue";
import { GOODS_ISSUE_LINES } from "~/data/goods_issue_line";

const addLineDialogRef = ref<typeof AddLineDialog>();
const describeLineStatusDialogRef = ref<typeof DescribeLineStatusDialog>();
const goodsIssueLines = ref<GoodsIssueLine[]>(GOODS_ISSUE_LINES);
const selectedLine = ref<GoodsIssueLine>({} as GoodsIssueLine);
const securityDepositInputState = ref<boolean>(true);

function toggleSecurirtyDepositInputState() {
    securityDepositInputState.value = !securityDepositInputState.value;
}

function validateQuantitiesInStock(): boolean {
    const invalidLineOrUndefined = goodsIssueLines.value.find(
        (i) => i.quantity > i.stock || i.quantity <= 0
    );

    if (invalidLineOrUndefined) return false;

    return true;
}

const isValidIncomingGoods = computed(() => {
    if (goodsIssueLines.value.length === 0 || !validateQuantitiesInStock()) return false;

    return true;
});

function showAddLineDialog() {
    addLineDialogRef.value?.show();
}

function showDescribeLineStatusDialog(line: GoodsIssueLine) {
    selectedLine.value = line;

    describeLineStatusDialogRef.value?.initializeLineState(
        line?.condition!.status,
        line?.condition?.comment
    );

    describeLineStatusDialogRef.value?.show();
}

function listVariationValues(lineVariation?: VariationValue[]) {
    if (!lineVariation) return "";

    const values = lineVariation.map((v) => v.value);

    return values.join(" | ");
}

function removeGoodsIssueLine(id: string) {
    goodsIssueLines.value = goodsIssueLines.value.filter((l) => l.itemId !== id);
}
</script>

<template>
    <section class="section-content">
        <h1 class="text-xl text-center sm:text-2xl sm:my-10 my-8">Guia de Devolução</h1>

        <form class="mb-4">
            <div class="flex items-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
                <input class="input-field" value="John Doe" disabled />
                <input class="input-field" value="2024-02-26T13:35" disabled />
            </div>

            <div class="flex items-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
                <input class="input-field" value="Descartar" disabled />
                <input class="input-field" value="---" disabled />
            </div>

            <input class="input-field" value="Alguma descrição" disabled />
        </form>

        <section class="pb-16 sm:pb-5 md:pb-[4.5rem]">
            <div
                class="h-table-lg p-3 flex flex-col justify-between border border-light-500 overflow-hidden"
            >
                <div class="w-full flex items-center justify-between">
                    <span
                        class="material-symbols-outlined hover:text-secondary-600 p-2 cursor-pointer"
                        @click="showAddLineDialog"
                    >
                        add
                    </span>
                </div>

                <div class="flex-1 overflow-y-auto">
                    <table class="table">
                        <thead>
                            <tr class="text-left">
                                <th class="min-w-24 w-24">ID</th>
                                <th class="min-w-52">Item</th>
                                <th class="min-w-10 w-16">QTD</th>
                                <th class="min-w-10 w-10"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="(line, idx) in goodsIssueLines"
                                :key="idx"
                                class="cursor-pointer"
                            >
                                <td>{{ line.itemId }}</td>
                                <td @click="showDescribeLineStatusDialog(line)">
                                    {{ line.name }}
                                    <br />
                                    <span class="text-light-600 text-sm">
                                        {{ listVariationValues(line?.variationsValues) }}
                                    </span>
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        v-model="line.quantity"
                                        class="input-number"
                                        min="1"
                                        :max="line.stock"
                                    />
                                </td>
                                <td
                                    class="cursor-pointer"
                                    @click="removeGoodsIssueLine(line.itemId)"
                                >
                                    <span class="material-symbols-outlined">close</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </section>

    <section class="fixed shadow-top bottom-0 w-full shadow-light-500 bg-white">
        <div
            class="flex justify-between items-center section-content p-4 flex-wrap flex-col-reverse md:flex-row md:flex-nowrap gap-4"
        >
            <div class="flex flex-wrap sm:flex-nowrap gap-4 w-full md:w-auto pb-4 md:pb-0">
                <button class="btn-secondary w-full md:flex-1" :disabled="!isValidIncomingGoods">
                    Devolver
                </button>
                <button class="btn-light w-full md:flex-1">Cancelar</button>
            </div>

            <div class="text-sm md:text-base flex gap-2 items-center w-full md:w-auto">
                <p class="text-center w-full md:w-auto md:text-right space-x-1">
                    <span class="font-medium">Total de caução(kz):</span>
                    <span>123</span>
                </p>

                <p class="flex items-center text-center w-full md:w-auto md:text-right space-x-1">
                    <span class="font-medium">Caução a reter(kz):</span>
                    <input
                        :disabled="securityDepositInputState"
                        class="input-field max-w-32"
                        value="12345,00"
                    />
                    <span
                        class="material-symbols-outlined cursor-pointer"
                        @click="toggleSecurirtyDepositInputState"
                    >
                        edit
                    </span>
                </p>
            </div>
        </div>
    </section>

    <AddLineDialog ref="addLineDialogRef" :goods-issue-lines="goodsIssueLines" />

    <DescribeLineStatusDialog :line="selectedLine" ref="describeLineStatusDialogRef" />
</template>
