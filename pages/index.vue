<script setup lang="ts">
import type { AddItemDialog, DescribeItemStateDialog } from "#build/components";
import { type Variation, type RequestItem as RequestItem } from "~/lib/models/item";
import { formatCurrency } from "~/lib/helpers/format_currency";
import type { Purpose } from "~/lib/models/purpose";
import { RequestService } from "~/lib/services/request_service";
import { convertToNumber } from "~/lib/helpers/convert_to_number";
import type { ProductData, RequestItem as Request } from "~/lib/models/request";

const INNER_LAUNDRY = "Interna";
const DISCARD = "Descartar";
const PURPOSE = "Finalidade";
const SECTION = "Secção";
const addItemDialogRef = ref<typeof AddItemDialog>();
const describeItemStateDialogRef = ref<typeof DescribeItemStateDialog>();
const selectedSections = ref<string[]>([]);
const selectedPlaceholder = ref<string>("Descrição");
const recipientIsDisabled = ref<boolean>(false);
const requestList = ref<RequestItem[]>([]);
const currentPurposeName = ref<string>("Finalidade");
const currentSectionName = ref<string>("");
const securityDeposit = ref<string>("0,00");
const purpouses = ref<Purpose[]>([]);
const grandTotal = ref<string>("0,00");
const returnData = ref<Date>(new Date());
const recipient = ref<string>("");
const isDisabledSection = computed(() => selectedSections.value.length <= 0);
const selectedRow = ref<RequestItem>({} as RequestItem);

const requestService = new RequestService();

function makeRequest(): Request {
    return {
        total: grandTotal.value,
        securityDeposit: securityDeposit.value,
        returnDate: returnData.value?.toISOString(),
        purposeData: {
            name: currentPurposeName.value,
            section: currentSectionName.value,
            recipient: recipient.value,
        },
        productsData: makeProductData(),
    };
}

function makeProductData(): ProductData[] {
    if (requestList.value.length === 0) return [];

    return requestList.value.map((row) => ({
        productId: row.productId,
        quantity: row.quantity,
        condition: {
            comment: row.state.comment,
            status: row.state.status,
        },
        variations: row.variations?.map((v) => v.id),
    }));
}

const isValidPurpose = computed(() =>
    purpouses.value.some((p) => p.name === currentPurposeName.value)
);

const isValidSection = computed(() => {
    if (selectedSections.value.length > 0) {
        return selectedSections.value.some((s) => s === currentSectionName.value);
    }

    return true;
});

const isValidRecipient = computed(() => {
    if (recipient.value === "" && !recipientIsDisabled.value) return false;

    return true;
});

const isValidRequest = computed(() => {
    const isValidRequestList = requestList.value.length > 0;

    if (
        isValidPurpose.value &&
        isValidSection.value &&
        isValidRequestList &&
        isValidRecipient.value
    )
        return true;

    return false;
});

async function request() {
    const request = makeRequest();

    await requestService
        .requestItems(request)
        .then((res) => {
            if (res.value) {
                alert("Aconteceu um erro durante a requisição.");
                return;
            }

            alert("Requisição feita com sucesso!");
            clearValues();
        })
        .catch((err) => {
            console.log(err);
            alert("Aconteceu um erro durante a requisição.");
        });
}

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
    if (purposeName === PURPOSE) {
        currentSectionName.value = SECTION;
        selectedSections.value = [];
        return;
    }

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
        recipientIsDisabled.value = true;
        return;
    }

    recipientIsDisabled.value = false;
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
        recipientIsDisabled.value = true;
        return;
    }

    recipientIsDisabled.value = false;

    disableComplementaryDataToThePurpose(currentPurposeName.value);
}

function removeRequestRow(id: string): void {
    requestList.value = requestList.value.filter((r) => r.id !== id);
    calculateGrandTotal();
}

function clearRequestList() {
    requestList.value = [];
    grandTotal.value = "0,00";
    securityDeposit.value = "0,00";
}

function calculateSecurityDeposit() {
    const total = convertToNumber(grandTotal.value);
    const doubleTotal = (total * 2) / 100;
    securityDeposit.value = formatCurrency(doubleTotal);
}

