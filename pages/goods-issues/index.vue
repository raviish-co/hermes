<script setup lang="ts">
import { formatDate } from "@frontend/helpers/format_date";
import CreateButton from "~/components/CreateButton.vue";
import ThePagination from "~/components/ThePagination.vue";
import type { GoodsIssueNoteModel } from "~/lib/frontend/models/goods_issue_note";
import type { PurposeModel } from "~/lib/frontend/models/purpose";
import { GoodsIssueService } from "~/lib/frontend/services/goods_issue_service";

const criteria = ref<string>("");
const notes = ref<GoodsIssueNoteModel[]>([]);
const pages = ref<number>(1);
const service = new GoodsIssueService();
const auth = useAuth();

function formatPurpose(purpose: PurposeModel) {
    return Object.values(purpose)
        .filter((value) => value)
        .join(" | ");
}

async function search() {
    if (!criteria.value) {
        const response = await service.list();
        notes.value = response.notes;
        pages.value = response.total;
        return;
    }

    if (criteria.value.length < 3) return;
    notes.value = await service.search(criteria.value);
}

function changePageToken(value: number) {
    service.list(value).then((res) => {
        notes.value = res.notes;
        pages.value = res.total;
    });
}

onMounted(async () => {
    await auth.checkAuth();

    const response = await service.list();

    notes.value = response.notes;
    pages.value = response.total;
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

        <CreateButton path="/goods-issues/register" title="Criar" />

        <div class="table-container">
            <div class="overflow-y-auto">
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th class="min-w-20 w-20">ID</th>
                            <th class="min-w-40 w-40">Data de saída</th>
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
            <p v-if="notes.length === 0" class="pt-10 text-gray-500 text-center">
                Não existem guias de saída no momento. Crie uma nova
            </p>
        </div>
        <div class="py-8">
            <ThePagination :total="pages" @changed="changePageToken" />
        </div>
    </div>
</template>
