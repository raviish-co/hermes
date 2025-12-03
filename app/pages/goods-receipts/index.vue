<script setup lang="ts">
import type { GoodsReceiptNoteModel } from "@frontend/models/goods_receipt_note";
import { GoodsReceiptService } from "@frontend/services/goods_receipt_service";
import { formatDate } from "@frontend/helpers/format_date";
import ThePagination from "~/components/ThePagination.vue";
import CreateButton from "~/components/CreateButton.vue";

const goodsReceiptService = new GoodsReceiptService();
const notes = ref<GoodsReceiptNoteModel[]>([]);
const pages = ref<number>(1);

function changePageToken(pageToken: number) {
    goodsReceiptService.getAll(pageToken).then((res) => {
        notes.value = res.notes;
        pages.value = res.total;
    });
}

const auth = useAuth();

onMounted(async () => {
    await auth.checkAuth();

    const result = await goodsReceiptService.getAll();

    notes.value = result.notes;
    pages.value = result.total;
});
</script>
<template>
    <div class="section-content">
        <h1 class="page-title">Guias de Entrada</h1>

        <CreateButton path="/goods-receipts/register" title="Criar" />

        <div class="table-container">
            <div class="overflow-y-auto">
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
                        <tr
                            v-for="note in notes.sort((a, b) => b.noteId.localeCompare(a.noteId))"
                            :key="note.noteId"
                        >
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
            <p v-if="notes.length === 0" class="pt-10 text-gray-500 text-center">
                Não existem guias de entrada no momento. Crie uma nova
            </p>

            <div class="py-6">
                <ThePagination :total="pages" @changed="changePageToken" />
            </div>
        </div>
    </div>
</template>
