<script setup lang="ts">
import type { GoodsReturnNoteModel } from "~/lib/frontend/models/goods_return_note";
import { formatDate } from "~/lib/frontend/helpers/format_date";
import { GoodsReturnService } from "~/lib/frontend/services/goods_return_service";
import { formatVariationValues } from "~/lib/frontend/helpers/format_variation_values";
import { formatCurrency } from "~/lib/frontend/helpers/format_currency";

const route = useRoute();
const noteId = route.params.id as string;
const note = ref<GoodsReturnNoteModel>();

const service = new GoodsReturnService();

onMounted(async () => {
    note.value = await service.getById(noteId);
});
</script>
<template>
    <div>
        <section class="section-content">
            <h1 class="page-title">Guia de Devolução de Artigos #{{ note?.goodsReturnNoteId }}</h1>
            <section class="space-y-4 mb-4">
                <div class="input-container">
                    <div class="input-disabled">John Doe</div>
                    <div class="input-disabled">{{ note ? formatDate(note.issuedAt) : "" }}</div>
                </div>

                <div class="input-container">
                    <div class="input-field flex justify-between">
                        <span>Guia de Saída:</span>
                        <NuxtLink
                            class="link"
                            :to="{ path: `/goods-issues/${note?.goodsIssueNoteId}` }"
                        >
                            {{ note?.goodsIssueNoteId }}
                        </NuxtLink>
                    </div>
                    <div class="input-disabled flex justify-between">
                        <span>Valor retido:</span>
                        <span>
                            {{ note ? formatCurrency(note.securityDepositWithHeld) : "" }}
                        </span>
                    </div>
                </div>
            </section>

            <VNote :isReturned="true" :showButtons="false">
                <div class="overflow-y-auto">
                    <table class="table">
                        <thead>
                            <tr class="text-left">
                                <th class="min-w-64 w-64">Artigo</th>
                                <th class="min-w-20 w-20">Bom Estado</th>
                                <th class="min-w-20 w-20">Mau Estado</th>
                                <th class="min-w-20 w-20">Total</th>
                                <th class="min-w-20 w-20">Comentário</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="line in note?.lines">
                                <td>
                                    {{ line.name }}

                                    <br />

                                    <span class="text-light-600 text-sm">
                                        {{ formatVariationValues(line.variationValues) }}
                                    </span>
                                </td>
                                <td>{{ line.goodQuantities }}</td>
                                <td>{{ line.badQuantities }}</td>
                                <td>{{ line.total }}</td>
                                <td>{{ line.condition?.comment }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </VNote>
        </section>
    </div>
</template>
