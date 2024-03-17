<script lang="ts" setup>
import type { ChoosePurpose } from "#build/components";
import { getCurrentLocalDateTime } from "@frontend/helpers/current_local_date_time";
import { GoodsIssueService } from "@frontend/services/goods_issue_service";
import { GoodsIssueNote } from "@frontend/domain/goods_issue_note";
import { handleException } from "@frontend/helpers/error_handler";
const returnDate = ref<string>(getCurrentLocalDateTime());

const goodsIssueService = new GoodsIssueService();
const note = reactive<GoodsIssueNote>(new GoodsIssueNote(returnDate.value));

function newGoodsIssue() {
    goodsIssueService
        .new(note as GoodsIssueNote)
        .then(({ message }) => {
            alert(message);
            note.clear();
        })
        .catch(handleException);
}
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">Guia de Saída de Artigos</h1>

        <section class="space-y-4 mb-4">
            <div class="input-container">
                <div class="input-disabled">John Doe</div>
                <input v-model="returnDate" type="datetime-local" class="input-field" />
            </div>

            <ChoosePurpose @choosed="note.setPurpose($event)" />
        </section>

        <IssueNote :note="note" />
    </section>

    <section class="footer">
        <div class="footer-container">
            <div class="flex flex-wrap sm:flex-nowrap gap-4 w-full md:w-auto pb-4 md:pb-0">
                <button class="btn-secondary" :disabled="!note.isValid()" @click="newGoodsIssue">
                    Solicitar
                </button>
                <button class="btn-light" @click="note.clear()">Cancelar</button>
            </div>

            <div
                class="text-sm md:text-base flex flex-col sm:flex-row justify-center gap-2 w-full md:w-auto overflow-hidde"
            >
                <p
                    class="text-center w-full md:w-auto md:text-right space-x-1 sm:max-w-80 truncate overflow-hidden"
                >
                    <span class="font-medium">Total Geral (Kz):</span>
                    <span>{{ note.formattedGrossTotal }}</span>
                </p>

                <p
                    class="text-center w-full md:w-auto md:text-right space-x-1 sm:max-w-80 truncate overflow-hidden"
                >
                    <span class="font-medium">Caução (Kz):</span>
                    <span>{{ note.formattedSecurityDeposit }}</span>
                </p>
            </div>
        </div>
    </section>
</template>
