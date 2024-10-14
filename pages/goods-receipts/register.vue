<script setup lang="ts">
import { getCurrentLocalDateTime } from "~/lib/frontend/helpers/current_local_date_time";
import { GoodsReceiptService } from "~/lib/frontend/services/goods_receipt_service";
import { GoodsReceiptNote } from "~/lib/frontend/domain/goods_receipt_note";

const entryDate = getCurrentLocalDateTime();
const note = reactive(new GoodsReceiptNote(entryDate));
const service = new GoodsReceiptService();
const auth = useAuth();

function newGoodsReceipt() {
    service
        .new(note as GoodsReceiptNote)
        .then((res) => {
            alert(res.message);
            note.clearLines();
        })
        .catch((err) => alert(err.statusMessage));
}
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">Guia de Entrada de Mercadoria</h1>

        <section class="space-y-4 mb-4">
            <div class="input-container">
                <div class="input-disabled">{{ auth.getName() }}</div>
                <input v-model="note.entryDate" type="datetime-local" class="input-field" />
            </div>
        </section>
        <ReceiptNote :note="note as GoodsReceiptNote" />
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
                <button class="btn-light" @click="$router.push('/goods-receipts/')">
                    Cancelar
                </button>
            </div>
        </div>
    </section>
</template>
