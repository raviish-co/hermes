<script setup lang="ts">
import type { VDialog } from "#build/components";
import { convertToNumber } from "@frontend/helpers/convert_to_number";
import type { ItemModel, VariationValue } from "@frontend/models/item";
import { formatCurrency } from "@frontend/helpers/format_currency";
import type { GoodsIssueLine } from "@frontend/models/goods_issue";

interface Props {
    goodsIssueLines: GoodsIssueLine[];
    items: ItemModel[];
    pages: number;
}

interface Emits {
    (e: "added"): void;
    (e: "input", value: string): void;
    (e: "pageTokenChanged", searchText: string, pageToken: number): void;
}

const dialogRef = ref<typeof VDialog>();
const searchText = ref<string>("");
const total = ref<string>("0,00");
const quantities = ref<number[]>([]);

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

function itemExistInGoodsIssueLines(itemId: string): boolean {
    return props.goodsIssueLines.some((i) => i.itemId == itemId);
}

function emitLineAdded(item: ItemModel, idx: number) {
    addLine(item, idx);

    emits("added");
}

function validateQuantity(stock: number, quantity: number): boolean {
    if (quantity <= 0) return false;

    if (quantity > stock) return false;

    return true;
}

function calculateTotal(price: string, quantity: number): string {
    const p = convertToNumber(price);
    const total = (p * quantity) / 100;
    return formatCurrency(total);
}

function toGoodsIssueLine(item: ItemModel, quantity: number, total: string): GoodsIssueLine {
    return { ...item, stock: item.quantity, quantity, total };
}

function addLine(item: ItemModel, idx: number) {
    const quantity = quantities.value[idx];

    if (!validateQuantity(item.quantity, quantity)) return;

    if (itemExistInGoodsIssueLines(item.itemId)) return;

    total.value = calculateTotal(item.price, quantity);

    const newItem = toGoodsIssueLine(item, quantity, total.value);

    props.goodsIssueLines.push(newItem);

    quantities.value[idx] = 1;
}

function initializeQuantities() {
    props.items.forEach((_, idx) => (quantities.value[idx] = 1));
}

function listVariationValues(variationValues?: VariationValue[]) {
    if (!variationValues) return "";

    const values = variationValues.map((v) => v.value);

    return values.join(" | ");
}

function canEditQuantity(item: ItemModel): boolean {
    return item.quantity > 0;
}

function emitInputValue() {
    emits("input", searchText.value);
}

function emitChangePageToken(pageToken: number) {
    emits("pageTokenChanged", searchText.value, pageToken);
}

function showDialog() {
    initializeQuantities();
    dialogRef.value?.show();
}

defineExpose({ show: showDialog, initializeQuantities });
</script>

<template>
    <VDialog ref="dialogRef" title="Pesquisar Artigo" class="max-w-[36rem]">
        <input
            placeholder="Pesquisar artigos..."
            type="search"
            v-model="searchText"
            class="input-field"
            @input="emitInputValue"
        />

        <div class="overflow-x-auto w-full">
            <table class="table">
                <thead>
                    <tr class="text-left">
                        <th class="min-w-36 w-36">Nome</th>
                        <th class="min-w-16 w-16">Stock</th>
                        <th class="min-w-12 w-12 md:w-16">QTD</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(item, idx) in items"
                        :key="item.itemId"
                        class="hover:bg-gray-50"
                        :class="{ hidden: itemExistInGoodsIssueLines(item.itemId) }"
                    >
                        <td class="cursor-pointer" @click="emitLineAdded(item, idx)">
                            <span>
                                {{ item.name }}
                            </span>

                            <br />

                            <span class="text-light-600 text-xs sm:text-sm">
                                {{ listVariationValues(item?.variationsValues) }}
                            </span>
                        </td>

                        <td>
                            <span> {{ item.quantity === 0 ? "Esgotado" : item.quantity }}</span>
                        </td>

                        <td class="text-xs">
                            <input
                                v-model="quantities[idx]"
                                type="number"
                                placeholder="QTD"
                                min="0"
                                :disabled="!canEditQuantity(item)"
                                class="input-number"
                                :max="item.quantity"
                                @keypress.enter="emitLineAdded(item, idx)"
                                @keydown.tab="emitLineAdded(item, idx)"
                            />
                        </td>
                    </tr>

                    <tr v-if="items.length === 0">
                        <td colspan="3">Nenhum artigo encontrado</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <ThePagination :total="pages" @changed="emitChangePageToken" />
    </VDialog>
</template>
