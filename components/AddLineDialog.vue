<script setup lang="ts">
import type { VDialog } from "#build/components";
import { convertToNumber } from "@frontend/helpers/convert_to_number";
import type { ItemModel, VariationValue } from "@frontend/models/item";
import { CatalogService } from "@frontend/services/catalog_service";
import { formatCurrency } from "@frontend/helpers/format_currency";
import type { GoodsIssueLine } from "@frontend/models/goods_issue";

interface Props {
    goodsIssueLines: GoodsIssueLine[];
}

interface Emits {
    (e: "added"): void;
}

const dialogRef = ref<typeof VDialog>();
const query = ref<string>("");
const items = ref<ItemModel[]>([]);
const total = ref<string>("0,00");
const pages = ref<number>(1);
const quantities = ref<number[]>([]);

const catalogService = new CatalogService();

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

function toGoodsIssueItem(item: ItemModel, quantity: number, total: string): GoodsIssueLine {
    return { ...item, stock: item.quantity, quantity, total };
}

function addLine(item: ItemModel, idx: number) {
    const quantity = quantities.value[idx];

    if (!validateQuantity(item.quantity, quantity)) return;

    if (itemExistInGoodsIssueLines(item.itemId)) return;

    total.value = calculateTotal(item.price, quantity);

    const newItem = toGoodsIssueItem(item, quantity, total.value);

    props.goodsIssueLines.push(newItem);

    quantities.value[idx] = 1;
}

async function listItems(pageToken: number = 1) {
    const { items: i, total } = await catalogService.listItems(pageToken);

    items.value = i;
    pages.value = total;

    initializeQuantities();
}

async function searchItems(pageToken: number = 1) {
    if (query.value.length < 3) {
        listItems();
        return;
    }

    const { items: i, total } = await catalogService.searchItems(query.value, pageToken);

    items.value = i;
    pages.value = total;

    initializeQuantities();
}

function initializeQuantities() {
    items.value.forEach((_, idx) => (quantities.value[idx] = 1));
}

function listVariationValues(variationValues?: VariationValue[]) {
    if (!variationValues) return "";

    const values = variationValues.map((v) => v.value);

    return values.join(" | ");
}

function changePageToken(pageToken: number) {
    if (query.value.length >= 3) {
        searchItems(pageToken);
        return;
    }

    listItems(pageToken);
}

function canEditQuantity(item: ItemModel): boolean {
    return item.quantity > 0;
}

function showDialog() {
    listItems();
    dialogRef.value?.show();
}

defineExpose({ show: showDialog });
</script>

<template>
    <VDialog ref="dialogRef" title="Pesquisar Artigo" class="max-w-[36rem]">
        <input
            placeholder="Pesquisar artigos..."
            type="search"
            v-model="query"
            class="input-field"
            @input="() => searchItems()"
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

        <ThePagination :total="pages" @changed="changePageToken" />
    </VDialog>
</template>
