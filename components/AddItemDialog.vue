<script setup lang="ts">
import type { VDialog } from "#build/components";
import { convertToNumber } from "@frontend/helpers/convert_to_number";
import type { GoodsIssueItem } from "@frontend/models/goods_issue_item";
import type { ItemModel, VariationValue } from "@frontend/models/item";
import { CatalogService } from "@frontend/services/catalog_service";
import { formatCurrency } from "@frontend/helpers/format_currency";

interface Props {
    goodsIssueItems: GoodsIssueItem[];
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

function itemExistInGoodsIssueItems(itemId: string): boolean {
    return props.goodsIssueItems.some((i) => i.itemId == itemId);
}

function emitItemAdded(item: ItemModel, idx: number) {
    addItem(item, idx);

    emits("added");
}

function validateQuantity(itemQuantityInStock: number, quantity: number): boolean {
    if (quantity <= 0) return false;

    if (quantity > itemQuantityInStock) return false;

    return true;
}

function calculateTotal(price: string, isUnique: boolean, quantity: number): string {
    if (isUnique) return price;

    const p = convertToNumber(price);
    const total = (p * quantity) / 100;
    return formatCurrency(total);
}

function toGoodsIssueItem(item: ItemModel, quantity: number, total: string): GoodsIssueItem {
    return { ...item, stock: item.quantity, quantity, total };
}

function addItem(item: ItemModel, idx: number) {
    const quantity = quantities.value[idx];

    if (!validateQuantity(item.quantity, quantity)) return;

    if (itemExistInGoodsIssueItems(item.itemId)) return;

    total.value = calculateTotal(item.price, item.isUnique, quantity);

    const newItem = toGoodsIssueItem(item, quantity, total.value);

    props.goodsIssueItems.push(newItem);

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
    return !item.isUnique && item.quantity > 0;
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
                        :class="{ hidden: itemExistInGoodsIssueItems(item.itemId) }"
                    >
                        <td class="cursor-pointer" @click="emitItemAdded(item, idx)">
                            <span>
                                {{ item.name }}
                            </span>

                            <br />

                            <span class="text-light-600 text-xs sm:text-sm">
                                {{ listVariationValues(item?.variationsValues) }}
                            </span>
                        </td>

                        <td>
                            <div>
                                <span v-if="item.isUnique">Único</span>
                                <span v-else>
                                    {{ item.quantity === 0 ? "Esgotado" : item.quantity }}</span
                                >
                            </div>
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
                                @keypress.enter="emitItemAdded(item, idx)"
                                @keydown.tab="emitItemAdded(item, idx)"
                            />
                        </td>
                    </tr>

                    <tr v-if="items.length === 0">
                        <td colspan="3">Nenhum artigo encontrado</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p>
            <ThePagination :total="pages" @changed="changePageToken" />
        </p>
    </VDialog>
</template>
