<script lang="ts" setup>
import type { AddLineDialog, DescribeLineStatusDialog, ChoosePurpose } from "#build/components";
import { convertToNumber } from "@frontend/helpers/convert_to_number";
import { GoodsIssueService } from "@frontend/services/goods_issue_service";
import type { GoodsIssueLine, GoodsIssueModel } from "@frontend/models/goods_issue";
import { handleException } from "@frontend/helpers/error_handler";
import { formatCurrency } from "@frontend/helpers/format_currency";
import { CatalogService } from "@frontend/services/catalog_service";
import type { ItemModel } from "@frontend/models/item";
import { getCurrentLocalDateTime } from "@frontend/helpers/current_local_date_time";
import { joinVariationValues } from "~/lib/frontend/helpers/join_variation_values";

const DETAILS = "Detalhes";

const choosePurposeRef = ref<typeof ChoosePurpose>();
const addLineDialogRef = ref<typeof AddLineDialog>();
const describeLineStatusDialogRef = ref<typeof DescribeLineStatusDialog>();
const purposeNotesType = ref<string>("");
const purposeDetail = ref<string>("");
const purposeDescription = ref<string>("");
const goodsIssueLines = ref<GoodsIssueLine[]>([]);
const securityDeposit = ref<string>("0,00");
const grandTotal = ref<string>("0,00");
const returnDate = ref<string>(getCurrentLocalDateTime());
const selectedLine = ref<GoodsIssueLine>({} as GoodsIssueLine);
const isValidPurpose = ref<boolean>(false);
const items = ref<ItemModel[]>([]);
const itemPages = ref<number>(1);

const goodsIssueService = new GoodsIssueService();
const catalogService = new CatalogService();

function validateQuantitiesInStock(): boolean {
    const invalidLineOrUndefined = goodsIssueLines.value.find((i) => i.quantity > i.stock);
    if (invalidLineOrUndefined) return false;

    return true;
}

const isValidGoodsIssue = computed(() => {
    const hasLines = goodsIssueLines.value.length > 0;

    const areQuantitiesInStock = validateQuantitiesInStock();

    if (isValidPurpose.value && hasLines && areQuantitiesInStock) {
        return true;
    }

    return false;
});

function newGoodsIssue() {
    purposeDetail.value = purposeDetail.value === DETAILS ? "" : purposeDetail.value;

    const goodsIssue: GoodsIssueModel = {
        returnDate: returnDate.value,
        total: grandTotal.value,
        purposeSpecification: {
            description: purposeDescription.value,
            detailsConstraint: purposeDetail.value,
            notes: purposeNotesType.value,
        },
        lines: goodsIssueLines.value,
    };

    goodsIssueService
        .new(goodsIssue)
        .then(({ message }) => {
            alert(message);
            clearValues();
        })
        .catch(handleException);
}

function removeGoodsIssueLine(id: string): void {
    goodsIssueLines.value = goodsIssueLines.value.filter((l) => l.itemId !== id);
    calculateGrandTotal();
}

function clearGoodsIssueLines() {
    goodsIssueLines.value = [];
    clearGrandTotalAndSecurityDeposit();
}

function clearGrandTotalAndSecurityDeposit() {
    grandTotal.value = "0,00";
    securityDeposit.value = "0,00";
}

function calculateSecurityDeposit() {
    const total = convertToNumber(grandTotal.value);
    const doubleTotal = (total * 2) / 100;
    securityDeposit.value = formatCurrency(doubleTotal);
}

function calculateLineTotal(line: GoodsIssueLine): number {
    if (line.quantity > line.stock) {
        line.total = "0,00";
        return 0;
    }

    const price = convertToNumber(line.price);

    const total = price * line.quantity;

    line.total = formatCurrency(total / 100);

    return total;
}

function calculateGrandTotal() {
    clearGrandTotalAndSecurityDeposit();

    goodsIssueLines.value.forEach((line) => {
        const lineTotal = calculateLineTotal(line);

        const total = convertToNumber(grandTotal.value);

        const result = (lineTotal + total) / 100;

        grandTotal.value = formatCurrency(result);

        calculateSecurityDeposit();
    });
}

function showAddLineDialog() {
    addLineDialogRef.value?.initializeQuantities();
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

function clearValues() {
    returnDate.value = getCurrentLocalDateTime();
    goodsIssueLines.value = [];
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

function listItems(pageToken: number = 1) {
    catalogService.listItems(pageToken).then(({ items: i, total }) => {
        items.value = i;
        itemPages.value = total;

        addLineDialogRef.value?.initializeQuantities();
    });
}

function searchItems(searchText: string, pageToken: number = 1) {
    if (searchText.length === 0) {
        listItems();
        return;
    }

    if (searchText.length < 3) return;

    catalogService.searchItems(searchText, pageToken).then(({ items: i, total }) => {
        items.value = i;
        itemPages.value = total;

        addLineDialogRef.value?.initializeQuantities();
    });
}

function changePageToken(searchText: string, pageToken: number) {
    if (searchText.length >= 3) {
        searchItems(searchText, pageToken);
        return;
    }

    listItems(pageToken);
}

onMounted(() => {
    listItems();
});

onBeforeRouteUpdate(() => {
    listItems();
});
</script>

<template>
    <section class="section-content">
        <h1 class="text-xl text-center sm:text-2xl sm:my-10 my-8">Guia de Saída de Artigos</h1>

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
                @valid-purpose-changed="updateIsValidPurpose"
            />
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

                    <span
                        class="hover:text-red-500 hover:bg-red-500 hover:bg-opacity-10 p-2 cursor-pointer"
                        @click="clearGoodsIssueLines"
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
                                v-for="(line, idx) in goodsIssueLines"
                                :key="idx"
                                class="cursor-pointer"
                            >
                                <td>{{ line.itemId }}</td>
                                <td @click="showDescribeLineStatusDialog(line)">
                                    {{ line.name }}
                                    <br />
                                    <span class="text-light-600 text-sm">
                                        {{ joinVariationValues(line?.variationsValues) }}
                                    </span>
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        v-model="line.quantity"
                                        class="input-number"
                                        min="1"
                                        :max="line.stock"
                                        @input="calculateGrandTotal"
                                    />
                                </td>
                                <td class="text-right">{{ line.price }}</td>
                                <td class="text-right">{{ line.total }}</td>
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

    <section class="fixed shadow-top bottom-0 w-full bg-white shadow-light-500">
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

            <div class="text-sm md:text-base flex gap-2 w-full md:w-auto overflow-hidde">
                <p
                    class="text-center w-full md:w-auto md:text-right space-x-1 max-w-80 truncate overflow-hidden"
                >
                    <span class="font-medium">Total Geral(kz):</span>
                    <span>{{ grandTotal }}</span>
                </p>

                <p
                    class="text-center w-full md:w-auto md:text-right space-x-1 max-w-80 truncate overflow-hidden"
                >
                    <span class="font-medium">Caução(kz):</span>
                    <span>{{ securityDeposit }}</span>
                </p>
            </div>
        </div>
    </section>

    <AddLineDialog
        ref="addLineDialogRef"
        :goods-issue-lines="goodsIssueLines"
        :items="items"
        :pages="itemPages"
        @added="calculateGrandTotal"
        @input="searchItems"
        @page-token-changed="changePageToken"
    />

    <DescribeLineStatusDialog :line="selectedLine" ref="describeLineStatusDialogRef" />
</template>
