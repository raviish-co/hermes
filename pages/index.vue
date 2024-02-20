<script lang="ts" setup>
import type { AddItemDialog, DescribeItemStatusDialog, ChoosePurpose } from "#build/components";
import type { VariationValue } from "@frontend/models/goods_issue_item";
import { convertToNumber } from "@frontend/helpers/convert_to_number";
import { GoodsIssueService } from "@frontend/services/goods_issue_service";
import type { GoodsIssueModel, GoodsIssueLine } from "@frontend/models/goods_issue";
import { handleException } from "@frontend/helpers/error_handler";
import type { GoodsIssueItem } from "@frontend/models/goods_issue_item";
import { formatCurrency } from "@frontend/helpers/format_currency";

const DETAILS = "Detalhes";

const choosePurposeRef = ref<typeof ChoosePurpose>();
const addItemDialogRef = ref<typeof AddItemDialog>();
const describeItemStatusDialogRef = ref<typeof DescribeItemStatusDialog>();
const purposeNotesType = ref<string>("");
const purposeDetail = ref<string>("");
const purposeDescription = ref<string>("");
const goodsIssueItems = ref<GoodsIssueItem[]>([]);
const securityDeposit = ref<string>("0,00");
const grandTotal = ref<string>("0,00");
const returnDate = ref<string>("");
const selectedRow = ref<GoodsIssueItem>({} as GoodsIssueItem);
const isValidPurpose = ref<boolean>(false);

const goodsIssueService = new GoodsIssueService();

function removeSpaces(value: string): string {
    return value.replace(/\s/g, "");
}

function toGoodsIssueLine(): GoodsIssueLine[] {
    if (goodsIssueItems.value.length === 0) return [];

    return goodsIssueItems.value.map((item) => ({
        itemId: item.itemId,
        quantity: item.quantity,
        condition: {
            comment: item?.condition?.comment,
            status: item?.condition!.status,
        },
        variations: item.variationsValues?.map((v) => v.variationId),
    }));
}

function toGoodsIssue(): GoodsIssueModel {
    return {
        total: removeSpaces(grandTotal.value),
        securityDeposit: removeSpaces(securityDeposit.value),
        returnDate: returnDate.value,
        purpose: {
            description: purposeDescription.value,
            details: purposeDetail.value,
            notes: purposeNotesType.value,
        },
        lines: toGoodsIssueLine(),
    };
}

function isValidQuantities(): boolean {
    const invalidItem = goodsIssueItems.value.find((i) => i.quantity > i.stock);

    if (invalidItem) return false;

    return true;
}

const isValidGoodsIssue = computed(() => {
    const isValidGoodsItems = goodsIssueItems.value.length > 0;

    const quantitiesIsValid = isValidQuantities();

    if (isValidPurpose.value && isValidGoodsItems && quantitiesIsValid) {
        return true;
    }

    return false;
});

function newGoodsIssue() {
    purposeDetail.value = purposeDetail.value === DETAILS ? "" : purposeDetail.value;

    const goodsIssue = toGoodsIssue();

    goodsIssueService
        .new(goodsIssue)
        .then(({ message }) => {
            alert(message);
            clearValues();
        })
        .catch(handleException);
}

function removeGoodsIssueItem(id: string): void {
    goodsIssueItems.value = goodsIssueItems.value.filter((r) => r.itemId !== id);
    calculateGrandTotal();
}

function clearGoodsIssueItems() {
    goodsIssueItems.value = [];
    grandTotal.value = "0,00";
    securityDeposit.value = "0,00";
}

function calculateSecurityDeposit() {
    const total = convertToNumber(grandTotal.value);
    const doubleTotal = (total * 2) / 100;
    securityDeposit.value = formatCurrency(doubleTotal);
}

function calculateGrandTotal() {
    goodsIssueItems.value.forEach((item, idx) => {
        if (idx === 0) {
            grandTotal.value = formatCurrency(convertToNumber(item.total) / 100);
            calculateSecurityDeposit();
            return;
        }

        const value = convertToNumber(item.total);
        const total = convertToNumber(grandTotal.value);

        const result = (value + total) / 100;

        grandTotal.value = formatCurrency(result);
        calculateSecurityDeposit();
    });
}

function showAddItemDialog() {
    addItemDialogRef.value?.show();
}

function showDescribeItemStatusDialog(item: GoodsIssueItem) {
    selectedRow.value = item;

    describeItemStatusDialogRef.value?.initializeItemState(
        item?.condition!.status,
        item?.condition?.comment
    );

    describeItemStatusDialogRef.value?.show();
}

function listVariationValues(itemVariation?: VariationValue[]) {
    if (!itemVariation) return "";

    const values = itemVariation.map((v) => v.value);

    return values.join(" | ");
}

