<script setup lang="ts">
import type { AddItemDialog, DescribeItemStateDialog } from "#build/components";
import type { ItemModel, VariationValue } from "@frontend/models/item";
import { formatCurrency, convertToNumber, removeSpaces } from "@frontend/helpers/number_format";
import { RequestService } from "@frontend/services/request_service";
import type { GoodsIssueLine, GoodsIssueModel } from "@frontend/models/goods_issue";
import { handleException } from "@frontend/helpers/error_handler";

export interface Purpose {
    name: string;
    placeholder?: string;
    details?: string[];
}

const INNER_LAUNDRY = "Interna";
const DISCARD = "Descartar";
const PURPOSE = "Finalidade";
const DETAIL = "Detalhes";

const purposes = usePurpose().purposes;

const addItemDialogRef = ref<typeof AddItemDialog>();
const describeItemStateDialogRef = ref<typeof DescribeItemStateDialog>();
const selectedSections = ref<string[]>([]);
const currentNotesType = ref<string>("Descrição");
const purposeDetailsIsDisabled = ref<boolean>(false);
const items = ref<ItemModel[]>([]);
const currentPurposeDescription = ref<string>("Finalidade");
const currentDetails = ref<string>("");
const securityDeposit = ref<string>("0,00");
const grandTotal = ref<string>("0,00");
const returnDate = ref<string>("");
const recipient = ref<string>("");
const isDisabledSection = computed(() => selectedSections.value.length <= 0);
const selectedRow = ref<ItemModel>({} as ItemModel);

const requestService = new RequestService();

function makeGoodsIssue(): GoodsIssueModel {
    return {
        total: removeSpaces(grandTotal.value),
        securityDeposit: removeSpaces(securityDeposit.value),
        returnDate: returnDate.value,
        purpose: {
            description: currentPurposeDescription.value,
            details: currentDetails.value,
            notes: recipient.value,
        },
        lines: makeProductData(),
    };
}

function makeProductData(): GoodsIssueLine[] {
    if (items.value.length === 0) return [];

    return items.value.map((row) => ({
        itemId: row.itemId,
        quantity: row.quantity,
        condition: {
            comment: row?.condition?.comment,
            status: row?.condition!.status,
        },
        variations: row.variationsValues?.map((v) => v.variationId),
    }));
}

const isValidPurpose = computed(() =>
    purposes.value.some((p) => p.description === currentPurposeDescription.value)
);

const isValidSection = computed(() => {
    if (selectedSections.value.length > 0) {
        return selectedSections.value.some((s) => s === currentDetails.value);
    }

    return true;
});

const isValidRecipient = computed(() => {
    if (recipient.value === "" && !purposeDetailsIsDisabled.value) return false;

    return true;
});

const isValidGoodsIssue = computed(() => {
    const isValidGoodsLines = items.value.length > 0;

    if (isValidPurpose.value && isValidSection.value && isValidGoodsLines && isValidRecipient.value)
        return true;

    return false;
});

function requestArticles() {
    const goodsIssue = makeGoodsIssue();

    requestService
        .requestArticles(goodsIssue)
        .then((res) => {
            if (res.statusCode !== 200) {
                alert(res.message);
                return;
            }

            alert(res.message);

            clearValues();
        })
        .catch(handleException);
}

function getPurposeDescriptions(): string[] {
    return purposes.value.map((p) => p.description);
}

function findSectionByPurpose(purposeDescription: string): void {
    if (purposeDescription === PURPOSE) {
        currentDetails.value = DETAIL;
        selectedSections.value = [];
        return;
    }

    purposes.value.find((p) => {
        if (p.description === purposeDescription) {
            changeNotesType(p.notesType!);
            disableNotesType(purposeDescription);
            updateSelectedSections(p.detailsConstraint);
        }
    });

    currentPurposeDescription.value = purposeDescription;
    updateCurrentSectionName("Secção");
}

