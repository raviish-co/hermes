<script lang="ts" setup>
import type { AddItemDialog, DescribeItemStatusDialog } from "#build/components";
import type { VariationValue } from "@frontend/models/goods_issue_item";
import { convertToNumber } from "@frontend/helpers/convert_to_number";
import { GoodsIssueService } from "@frontend/services/goods_issue_service";
import type { GoodsIssueModel, GoodsIssueLine } from "@frontend/models/goods_issue";
import { handleException } from "@frontend/helpers/error_handler";
import type { GoodsIssueItem } from "@frontend/models/goods_issue_item";
import { formatCurrency } from "@frontend/helpers/format_currency";

export interface Purpose {
    name: string;
    placeholder?: string;
    details?: string[];
}

const INNER_LAUNDRY = "Interna";
const DISCARD = "Descartar";
const PURPOSE = "Finalidade";
const DETAILS = "Detalhes";

const purposes = usePurpose().purposes;

const addItemDialogRef = ref<typeof AddItemDialog>();
const describeItemStatusDialogRef = ref<typeof DescribeItemStatusDialog>();
const currentPurposeDetail = ref<string[]>([]);
const currentPurposeNotesType = ref<string>("");
const currentPurposeDetails = ref<string>("");
const currentPurposeDescription = ref<string>("");
const purposeDetailsIsDisabled = ref<boolean>(false);
const goodsIssueItems = ref<GoodsIssueItem[]>([]);
const securityDeposit = ref<string>("0,00");
const grandTotal = ref<string>("0,00");
const returnDate = ref<string>("");
const selectedRow = ref<GoodsIssueItem>({} as GoodsIssueItem);
const currentPurposeNotesTypePlaceholder = ref<string>("Descrição");

const isDisabledSection = computed(() => currentPurposeDetail.value.length <= 0);

const goodsIssueService = new GoodsIssueService();

function removeSpaces(value: string): string {
    return value.replace(/\s/g, "");
}

function toGoodsIssueLine(): GoodsIssueLine[] {
    if (goodsIssueItems.value.length === 0) return [];

    return goodsIssueItems.value.map((row) => ({
        itemId: row.itemId,
        quantity: row.quantity,
        condition: {
            comment: row?.condition?.comment,
            status: row?.condition!.status,
        },
        variations: row.variationsValues?.map((v) => v.variationId),
    }));
}

function toGoodsIssue(): GoodsIssueModel {
    return {
        total: removeSpaces(grandTotal.value),
        securityDeposit: removeSpaces(securityDeposit.value),
        returnDate: returnDate.value,
        purpose: {
            description: currentPurposeDescription.value,
            details: currentPurposeDetails.value,
            notes: currentPurposeNotesType.value,
        },
        lines: toGoodsIssueLine(),
    };
}

const isValidPurposeDescription = computed(() =>
    purposes.value.some((p) => p.description === currentPurposeDescription.value)
);

const isValidDetails = computed(() => {
    if (currentPurposeDetail.value.length > 0) {
        return currentPurposeDetail.value.some((s) => s === currentPurposeDetails.value);
    }

    return true;
});

const isValidNotesType = computed(() => {
    if (currentPurposeNotesType.value === "" && !purposeDetailsIsDisabled.value) return false;

    return true;
});

const isValidGoodsIssue = computed(() => {
    const isValidGoodsItems = goodsIssueItems.value.length > 0;

    if (
        isValidPurposeDescription.value &&
        isValidDetails.value &&
        isValidGoodsItems &&
        isValidNotesType.value
    ) {
        return true;
    }

    return false;
});

function newGoodsIssue() {
    currentPurposeDetails.value =
        currentPurposeDetails.value === DETAILS ? "" : currentPurposeDetails.value;

    const goodsIssue = toGoodsIssue();

    goodsIssueService
        .new(goodsIssue)
        .then(({ message }) => {
            alert(message);
            clearValues();
        })
        .catch(handleException);
}

function getPurposeDescriptions(): string[] {
    return purposes.value.map((p) => p.description);
}