function calculateGrandTotal() {
    requestList.value.forEach((row, idx) => {
        if (idx === 0) {
            grandTotal.value = row.total;
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

function showDescribeItemStatusDialog(row: RequestItem) {
    selectedRow.value = row;
    describeItemStateDialogRef.value?.initializeItemState(row.state.status, row.state.comment);
    describeItemStateDialogRef.value?.show();
}

function listVariations(itemVariation?: Variation[]) {
    if (!itemVariation) return "";

    const values = itemVariation.map((v) => `${v.name}: ${v.value}`);

    return values.join(" | ");
}

function clearValues() {
    returnData.value = new Date();
    currentPurposeName.value = PURPOSE;
    currentSectionName.value = SECTION;
    selectedSections.value = [];
    recipient.value = "";
    requestList.value = [];
    grandTotal.value = "0,00";
    securityDeposit.value = "0,00";
}

listPurposes();
</script>

<template>
    <div class="w-full h-20 sm:h-24 py-4 bg-primary flex justify-center items-center">
        <img src="/images/logo.png" alt="Logotipo da Raviish" class="h-full" />
    </div>

    <section class="section-content md:mb-20 mb-44 sm:mb-36">
        <h1 class="flex-1 text-center my-8 sm:my-10 text-xl sm:text-2xl">
            Guia de Saída de Artigos
        </h1>

        <section>
            <form>
                <div class="flex items-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
                    <input class="input-field" placeholder="John Doe" :disabled="true" />

                    <input v-model="returnData" type="date" class="input-field" />
                </div>

                <div class="flex items-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
                    <VSelect
                        :value="currentPurposeName"
                        placeholder="Finalidade"
                        :options="getPurposeNames()"
                        :is-invalid="!isValidPurpose"
                        @change="findSectionByPurpose"
                    />

                    <VSelect
                        :value="currentSectionName"
                        placeholder="Secção"
                        :options="selectedSections"
                        :disabled="isDisabledSection"
                        :is-invalid="!isValidSection"
                        @change="updateCurrentSectionName"
                    />
                </div>

                <input
                    v-model="recipient"
                    :placeholder="selectedPlaceholder"
                    :disabled="recipientIsDisabled"
                    class="input-field mb-4"
                    :class="{ invalid: !isValidRecipient }"
                />
            </form>
        </section>

        <section>
            <div
                class="h-table-lg p-3 flex flex-col justify-between border border-light-500 overflow-hidden"
            >
                <span
                    class="material-symbols-outlined hover:text-red-500 ms-auto p-2"
                    @click="clearRequestList"
                >
                    delete
                </span>
                <!-- <button class="ms-auto p-2 hover:bg-red-500 hover:bg-opacity-25"></button> -->

                <div class="flex-1 overflow-y-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="min-w-16 w-16">ID</th>
                                <th class="min-w-52">Item</th>
                                <th class="min-w-10 w-16">QTD</th>
                                <th class="min-w-36 w-36">Preço Unid (Kz)</th>
                                <th class="min-w-36 w-36">Total (Kz)</th>
                                <th class="min-w-10 w-10"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(row, idx) in requestList" :key="idx" class="cursor-pointer">
                                <td>{{ row.id }}</td>
                                <td @click="showDescribeItemStatusDialog(row)">
                                    {{ row.name }}
                                    <br />
                                    <span class="text-light-600 text-sm">{{
                                        listVariations(row?.variations)
                                    }}</span>
                                </td>
                                <td>{{ row.quantity }}</td>
                                <td>{{ row.price }}</td>
                                <td>{{ row.total }}</td>
                                <td class="cursor-pointer" @click="removeRequestRow(row.id)">X</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button class="btn-secondary w-full" @click="showAddItemDialog">Adicionar</button>
            </div>
        </section>
    </section>

    <section class="w-full fixed mx-auto bottom-0 z-50 shadow-lg shadow-primary">
        <div
            class="flex justify-between items-center section-content p-4 bg-white flex-wrap flex-col-reverse md:flex-row md:flex-nowrap gap-4"
        >
            <div class="flex flex-wrap sm:flex-nowrap gap-4 w-full md:w-auto pb-4 md:pb-0">
                <button
                    class="btn-secondary w-full md:flex-1"
                    @click="request"
                    :disabled="!isValidRequest"
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
        :request-list="requestList"
    />

    <DescribeItemStateDialog :row="selectedRow" ref="describeItemStateDialogRef" />
</template>