function clearValues() {
    returnDate.value = new Date().toString();
    goodsIssueItems.value = [];
    grandTotal.value = "0,00";
    securityDeposit.value = "0,00";

    choosePurposeRef.value?.clearInputs();
}

function updatePurposeDescription(description: string) {
    purposeDescription.value = description;
}

function updatePurposeDetail(detail: string) {
    purposeDetail.value = detail;
}

function updatePurposeNotesType(notesType: string) {
    purposeNotesType.value = notesType;
}

function updateIsValidPurpose(value: boolean) {
    isValidPurpose.value = value;
}
</script>

<template>
    <section class="section-content">
        <h1 class="text-xl text-center sm:text-2xl sm:my-10 my-8">Guia de Saída de Artigos</h1>

        <section>
            <form>
                <div class="flex items-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
                    <input class="input-field" placeholder="John Doe" :disabled="true" />

                    <input v-model="returnDate" type="datetime-local" class="input-field" />
                </div>

                <ChoosePurpose
                    ref="choosePurposeRef"
                    @description-changed="updatePurposeDescription"
                    @detail-changed="updatePurposeDetail"
                    @notes-type-changed="updatePurposeNotesType"
                    @valid-purpose="updateIsValidPurpose"
                />
            </form>
        </section>

        <section class="pb-16 sm:pb-5 md:pb-[4.5rem]">
            <div
                class="h-table-lg p-3 flex flex-col justify-between border border-light-500 overflow-hidden"
            >
                <div class="w-full flex items-center justify-between">
                    <span
                        class="material-symbols-outlined hover:text-secondary-600 p-2 cursor-pointer"
                        @click="showAddItemDialog"
                    >
                        add
                    </span>

                    <span
                        class="hover:text-red-500 hover:bg-red-500 hover:bg-opacity-10 p-2 cursor-pointer"
                        @click="clearGoodsIssueItems"
                    >
                        Limpar
                    </span>
                </div>

                <div class="flex-1 overflow-y-auto">
                    <table class="table">
                        <thead>
                            <tr class="text-left">
                                <th class="min-w-24 w-24">ID</th>
                                <th class="min-w-52">Item</th>
                                <th class="min-w-10 w-16">QTD</th>
                                <th class="min-w-36 w-36 text-right">Preço Unid (Kz)</th>
                                <th class="min-w-36 w-36 text-right">Total (Kz)</th>
                                <th class="min-w-10 w-10"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="(item, idx) in goodsIssueItems"
                                :key="idx"
                                class="cursor-pointer"
                            >
                                <td>{{ item.itemId }}</td>
                                <td @click="showDescribeItemStatusDialog(item)">
                                    {{ item.name }}
                                    <br />
                                    <span class="text-light-600 text-sm">
                                        {{ listVariationValues(item?.variationsValues) }}
                                    </span>
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        v-model="item.quantity"
                                        class="input-number"
                                        :disabled="item.isUnique"
                                        min="1"
                                        :max="item.stock"
                                    />
                                </td>
                                <td class="text-right">{{ item.price }}</td>
                                <td class="text-right">{{ item.total }}</td>
                                <td
                                    class="cursor-pointer"
                                    @click="removeGoodsIssueItem(item.itemId)"
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

    <section class="fixed bottom-0 w-full mx-auto shadow-md shadow-light-500">
        <div
            class="flex justify-between items-center section-content p-4 bg-white flex-wrap flex-col-reverse md:flex-row md:flex-nowrap gap-4"
        >
            <div class="flex flex-wrap sm:flex-nowrap gap-4 w-full md:w-auto pb-4 md:pb-0">
                <button
                    class="btn-secondary w-full md:flex-1"
                    @click="newGoodsIssue"
                    :disabled="!isValidGoodsIssue"
                >
                    Solicitar
                </button>
                <button class="btn-light w-full md:flex-1">Cancelar</button>
            </div>

            <div class="text-sm md:text-base flex gap-2 w-full md:w-auto">
                <p class="text-center w-full md:w-auto md:text-right space-x-1">
                    <span class="font-medium">Total Geral(kz):</span>
                    <span>{{ grandTotal }}</span>
                </p>

                <p class="text-center w-full md:w-auto md:text-right space-x-1">
                    <span class="font-medium">Caução(kz):</span>
                    <span>{{ securityDeposit }}</span>
                </p>
            </div>
        </div>
    </section>

    <AddItemDialog
        ref="addItemDialogRef"
        @added="calculateGrandTotal"
        :goods-issue-items="goodsIssueItems"
    />

    <DescribeItemStatusDialog :row="selectedRow" ref="describeItemStatusDialogRef" />
</template>
