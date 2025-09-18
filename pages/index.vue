<script setup lang="ts">
import { formatCurrency } from "~/lib/frontend/helpers/format_currency";
import type { DashboardModel } from "~/lib/frontend/models/dashboard";
import { DashboardService } from "~/lib/frontend/services/dashboard_service";

const statistics = ref<DashboardModel>({
    totalExpiredGoodsIssueNotes: 0,
    totalOutOfStockItems: 0,
    totalInStockItems: 0,
    totalInventoryValue: 0,
    percentageOfItemsInStock: {
        goodPercentage: 0,
        badPercentage: 0,
    },
});

const service = new DashboardService();

onMounted(async () => {
    statistics.value = await service.getStatistics();
});
</script>
<template>
    <div class="section-content md:h-screen h-full max-h-full">
        <h1 class="page-title">Dashboard</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="card">
                <span class="material-symbols-outlined text-3xl"> calendar_month </span>
                <h1>{{ statistics.totalExpiredGoodsIssueNotes }}</h1>
                <p class="text-sm text-gray-500">Guias de saída vencidas</p>
            </div>

            <div class="card">
                <span class="material-symbols-outlined text-3xl"> trending_down </span>
                <h1>{{ statistics.totalOutOfStockItems }}</h1>
                <p class="text-sm text-gray-500">Artigos com stock esgotado</p>
            </div>

            <div class="card">
                <span class="material-symbols-outlined text-3xl"> paid </span>
                <h1>{{ formatCurrency(statistics.totalInventoryValue) }} Kz</h1>
                <p class="text-sm text-gray-500">Valor de mercadoria em stock</p>
            </div>

            <div class="card">
                <span class="material-symbols-outlined text-3xl"> add_box </span>
                <h1>{{ statistics.totalInStockItems }}</h1>
                <p class="text-sm text-gray-500">Artigos em stock</p>
            </div>

            <div class="card">
                <span class="material-symbols-outlined text-3xl"> percent </span>
                <h1>
                    {{ statistics.percentageOfItemsInStock.goodPercentage.toFixed(2) }}
                </h1>
                <p class="text-sm text-gray-500">Percentagem de artigos em bom estado</p>
            </div>

            <div class="card">
                <span class="material-symbols-outlined text-3xl"> percent </span>
                <h1>
                    {{ statistics.percentageOfItemsInStock.badPercentage.toFixed(2) }}
                </h1>
                <p class="text-sm text-gray-500">Percentagem de artigos em mau estado</p>
            </div>
        </div>
    </div>
</template>
