<script setup lang="ts">
import { GoodsIssueService } from "~/lib/frontend/services/goods_issue_service";
import { GoodsReturnService } from "~/lib/frontend/services/goods_return_service";
import { GoodsReturnNote } from "~/lib/frontend/domain/goods_return_note";
import { GoodsIssueNote } from "~/lib/frontend/domain/goods_issue_note";
import { handleException } from "~/lib/frontend/helpers/error_handler";

const retainedSecurityDeposit = ref<string>("0,00");
const goodsReturnNote = ref<GoodsReturnNote>({} as GoodsReturnNote);
const goodsIssueNote = ref<GoodsIssueNote>({} as GoodsIssueNote);
const editRatainedSecurityDeposit = ref<boolean>(true);

const goodsReturnService = new GoodsReturnService();
const goodsIssueService = new GoodsIssueService();

const route = useRoute();
const noteId = route.params.id as string;

goodsIssueService
    .getById(noteId)
    .then((result) => {
        goodsIssueNote.value = GoodsIssueNote.build(result);
        retainedSecurityDeposit.value = goodsIssueNote.value.formattedSecurityDeposit;
        goodsReturnNote.value = new GoodsReturnNote(goodsIssueNote.value.lines);
    })
    .catch((err) => {
        handleException(err);
        navigateTo("/");
    });

function toggleEdit() {
    editRatainedSecurityDeposit.value = !editRatainedSecurityDeposit.value;
}

function newGoodsReturn() {
    goodsReturnService
        .new(
            goodsIssueNote.value.goodsIssueNoteId,
            retainedSecurityDeposit.value,
            goodsReturnNote.value.lines
        )
        .then(() => {
            alert("Devolução efetuada com sucesso!");
            navigateTo("/");
        })
        .catch(handleException);
}
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">
            Guia de Saída de Artigos - #{{ goodsIssueNote.goodsIssueNoteId }}
        </h1>

        <section class="space-y-4 mb-4">
            <div class="input-container">
                <div class="input-disabled">John Doe</div>
                <div class="input-disabled">{{ goodsIssueNote.returnDate }}</div>
            </div>

            <div class="input-container">
                <div class="input-disabled">{{ goodsIssueNote.purpose?.description }}</div>
                <div class="input-disabled">{{ goodsIssueNote.purpose?.details ?? "N/D" }}</div>
            </div>

            <div class="input-disabled">{{ goodsIssueNote.purpose?.notes }}</div>
        </section>

        <ReturnNote :note="goodsReturnNote" :requested-lines="goodsIssueNote.lines" />
    </section>

    <section class="footer">
        <div class="footer-container">
            <div class="flex flex-wrap gap-2 w-full pb-3 md:w-auto sm:flex-nowrap md:gap-4 md:pb-0">
                <button class="btn-secondary" @click="newGoodsReturn()">Devolver</button>
                <button class="btn-light">Cancelar</button>
            </div>

            <div
                class="flex flex-col text-sm gap-4 items-center w-full sm:flex-row md:text-base md:w-auto"
            >
                <p
                    class="w-full space-x-1 text-left pt-3 md:w-auto md:text-right md:pt-0 sm:text-center"
                >
                    <span class="font-medium">Total de caução (Kz):</span>
                    <span>{{ goodsIssueNote.formattedSecurityDeposit }}</span>
                </p>

                <p class="flex items-center text-center w-full md:w-auto md:text-right space-x-1">
                    <span class="font-medium">Caução a reter (Kz):</span>
                    <input
                        class="input-field max-w-32"
                        v-model="retainedSecurityDeposit"
                        :disabled="editRatainedSecurityDeposit"
                    />
                    <span class="material-symbols-outlined cursor-pointer" @click="toggleEdit">
                        edit
                    </span>
                </p>
            </div>
        </div>
    </section>
</template>
