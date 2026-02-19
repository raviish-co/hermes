<script setup lang="ts">
import { GoodsIssueService } from "@frontend/services/goods_issue_service";
import { GoodsReturnService } from "@frontend/services/goods_return_service";
import { GoodsReturnNote } from "@frontend/domain/goods_return_note";
import { GoodsIssueNote } from "@frontend/domain/goods_issue_note";
import { type GoodsIssueNoteClient } from "@frontend/domain/goods_issue_note_client";
import { formatDate } from "@frontend/helpers/format_date";
import { handleError } from "@frontend/utils/error_handler";
import { generateGoodsIssuePdf } from "@frontend/helpers/generate_goods_issue_pdf";
import type { VDialog } from "#components";

const quantities = ref<number[]>([]);
const securityDepositWithHeld = ref<number>(0);
const goodsReturnNote = ref<GoodsReturnNote>({} as GoodsReturnNote);
const goodsIssueNote = ref<GoodsIssueNote>({} as GoodsIssueNote);
const editSecurityDeposit = ref<boolean>(true);
const invalidLine = ref<boolean>(false);

const client = ref<GoodsIssueNoteClient>({} as GoodsIssueNoteClient);
const dialogRef = ref<typeof VDialog>();
const clientErrors = ref<{ name?: string; nif?: string; address?: string }>({});

const goodsReturnService = new GoodsReturnService();
const goodsIssueService = new GoodsIssueService();
const auth = useAuth();

const route = useRoute();
const noteId = route.params.id as string;

getGoodsIssueById(noteId);

function validateClientData(): boolean {
    clientErrors.value = {};
    let isValid = true;

    if (!client.value.name) {
        clientErrors.value.name = "O nome do destinatário é obrigatório";
        isValid = false;
    }

    if (!client.value.nif) {
        clientErrors.value.nif = "O NIF do destinatário é obrigatório";
        isValid = false;
    } else if (client.value.nif.trim().length < 7) {
        clientErrors.value.nif = "O NIF deve ter pelo menos 7 caracteres";
        isValid = false;
    }

    if (!client.value.address) {
        clientErrors.value.address = "O endereço do destinatário é obrigatório";
        isValid = false;
    }

    return isValid;
}

watch(
    () => client.value.name,
    (newValue) => {
        if (newValue && clientErrors.value.name) {
            clientErrors.value.name = undefined;
        }
    }
);

watch(
    () => client.value.nif,
    (newValue) => {
        if (newValue && newValue.trim().length >= 7 && clientErrors.value.nif) {
            clientErrors.value.nif = undefined;
        }
    }
);

watch(
    () => client.value.address,
    (newValue) => {
        if (newValue && clientErrors.value.address) {
            clientErrors.value.address = undefined;
        }
    }
);

function printPdf() {
    if (!validateClientData()) {
        return;
    }

    generateGoodsIssuePdf(goodsIssueNote.value as GoodsIssueNote, client.value);
    closeClientDialog();
}

function openClientDialog() {
    clientErrors.value = {};
    dialogRef.value?.show();
}

function closeClientDialog() {
    clientErrors.value = {};
    client.value = {} as GoodsIssueNoteClient;
    dialogRef.value?.close();
}

function toggleEdit() {
    editSecurityDeposit.value = !editSecurityDeposit.value;
}

function isReturned() {
    return goodsIssueNote.value.status === "Devolvido";
}

function getGoodsIssueById(noteId: string) {
    goodsIssueService
        .getById(noteId)
        .then((result) => {
            goodsIssueNote.value = GoodsIssueNote.build(result);
            goodsReturnNote.value = new GoodsReturnNote(goodsIssueNote.value.lines);
            quantities.value = goodsIssueNote.value.lines?.map((l) => l.totalToReturn);
        })
        .catch((err) =>
            handleError(
                err,
                "getGoodsIssueById",
                "Não foi possivel obter a guia de saída de artigos. Tente novamente mais tarde."
            )
        );
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
        .then((res) => {
            alert(res.message);
            getGoodsIssueById(goodsIssueNote.value.goodsIssueNoteId);
        })
        .catch((err) =>
            handleError(
                err,
                "newGoodsReturn",
                "Não foi possivel criar a guia de devolução. Tente novamente mais tarde."
            )
        );
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
                    title="Imprimir Guia"
                    @click="openClientDialog()"
                    class="btn btn-secondary material-symbols-outlined"
                >
                    file_save
                </button>
                <button
                    class="btn-secondary"
                    @click="newGoodsReturn()"
                    :disabled="isReturned() || invalidLine"
                >
                    Devolver
                </button>
                <NuxtLink class="btn-danger" to="/goods-issues/">Cancelar</NuxtLink>
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

    <VDialog ref="dialogRef" title="Dados do Destinatário" class="max-w-[36rem]">
        <div class="flex flex-col gap-4">
            <div>
                <input
                    class="input-field"
                    :class="{ 'input-required': !!clientErrors.name }"
                    type="text"
                    v-model="client.name"
                    placeholder="Nome"
                />
                <span v-if="clientErrors.name" class="text-red-500 text-sm mt-1">{{
                    clientErrors.name
                }}</span>
            </div>

            <div>
                <input
                    class="input-field"
                    :class="{ 'input-required': !!clientErrors.nif }"
                    type="text"
                    v-model="client.nif"
                    placeholder="NIF"
                />
                <span v-if="clientErrors.nif" class="text-red-500 text-sm mt-1">{{
                    clientErrors.nif
                }}</span>
            </div>

            <div>
                <input
                    class="input-field"
                    :class="{ 'input-required': !!clientErrors.address }"
                    type="text"
                    v-model="client.address"
                    placeholder="Endereço"
                />
                <span v-if="clientErrors.address" class="text-red-500 text-sm mt-1">{{
                    clientErrors.address
                }}</span>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <NuxtLink class="btn-danger text-center" @click="closeClientDialog"
                    >Cancelar</NuxtLink
                >
                <button class="btn-secondary" @click="printPdf()">Imprimir Guia</button>
            </div>
        </div>
    </VDialog>
</template>
