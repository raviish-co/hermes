<script lang="ts" setup>
import { getCurrentLocalDateTime } from "@frontend/helpers/current_local_date_time";
import { GoodsIssueService } from "@frontend/services/goods_issue_service";
import { GoodsIssueNote } from "@frontend/domain/goods_issue_note";
import { handleError } from "@frontend/utils/error_handler";

const returnDate = getCurrentLocalDateTime();
const auth = useAuth();
const service = new GoodsIssueService();
const note = reactive(new GoodsIssueNote(returnDate));
const wasSubmitted = ref<boolean>(false);

function newGoodsIssue() {
    service
        .new(note as GoodsIssueNote)
        .then((res) => {
            alert(res.message);
            navigateTo("/goods-issues/");
        })
        .catch((err) =>
            handleError(
                err,
                "newGoodsIssue",
                "Não foi possivel criar a guia de saída de artigos. Tente novamente mais tarde."
            )
        );

    wasSubmitted.value = true;
}

function clear() {
    note.clear();
    wasSubmitted.value = false;
}

const userAuthenticatedName = ref<string>("");
onMounted(async () => {
    userAuthenticatedName.value = await auth.getName();
});
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">Guia de Saída de Artigos</h1>

        <section class="space-y-4 mb-4">
            <div class="input-container">
                <div class="input-disabled">{{ userAuthenticatedName }}</div>
                <input v-model="note.returnDate" type="datetime-local" class="input-field" />
            </div>

            <ChoosePurpose @choosed="note.setPurpose($event)" />
        </section>

        <IssueNote :note="note" />
    </section>

    <section class="footer">
        <div class="footer-container">
            <div class="flex flex-wrap sm:flex-nowrap gap-4 w-full md:w-auto pb-4 md:pb-0">
                <button
                    class="btn-secondary"
                    :disabled="!note.isValid() || wasSubmitted"
                    @click="newGoodsIssue"
                >
                    Solicitar
                </button>
                <button class="btn-danger" @click="clear()">Cancelar</button>
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
