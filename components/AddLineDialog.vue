<script setup lang="ts">
import type { VDialog } from "#build/components";
import type { ItemModel } from "@frontend/models/item";
import { CatalogService } from "@frontend/services/catalog_service";
import { GoodsIssueNote } from "~/lib/frontend/domain/goods_issue_note";
import { formatVariationValues } from "~/lib/frontend/helpers/format_variation_values";
import { initializeQuantities } from "@frontend/helpers/initialize_quantities";
import { GoodsReceiptNote } from "~/lib/frontend/domain/goods_receipt_note";

interface Props {
    note: GoodsIssueNote | GoodsReceiptNote;
    hasLimit?: boolean;
}

const dialogRef = ref<typeof VDialog>();
const searchText = ref<string>("");
const quantities = ref<number[]>([]);
const items = ref<ItemModel[]>([]);
const pages = ref<number>(1);
const catalogService = new CatalogService();

withDefaults(defineProps<Props>(), {
    hasLimit: true,
});

function show() {
    listItems();

    quantities.value = initializeQuantities(items.value.length);

    dialogRef.value?.show();
}

function listItems(pageToken: number = 1) {
    catalogService.listItems(pageToken).then(({ items: i, total }) => {
        items.value = i;
        pages.value = total;
        quantities.value = initializeQuantities(items.value.length);
    });
}

function searchItems(pageToken: number = 1) {
    if (searchText.value.length === 0) {
        listItems();
        return;
    }

    if (searchText.value.length < 3) return;

    catalogService.searchItems(searchText.value, pageToken).then(({ items: i, total }) => {
        items.value = i;
        pages.value = total;
        quantities.value = initializeQuantities(items.value.length);
    });
}

function changePageToken(pageToken: number) {
    if (searchText.value.length >= 3) {
        searchItems(pageToken);
        return;
    }

    listItems(pageToken);
}

defineExpose({ show });
</script>

<template>
    <VDialog ref="dialogRef" title="Pesquisar Artigo" class="max-w-[36rem]">
        <input
            placeholder="Pesquisar artigos..."
            type="search"
            v-model="searchText"
            class="input-field"
            @input="searchItems()"
        />

        <div class="overflow-x-auto w-full">
            <table class="table">
                <thead>
                    <tr class="text-left">
                        <th class="min-w-36 w-36">Nome</th>
                        <th class="min-w-16 w-16 text-center">Stock</th>
                        <th class="min-w-12 w-12 md:w-16 text-center">QTD</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(item, idx) in items"
                        :key="item.itemId"
                        :class="{ hidden: note.isSameLine(item.itemId) }"
                        class="hover:bg-gray-50"
                    >
                        <td class="cursor-pointer" @click="note.addLine(item, quantities[idx])">
                            <span>{{ item.name }}</span>
                            <br />
                            <span class="text-light-600 text-xs sm:text-sm">
                                {{ formatVariationValues(item?.variationsValues) }}
                            </span>
                        </td>

                        <td class="text-center">
                            <span :class="{ 'badge-danger': item.stock === 0 }">
                                {{ item.stock === 0 ? "Esgotado" : item.stock }}
                            </span>
                        </td>

                        <td class="text-xs">
                            <input
                                v-model="quantities[idx]"
                                type="number"
                                placeholder="QTD"
                                min="0"
                                class="input-number text-center"
                                :max="hasLimit ? item.stock : undefined"
                                @keypress.enter="note.addLine(item, quantities[idx])"
                                @keydown.tab="note.addLine(item, quantities[idx])"
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