function findDetailsByPurposeDescription(description: string): void {
    if (description === PURPOSE) {
        currentPurposeDetails.value = DETAILS;
        currentPurposeDetail.value = [];
        return;
    }

    purposes.value.find((p) => {
        if (p.description === description) {
            currentPurposeNotesTypePlaceholder.value = p.notesType!;
            disableNotesType(description);
            updateCurrentPurposeDetails(p.detailsConstraint);
        }
    });

    currentPurposeDescription.value = description;
    updateCurrentPurposeNotesType("");
}

function disableNotesType(purposeName: string): void {
    if (purposeName === DISCARD) {
        purposeDetailsIsDisabled.value = true;
        return;
    }

    purposeDetailsIsDisabled.value = false;
}

function updateCurrentPurposeDetails(sections?: string[]) {
    if (!sections) {
        currentPurposeDetail.value = [];
        return;
    }

    currentPurposeDetail.value = sections;
}

function updateCurrentPurposeNotesType(sectionName: string) {
    currentPurposeDetails.value = sectionName;

    if (sectionName === INNER_LAUNDRY) {
        purposeDetailsIsDisabled.value = true;
        return;
    }

    purposeDetailsIsDisabled.value = false;

    disableNotesType(currentPurposeDescription.value);
}

function removeRequestRow(id: string): void {
    goodsIssueItems.value = goodsIssueItems.value.filter((r) => r.itemId !== id);
    calculateGrandTotal();
}

function clearRequestList() {
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
    returnDate.value = new Date().toISOString();
    currentPurposeDescription.value = PURPOSE;
    currentPurposeDetails.value = DETAILS;
    currentPurposeNotesType.value = "";
    currentPurposeDetail.value = [];
    goodsIssueItems.value = [];
    grandTotal.value = "0,00";
    securityDeposit.value = "0,00";
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

                <div class="flex items-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
                    <VSelect
                        :value="currentPurposeDescription"
                        :placeholder="PURPOSE"
                        :options="getPurposeDescriptions()"
                        :is-invalid="!isValidPurposeDescription"
                        @change="findDetailsByPurposeDescription"
                    />

                    <VSelect
                        :value="currentPurposeDetails"
                        :placeholder="DETAILS"
                        :options="currentPurposeDetail"
                        :disabled="isDisabledSection"
                        :is-invalid="!isValidDetails"
                        @change="updateCurrentPurposeNotesType"
                    />
                </div>

                <input
                    v-model="currentPurposeNotesType"
                    :placeholder="currentPurposeNotesTypePlaceholder"
                    :disabled="purposeDetailsIsDisabled"
                    class="input-field mb-4"
                    :class="{ invalid: !isValidNotesType }"
                />
            </form>
        </section>

        <section>
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
                        class="material-symbols-outlined hover:text-red-500 p-2 cursor-pointer"
                        @click="clearRequestList"
                    >
                        delete
                    </span>
                </div>

                <div class="flex-1 overflow-y-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="min-w-24 w-24">ID</th>
                                <th class="min-w-52">Item</th>
                                <th class="min-w-10 w-16">QTD</th>
                                <th class="min-w-36 w-36">Preço Unid (Kz)</th>
                                <th class="min-w-36 w-36">Total (Kz)</th>
                                <th class="min-w-10 w-10"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="(row, idx) in goodsIssueItems"
                                :key="idx"
                                class="cursor-pointer"
                            >
                                <td>{{ row.itemId }}</td>
                                <td @click="showDescribeItemStatusDialog(row)">
                                    {{ row.name }}
                                    <br />
                                    <span class="text-light-600 text-sm">{{
                                        listVariationValues(row?.variationsValues)
                                    }}</span>
                                </td>
                                <td>{{ row.quantity }}</td>
                                <td class="text-right">{{ row.price }}</td>
                                <td class="text-right">{{ row.total }}</td>
                                <td class="cursor-pointer" @click="removeRequestRow(row.itemId)">
                                    <span class="material-symbols-outlined">close</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </section>

    <section class="w-full mx-auto shadow-md shadow-light-500">
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
