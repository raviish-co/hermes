<script setup lang="ts">
import { GoodsIssueService } from "~/lib/frontend/services/goods_issue_service";
import { GoodsReturnService } from "~/lib/frontend/services/goods_return_service";
import { GoodsReturnNote } from "~/lib/frontend/domain/goods_return_note";
import { GoodsIssueNote } from "~/lib/frontend/domain/goods_issue_note";
import { formatDate } from "~/lib/frontend/helpers/format_date";

const quantities = ref<number[]>([]);
const securityDepositWithHeld = ref<number>(0);
const goodsReturnNote = ref<GoodsReturnNote>({} as GoodsReturnNote);
const goodsIssueNote = ref<GoodsIssueNote>({} as GoodsIssueNote);
const editSecurityDeposit = ref<boolean>(true);
const invalidLine = ref<boolean>(false);

const goodsReturnService = new GoodsReturnService();
const goodsIssueService = new GoodsIssueService();
const auth = useAuth();

const route = useRoute();
const noteId = route.params.id as string;

goodsIssueService
    .getById(noteId)
    .then((result) => {
        goodsIssueNote.value = GoodsIssueNote.build(result);
        goodsReturnNote.value = new GoodsReturnNote(goodsIssueNote.value.lines);
        quantities.value = goodsIssueNote.value.lines?.map((l) => l.totalToReturn);
    })
    .catch((err) => alert(err.statusMessage));

function toggleEdit() {
    editSecurityDeposit.value = !editSecurityDeposit.value;
}

function isReturned() {
    return goodsIssueNote.value.status === "Devolvido";
}

function newGoodsReturn() {
    if (securityDepositWithHeld.value.toString().length === 0) {
        alert("Por favor, insira o valor a reter.");
        return;
    }

    goodsReturnService
        .new(
            goodsIssueNote.value.goodsIssueNoteId,
            securityDepositWithHeld.value,
            goodsReturnNote.value.returnLines
        )
        .then((res) => alert(res.message))
        .catch((err) => alert(err.statusMessage));
}

const userAuthenticatedName = ref<string>("");
onMounted(async () => {
    userAuthenticatedName.value = await auth.getName();
});
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">
            Guia de Saída de Artigos #{{ goodsIssueNote.goodsIssueNoteId }} - ({{
                goodsIssueNote.status
            }})
        </h1>

        <NuxtLink
            :to="{ path: `/goods-returns/`, query: { q: goodsIssueNote.goodsIssueNoteId } }"
            class="link"
        >
            <h2 class="text-center mb-4">Ver devoluções</h2>
        </NuxtLink>

        <section class="space-y-4 mb-4">
            <div class="input-container">
                <div class="input-disabled">{{ userAuthenticatedName }}</div>
                <div class="input-disabled">
                    {{ goodsIssueNote.returnDate ? formatDate(goodsIssueNote.returnDate) : "" }}
                </div>
            </div>

            <div class="input-container">
                <div class="input-disabled">{{ goodsIssueNote.purpose?.description }}</div>
                <div class="input-disabled">{{ goodsIssueNote.purpose?.details ?? "N/D" }}</div>
            </div>

            <div class="input-disabled">{{ goodsIssueNote.purpose?.notes }}</div>
        </section>

        <ReturnNote
            :goods-return-note="goodsReturnNote as GoodsReturnNote"
            :goods-issue-note="goodsIssueNote as GoodsIssueNote"
            :is-returned="isReturned()"
            :quantities="quantities"
            @invalid-line="invalidLine = $event"
        />
    </section>

    <section class="footer">
        <div class="footer-container">
            <div class="flex flex-wrap gap-2 w-full pb-3 md:w-auto sm:flex-nowrap md:gap-4 md:pb-0">
                <button
                    class="btn-secondary"
                    @click="newGoodsReturn()"
                    :disabled="isReturned() || invalidLine"
                >
                    Devolver
                </button>
                <NuxtLink class="btn-light" to="/goods-issues/">Cancelar</NuxtLink>
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

                <p
                    class="flex items-center text-center w-full md:w-auto md:text-right space-x-1"
                    :class="{ hidden: isReturned() }"
                >
                    <span class="font-medium">Caução a reter (Kz):</span>
                    <input
                        class="input-field max-w-32"
                        type="number"
                        v-model="securityDepositWithHeld"
                        :disabled="editSecurityDeposit"
                    />
                    <span class="material-symbols-outlined cursor-pointer" @click="toggleEdit">
                        edit
                    </span>
                </p>
            </div>
        </div>
    </section>
</template>
