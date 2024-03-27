<script setup lang="ts">
import type { GoodsIssueNoteModel } from "~/lib/frontend/models/goods_issue_note";
import { GoodsIssueService } from "~/lib/frontend/services/goods_issue_service";
import type { PurposeModel } from "~/lib/frontend/models/purpose";
import { formatDate } from "@frontend/helpers/format_date";

const notes = ref<GoodsIssueNoteModel[]>([]);
const service = new GoodsIssueService();

function formatPurpose(purpose: PurposeModel) {
    const details = purpose.details ? " | " + purpose.details : "";
    return `${purpose.description} ${details} | ${purpose.notes}`;
}

onMounted(async () => {
    notes.value = await service.list();
});
</script>

<template>
    <div class="section-content">
        <h1 class="page-title">Guias de Saída</h1>

        <div v-if="notes.length > 0" class="overflow-y-auto space-y-2">
            <p class="p-2">Filtro:</p>
            <table class="table text-center">
                <thead>
                    <tr>
                        <th class="min-w-20 w-20">ID</th>
                        <th class="min-w-40 w-40">Data de devolução</th>
                        <th class="min-w-60 w-60">Descrição</th>
                        <th class="min-w-40 w-40">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="note in notes" :key="note.goodsIssueNoteId">
                        <td class="link">
                            <NuxtLink :to="note.goodsIssueNoteId">
                                {{ note.goodsIssueNoteId }}
                            </NuxtLink>
                        </td>
                        <td class="text-gray-500">{{ formatDate(note.returnDate) }}</td>
                        <td class="text-gray-500">{{ formatPurpose(note.purpose) }}</td>
                        <td>
                            <span v-if="note.status === 'Por Devolver'" class="badge badge-danger">
                                {{ note.status }}
                            </span>

                            <span v-else class="badge badge-success">{{ note.status }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p v-else class="text-gray-500 text-center">
            Não existem guias de saída no momento. Crie uma nova
        </p>

        <NuxtLink :to="{ path: '/' }">
            <button class="btn-circle mt-8 ml-auto block">
                <span class="material-symbols-outlined">add</span>
            </button>
        </NuxtLink>
    </div>
</template>
