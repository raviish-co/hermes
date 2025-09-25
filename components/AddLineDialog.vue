<script setup lang="ts">
import type { VDialog } from "#components";
import { initializeQuantities } from "@frontend/helpers/initialize_quantities";
import type { ItemModel } from "@frontend/models/item";
import { CatalogService } from "@frontend/services/catalog_service";
import type { Note } from "~/lib/frontend/domain/note";
import { formatVariationValues } from "~/lib/frontend/helpers/format_variation_values";

interface Props {
    note: Note;
    hasLimit?: boolean;
    rootPath?: string;
}

const consignmentItemsSelected = ref<boolean[]>([]);

const dialogRef = ref<typeof VDialog>();
const searchText = ref<string>("");
const quantities = ref<number[]>([]);
const items = ref<ItemModel[]>([]);
const pages = ref<number>(1);
const catalogService = new CatalogService();
const warehouse = useWarehouse();

withDefaults(defineProps<Props>(), {
    hasLimit: true,
});

function show() {
    listItems();
    warehouse.listItemsStock();
    dialogRef.value?.show();
}

function listItems(pageToken: number = 1) {
    catalogService.listItems(pageToken).then(({ items: i, total }) => {
        items.value = i;
        pages.value = total;
        quantities.value = initializeQuantities(items.value.length);
        consignmentItemsSelected.value = i.map(() => false);
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
        consignmentItemsSelected.value = i.map(() => false);
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

onMounted(() => warehouse.listItemsStock());
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
                        <th
                            v-if="rootPath === '/goods-receipts/register'"
                            class="min-w-12 w-12 md:w-16 text-center"
                        >
                            Consignação
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(item, idx) in items"
                        :key="item.itemId"
                        :class="{ hidden: note.isSameLine(item.itemId) }"
                        class="hover:bg-gray-50"
                    >
                        <td
                            class="cursor-pointer"
                            @click="
                                note.addLine(
                                    item,
                                    quantities[idx],
                                    warehouse.findItemStock(item.itemId)?.total,
                                    consignmentItemsSelected[idx]
                                )
                            "
                        >
                            <span>{{ item.name }} </span>
                            <br />
                            <span class="text-light-600 text-xs sm:text-sm">
                                {{ formatVariationValues(item?.variationsValues) }}
                            </span>
                        </td>

                        <td class="text-center">
                            <span v-if="!warehouse.findItemStock(item.itemId)" class="badge-danger">
                                Esgotado
                            </span>

                            <span
                                v-else-if="warehouse.findItemStock(item.itemId)?.total === 0"
                                class="badge-danger"
                            >
                                Esgotado
                            </span>

                            <span v-else>{{ warehouse.findItemStock(item.itemId)?.total }}</span>
                        </td>

                        <td class="text-xs">
                            <input
                                v-model="quantities[idx]"
                                type="number"
                                placeholder="QTD"
                                min="0"
                                :disabled="consignmentItemsSelected[idx]"
                                class="input-number text-center"
                                :max="
                                    hasLimit
                                        ? warehouse.findItemStock(item.itemId)?.total
                                        : undefined
                                "
                                @keypress.enter="
                                    note.addLine(
                                        item,
                                        quantities[idx],
                                        warehouse.findItemStock(item.itemId)?.total
                                    )
                                "
                                @keydown.tab="
                                    note.addLine(
                                        item,
                                        quantities[idx],
                                        warehouse.findItemStock(item.itemId)?.total
                                    )
                                "
                            />
                        </td>
                        <td class="text-center" v-if="rootPath === '/goods-receipts/register'">
                            <input
                                v-if="
                                    !warehouse.findItemStock(item.itemId) ||
                                    warehouse.findItemStock(item.itemId)?.total === 0
                                "
                                type="checkbox"
                                v-model="consignmentItemsSelected[idx]"
                                class="w-4 h-4"
                            />
                        </td>
                    </tr>
                    <tr v-if="items.length === 0">
                        <td colspan="4">Nenhum artigo encontrado</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <ThePagination :total="pages" @changed="changePageToken" />
    </VDialog>
</template>
