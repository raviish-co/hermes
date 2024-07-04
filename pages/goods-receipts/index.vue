<script setup lang="ts">
import type { GoodsReceiptNoteModel } from "~/lib/frontend/models/goods_receipt_note";
import { GoodsReceiptService } from "~/lib/frontend/services/goods_receipt_service";
import { formatDate } from "~/lib/frontend/helpers/format_date";

const goodsReceiptService = new GoodsReceiptService();
const notes = ref<GoodsReceiptNoteModel[]>([]);

onMounted(async () => {
    notes.value = await goodsReceiptService.getAll();
});
</script>
<template>
    <div class="section-content">
        <h1 class="page-title">Guias de Entrada</h1>

        <div class="table-container">
            <div v-if="notes.length > 0" class="overflow-y-auto">
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th class="min-w-20 w-20">ID</th>
                            <th class="min-w-40 w-40"></th>
                            <th class="min-w-60 w-60"></th>
                            <th class="min-w-40 w-40">Data de entrada</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="note in notes" :key="note.noteId">
                            <td class="link">
                                {{ note.noteId }}
                            </td>
                            <td></td>
                            <td></td>

                            <td class="text-gray-500">{{ formatDate(note.entryDate) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p v-else class="text-gray-500 text-center">
                Não existem guias de entrada no momento. Crie uma nova
            </p>
        </div>

        <NuxtLink to="/goods-receipts/register">
            <button class="btn-circle">
                <span class="material-symbols-outlined">add</span>
            </button>
        </NuxtLink>
    </div>
</template>
