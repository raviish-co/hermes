<script setup lang="ts">
import type { GoodsReturnNoteModel } from "~/lib/frontend/models/goods_return_note";
import { GoodsReturnService } from "~/lib/frontend/services/goods_return_service";
import { formatCurrency } from "~/lib/frontend/helpers/format_currency";
import { formatDate } from "~/lib/frontend/helpers/format_date";

const route = useRoute();
const noteId = route.query.q as string;
const notes = ref<GoodsReturnNoteModel[]>([]);
const service = new GoodsReturnService();

onMounted(async () => {
    notes.value = await service.list();

    if (!noteId) return notes;

    notes.value = notes.value.filter((note) => note.goodsIssueNoteId === noteId);
});
</script>

<template>
    <div class="section-content">
        <h1 class="page-title">Guias de Devoluções</h1>

        <div v-if="notes.length > 0" class="table-container space-y-2">
            <p class="p-2">Filtro: {{ noteId }}</p>
            <table class="table text-center">
                <thead>
                    <tr>
                        <th class="min-w-20 w-20">ID</th>
                        <th class="min-w-40 w-40">Data de emissão</th>
                        <th class="min-w-60 w-60">Guia de Saída</th>
                        <th class="min-w-40 w-40">Valor Retido Kz</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="note in notes" :key="note.goodsReturnNoteId">
                        <td class="link">
                            <NuxtLink :to="note.goodsReturnNoteId">
                                {{ note.goodsReturnNoteId }}
                            </NuxtLink>
                        </td>
                        <td class="text-gray-500">{{ formatDate(note.issuedAt) }}</td>
                        <td class="link">
                            <NuxtLink :to="`/goods-issue/${note.goodsIssueNoteId}`">
                                {{ note.goodsIssueNoteId }}
                            </NuxtLink>
                        </td>
                        <td class="text-gray-500">
                            {{ formatCurrency(note.securityDepositWithHeld) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p v-else class="text-gray-500 text-center">
            Não existem devoluções da guia de saída no momento.
        </p>
    </div>
</template>
