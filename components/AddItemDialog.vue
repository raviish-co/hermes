<script setup lang="ts">
import type { VDialog } from "#build/components";
import { convertToNumber } from "~/lib/helpers/convert_to_number";
import { formatCurrency } from "~/lib/helpers/format_currency";
import type { Item, RequestItem, Variation } from "~/lib/models/item";
import { ItemService } from "~/lib/services/item_service";

interface Props {
    requestList: RequestItem[];
}

interface Emits {
    (e: "added"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const dialogRef = ref<typeof VDialog>();
const query = ref<string>("");
const items = ref<Item[]>([]);
const total = ref<string>("0,00");
const pages = ref<number>(1);
const itemService = new ItemService();
const quantities = ref<number[]>([]);

function emitItemAdded(item: Item, idx: number) {
    addItem(item, idx);

    emits("added");
}

function itemExist(itemId: string): boolean {
    return props.requestList.some((row) => row.id === itemId);
}

function validateQuantity(item: Item, quantity: number): boolean {
    if (quantity <= 0) return false;

    if (quantity > item.stock) return false;

    return true;
}

function addItem(item: Item, idx: number) {
    const quantity = item.isUnique ? 1 : quantities.value[idx];

    if (!validateQuantity(item, quantity)) return;

    if (itemExist(item.id)) return;

    total.value = calculateTotal(item, quantity);

    const newRow = makeRequestItem(item, quantity, total.value);

    props.requestList.push(newRow);

    initializeQuantities();
}

function calculateTotal(item: Item, quantity: number): string {
    if (item.isUnique) return item.price;

    const price = convertToNumber(item.price);
    const total = (price * quantity) / 100;
    return formatCurrency(total);
}

function makeRequestItem(item: Item, quantity: number, total: string) {
    return { ...item, quantity, total };
}

async function searchItems() {
    if (query.value.length < 3) {
        items.value = [];
        return;
    }

    items.value = await itemService.searchItems(query.value);
}

async function listItems(pageToken: number = 1) {
    const { items: i, total: t } = await itemService.listItems(pageToken);

    items.value = i;
    pages.value = t;

    initializeQuantities();
}

function initializeQuantities() {
    items.value.forEach((_, idx) => (quantities.value[idx] = 0));
}

function listVariations(itemVariation?: Variation[]) {
    if (!itemVariation) return "";

    const values = itemVariation.map((v) => `${v.name}: ${v.value}`);

    return values.join(" | ");
}

function showDialog() {
    dialogRef.value?.show();
}

defineExpose({ show: showDialog });

onMounted(async () => {
    await listItems();
});
</script>

<template>
    <VDialog ref="dialogRef" title="Pesquisar Artigo" class="max-w-[36rem]">
        <input
            placeholder="Pesquisar por Nome ou ID"
            type="search"
            v-model="query"
            class="input-field"
            @update:model-value="searchItems"
        />

        <div class="overflow-x-auto w-full">
            <table class="table">
                <thead>
                    <tr>
                        <th class="min-w-16 w-16 hidden sm:initial">ID</th>
                        <th class="min-w-36 w-36">Nome</th>
                        <th class="min-w-16 w-16">Em estoque</th>
                        <th class="min-w-12 w-12 md:w-16">QTD</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-if="items"
                        v-for="(item, idx) in items"
                        :key="item.id"
                        class="hover:bg-gray-50"
                    >
                        <td class="w-16 cursor-pointer hidden sm:initial">{{ item.id }}</td>

                        <td class="cursor-pointer" @click="emitItemAdded(item, idx)">
                            {{ item.name }}

                            <br />

                            <span class="text-light-600 text-xs sm:text-sm">
                                {{ listVariations(item?.variations) }}
                            </span>
                        </td>

                        <td>
                            <div>
                                <span
                                    v-if="item.isUnique"
                                    class="px-2 py-1 bg-secondary-600 rounded-3xl text-white text-center w-fit"
                                >
                                    Único
                                </span>
                                <span v-else> {{ item.stock }}</span>
                            </div>
                        </td>

                        <td class="text-xs">
                            <input
                                v-if="!item.isUnique"
                                v-model="quantities[idx]"
                                type="number"
                                class="input-number"
                                placeholder="QTD"
                                min="0"
                                :max="item.stock"
                            />

                            <input
                                v-else
                                value="1"
                                disabled
                                type="number"
                                class="input-number cursor-not-allowed bg-slate-200"
                                placeholder="QTD"
                                min="0"
                                :max="item.stock"
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
            <ThePagination :total="pages" @changed="listItems" />
        </p>
    </VDialog>
</template>
