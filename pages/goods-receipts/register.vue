<script setup lang="ts">
import { getCurrentLocalDateTime } from "~/lib/frontend/helpers/current_local_date_time";
import { GoodsReceiptService } from "~/lib/frontend/services/goods_receipt_service";
import { GoodsReceiptNote } from "~/lib/frontend/domain/goods_receipt_note";
import { handleError } from "~/lib/frontend/utils/error_handler";

const entryDate = getCurrentLocalDateTime();
const userAuthenticatedName = ref<string>("");
const auth = useAuth();

const note = reactive(new GoodsReceiptNote(entryDate));
const service = new GoodsReceiptService();

function newGoodsReceipt() {
    service
        .new(note as GoodsReceiptNote)
        .then((res) => {
            alert(res.message);
            note.clearLines();
        })
        .catch((err) =>
            handleError(
                err,
                "newGoodsReceipt",
                "Não foi possivel criar a guia de entrada de mercadoria. Tente novamente mais tarde."
            )
        );
}

onMounted(async () => {
    userAuthenticatedName.value = await auth.getName();
});
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">Guia de Entrada de Mercadoria</h1>

        <section class="space-y-4 mb-4">
            <div class="input-container">
                <div class="input-disabled">{{ userAuthenticatedName }}</div>
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
                <button class="btn-danger" @click="$router.push('/goods-receipts/')">
                    Cancelar
                </button>
            </div>
        </div>
    </section>
</template>
