<script setup lang="ts">
import { GoodsReceiptNote } from "~/lib/frontend/domain/goods_receipt_note";
import { getCurrentLocalDateTime } from "~/lib/frontend/helpers/current_local_date_time";
import { handleException } from "~/lib/frontend/helpers/error_handler";
import { GoodsReceiptService } from "~/lib/frontend/services/goods_receipt_service";

const entryDate = ref<string>(getCurrentLocalDateTime());
const note = reactive<GoodsReceiptNote>(new GoodsReceiptNote(entryDate.value));

const goodsReceiptService = new GoodsReceiptService();

function newGoodsReceipt() {
    goodsReceiptService
        .new(note as GoodsReceiptNote)
        .then(({ message }) => {
            alert(message);
            note.clear();
        })
        .catch(handleException);
}
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">Guia de Entrada de Mercadoria</h1>

        <section class="space-y-4 mb-4">
            <div class="input-container">
                <div class="input-disabled">John Doe</div>
                <input v-model="entryDate" type="datetime-local" class="input-field" />
            </div>

            <ReceiptNote :note="(note as GoodsReceiptNote)" />
        </section>
    </section>

    <section class="footer">
        <div class="footer-container">
            <div class="flex flex-wrap sm:flex-nowrap gap-4 w-full md:w-auto pb-4 md:pb-0">
                <button
                    class="btn-secondary min-w-fit"
                    :disabled="!note.isValid()"
                    @click="newGoodsReceipt"
                >
                    Dar entrada
                </button>
                <button class="btn-light" @click="note.clear()">Cancelar</button>
            </div>
        </div>
    </section>
</template>
