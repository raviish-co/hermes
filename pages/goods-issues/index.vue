<script setup lang="ts">
import { formatDate } from "@frontend/helpers/format_date";
import type { GoodsIssueNoteModel } from "~/lib/frontend/models/goods_issue_note";
import type { PurposeModel } from "~/lib/frontend/models/purpose";
import { GoodsIssueService } from "~/lib/frontend/services/goods_issue_service";

const criteria = ref<string>("");
const notes = ref<GoodsIssueNoteModel[]>([]);
const service = new GoodsIssueService();

function formatPurpose(purpose: PurposeModel) {
    return Object.values(purpose)
        .filter((value) => value)
        .join(" | ");
}

async function search() {
    if (!criteria.value) {
        notes.value = await service.list();
        return;
    }

    if (criteria.value.length < 3) return;
    notes.value = await service.search(criteria.value);
}

onMounted(async () => {
    notes.value = await service.list();
});
</script>

<template>
    <div class="section-content">
        <h1 class="page-title">Guias de Saída</h1>
        <div class="mb-6">
            <input
                type="text"
                placeholder="Pesquisar guias..."
                class="input-field"
                v-model="criteria"
                @input="search"
            />
        </div>

        <div class="table-container">
            <div class="overflow-y-auto">
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
                                <NuxtLink :to="`/goods-issues/${note.goodsIssueNoteId}`">
                                    {{ note.goodsIssueNoteId }}
                                </NuxtLink>
                            </td>
                            <td class="text-gray-500">{{ formatDate(note.returnDate) }}</td>
                            <td class="text-gray-500">{{ formatPurpose(note.purpose) }}</td>
                            <td>
                                <span
                                    v-if="note.status === 'Por Devolver'"
                                    class="badge badge-danger"
                                >
                                    {{ note.status }}
                                </span>

                                <span v-else class="badge badge-success">{{ note.status }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p v-if="notes.length === 0" class="text-gray-500 text-center">
                Não foram encontradas guias de saída.
            </p>
        </div>

        <NuxtLink to="/goods-issues/register">
            <button class="btn-circle mt-8 ml-auto block">
                <span class="material-symbols-outlined">add</span>
            </button>
        </NuxtLink>
    </div>
</template>