function changeNotesType(notesType: string): void {
    currentNotesType.value = notesType || "";
}

function disableNotesType(purposeName: string): void {
    if (purposeName === DISCARD) {
        purposeDetailsIsDisabled.value = true;
        return;
    }

    purposeDetailsIsDisabled.value = false;
}

function updateSelectedSections(sections?: string[]) {
    if (!sections) {
        selectedSections.value = [];
        return;
    }

    selectedSections.value = sections;
}

function updateCurrentSectionName(sectionName: string) {
    currentDetails.value = sectionName;

    if (sectionName === INNER_LAUNDRY) {
        purposeDetailsIsDisabled.value = true;
        return;
    }

    purposeDetailsIsDisabled.value = false;

    disableNotesType(currentPurposeDescription.value);
}

function removeRequestRow(id: string): void {
    items.value = items.value.filter((r) => r.itemId !== id);
    calculateGrandTotal();
}

function clearRequestList() {
    items.value = [];
    grandTotal.value = "0,00";
    securityDeposit.value = "0,00";
}

function calculateSecurityDeposit() {
    const total = convertToNumber(grandTotal.value);
    const doubleTotal = (total * 2) / 100;
    securityDeposit.value = formatCurrency(doubleTotal);
}

function calculateGrandTotal() {
    items.value.forEach((row, idx) => {
        if (idx === 0) {
            grandTotal.value = formatCurrency(convertToNumber(row.total) / 100);
            calculateSecurityDeposit();
            return;
        }

        const value = convertToNumber(row.total);
        const total = convertToNumber(grandTotal.value);

        const result = (value + total) / 100;

        grandTotal.value = formatCurrency(result);
        calculateSecurityDeposit();
    });
}

function showAddItemDialog() {
    addItemDialogRef.value?.show();
}

function showDescribeItemStatusDialog(row: ItemModel) {
    selectedRow.value = row;

    describeItemStateDialogRef.value?.initializeItemState(
        row?.condition!.status,
        row?.condition?.comment
    );

    describeItemStateDialogRef.value?.show();
}

function listVariations(itemVariation?: VariationValue[]) {
    if (!itemVariation) return "";

    const values = itemVariation.map((v) => v.value);

    return values.join(" | ");
}

function clearValues() {
    returnDate.value = new Date().toISOString();
    currentPurposeDescription.value = PURPOSE;
    currentDetails.value = DETAIL;
    selectedSections.value = [];
    recipient.value = "";
    items.value = [];
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
                        placeholder="Finalidade"
                        :options="getPurposeDescriptions()"
                        :is-invalid="!isValidPurpose"
                        @change="findSectionByPurpose"
                    />

                    <VSelect
                        :value="currentDetails"
                        :placeholder="DETAIL"
                        :options="selectedSections"
                        :disabled="isDisabledSection"
                        :is-invalid="!isValidSection"
                        @change="updateCurrentSectionName"
                    />
                </div>

                <input
                    v-model="recipient"
                    :placeholder="currentNotesType"
                    :disabled="purposeDetailsIsDisabled"
                    class="input-field mb-4"
                    :class="{ invalid: !isValidRecipient }"
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
                            <tr v-for="(row, idx) in items" :key="idx" class="cursor-pointer">
                                <td>{{ row.itemId }}</td>
                                <td @click="showDescribeItemStatusDialog(row)">
                                    {{ row.name }}
                                    <br />
                                    <span class="text-light-600 text-sm">{{
                                        listVariations(row?.variationsValues)
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
                    @click="requestArticles"
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

    <AddItemDialog ref="addItemDialogRef" @added="calculateGrandTotal" :request-list="items" />

    <DescribeItemStateDialog :row="selectedRow" ref="describeItemStateDialogRef" />
</template>
~/lib/frontend/helpers/number_format~/lib/frontend/helpers/error_handler
~/lib/frontend/models/item~/lib/frontend/models/goods_issue
