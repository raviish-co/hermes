<script setup lang="ts">
import type { VDialog } from "#build/components";
import { formatCurrency, convertToNumber } from "@frontend/helpers/number_format";
import type { GoodsIssueLine } from "@frontend/models/goods_issue";
import type { ItemModel, VariationValue } from "@frontend/models/item";
import { CatalogService } from "@frontend/services/catalog_service";

interface Props {
    requestList: GoodsIssueLine[];
}

interface Emits {
    (e: "added"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const dialogRef = ref<typeof VDialog>();
const query = ref<string>("");
const items = ref<ItemModel[]>([]);
const total = ref<string>("0,00");
const pages = ref<number>(1);
const catalogService = new CatalogService();
const quantities = ref<number[]>([]);

function emitItemAdded(item: ItemModel, idx: number) {
    addItem(item, idx);

    emits("added");
}

function itemExist(itemId: string): boolean {
    return props.requestList.some((row) => row.itemId === itemId);
}

function validateQuantity(item: ItemModel, quantity: number): boolean {
    if (quantity <= 0) return false;

    if (quantity > item.quantity) return false;

    return true;
}

function addItem(item: ItemModel, idx: number) {
    const quantity = item.isUnique ? 1 : quantities.value[idx];

    if (!validateQuantity(item, quantity)) return;

    if (itemExist(item.itemId)) return;

    total.value = calculateTotal(item, quantity);

    const newRow = makeRequestItem(item, quantity, total.value);

    props.requestList.push(newRow);

    quantities.value[idx] = 0;
}

function calculateTotal(item: ItemModel, quantity: number): string {
    if (item.isUnique) return item.price;

    const price = convertToNumber(item.price);
    const total = (price * quantity) / 100;
    return formatCurrency(total);
}

function makeRequestItem(item: ItemModel, quantity: number, total: string) {
    return { ...item, quantity, total };
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

async function listItems(pageToken: number = 1) {
    const { items: i, total } = await catalogService.listItems(pageToken);

    items.value = i;
    pages.value = total;

    initializeQuantities();
}

function initializeQuantities() {
    items.value.forEach((_, idx) => (quantities.value[idx] = 0));
}

function listVariations(variationValues?: VariationValue[]) {
    if (!variationValues) return "";

    const values = variationValues.map((v) => v.value);

    return values.join(" | ");
}

function changeListPage(pageToken: number) {
    if (query.value.length > 0) {
        searchItems(pageToken);
        return;
    }

    listItems(pageToken);
}

function enableToEditQuantity(isUnique: boolean, quantity: number) {
    return !isUnique && quantity > 0;
}

function showDialog() {
    dialogRef.value?.show();
    listItems();
}

defineExpose({ show: showDialog });
</script>

<template>
    <VDialog ref="dialogRef" title="Pesquisar Artigo" class="max-w-[36rem]">
        <input
            placeholder="Pesquisar por Nome ou ID"
            type="search"
            v-model="query"
            class="input-field"
            @input="() => searchItems()"
        />

        <div class="overflow-x-auto w-full">
            <table class="table">
                <thead>
                    <tr>
                        <th class="min-w-16 w-16 hidden sm:initial">ID</th>
                        <th class="min-w-36 w-36">Nome</th>
                        <th class="min-w-16 w-16">Stock</th>
                        <th class="min-w-12 w-12 md:w-16">QTD</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-if="items"
                        v-for="(item, idx) in items"
                        :key="item.itemId"
                        class="hover:bg-gray-50"
                    >
                        <td class="w-16 cursor-pointer hidden sm:initial">{{ item.itemId }}</td>

                        <td class="cursor-pointer" @click="emitItemAdded(item, idx)">
                            {{ item.name }}

                            <br />

                            <span class="text-light-600 text-xs sm:text-sm">
                                {{ listVariations(item?.variationsValues) }}
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
                                v-if="enableToEditQuantity(item.isUnique, item.quantity)"
                                v-model="quantities[idx]"
                                type="number"
                                class="input-number"
                                placeholder="QTD"
                                min="0"
                                :max="item.quantity"
                            />

                            <input
                                v-else
                                :value="item.quantity"
                                disabled
                                type="number"
                                class="input-number"
                            />
                        </td>
                    </tr>

                    <tr v-if="items.length === 0">
                        <td colspan="3">Nenhum resultado encontrado</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p>
            <ThePagination :total="pages" @changed="changeListPage" />
        </p>
    </VDialog>
</template>
~/lib/frontend/helpers/number_format ~/lib/frontend/models/goods_issue~/lib/frontend/models/item
