<script setup lang="ts">
import { formatVariationValues } from "~/lib/frontend/helpers/format_variation_values";
import { CatalogService } from "~/lib/frontend/services/catalog_service";
import { formatCurrency } from "~/lib/frontend/helpers/format_currency";
import type { ItemModel } from "~/lib/frontend/models/item";

const items = ref<ItemModel[]>([]);
const pages = ref<number>(1);

const service = new CatalogService();

async function changePage(page: number) {
    const res = await service.listItems(page);
    items.value = res.items;
    pages.value = res.total;
}

onMounted(async () => {
    const res = await service.listItems();
    items.value = res.items;
    pages.value = res.total;
});
</script>

<template>
    <div class="section-content">
        <h1 class="page-title">Artigos</h1>
        <div class="table-container overflow-y-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th class="min-w-20 w-20">ID</th>
                        <th class="min-w-60 w-60 text-left">Descrição</th>
                        <th class="min-w-40 w-40">Preço Kz</th>
                        <th class="min-w-40 w-40">Stock</th>
                        <th class="min-w-40 w-40">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.itemId" class="text-center">
                        <td>{{ item.itemId }}</td>
                        <td class="text-left">
                            {{ item.name }} <br />
                            <span class="text-light-600 text-xs sm:text-sm">
                                {{ formatVariationValues(item.variationsValues) }}</span
                            >
                        </td>
                        <td class="text-gray-500">{{ formatCurrency(item.price) }}</td>
                        <td>{{ item.stock }}</td>
                        <td>{{ item.condition?.status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ThePagination :total="pages" @changed="changePage" />

        <NuxtLink :to="{ path: '/items/register' }">
            <button class="btn-circle mt-8 ml-auto block">
                <span class="material-symbols-outlined">add</span>
            </button>
        </NuxtLink>
    </div>
</template>
