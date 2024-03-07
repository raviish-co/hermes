<script setup lang="ts">
import type { DescribeConditionDialog } from "#build/components";
import { GoodsIssueService } from "~/lib/frontend/services/goods_issue_service";
import { formatVariationValues } from "~/lib/frontend/helpers/format_variation_values";
import { handleException } from "~/lib/frontend/helpers/error_handler";
import { GoodsReturnService } from "~/lib/frontend/services/goods_return_service";
import { GoodsIssueNote } from "~/lib/frontend/domain/goods_issue_note";
import type { Condition } from "~/lib/frontend/models/condition";

const route = useRoute();

const GOODS_ISSUE_ID = route.params.id as string;

const conditionDialogRef = ref<typeof DescribeConditionDialog>();
const goodsIssueNote = ref<GoodsIssueNote>({} as GoodsIssueNote);
const editRatainedSecurityDepositIsDisabled = ref<boolean>(true);
const retainedSecurityDeposit = ref<string>("0,00");

const goodsIssueService = new GoodsIssueService();
const goodsReturnService = new GoodsReturnService();

function toggleEditRatainedSecurityDeposit() {
    editRatainedSecurityDepositIsDisabled.value = !editRatainedSecurityDepositIsDisabled.value;
}

function showDescribeLineConditionDialog(itemId: string, condition?: Condition) {
    conditionDialogRef.value?.initializeCondition(itemId, condition);
    conditionDialogRef.value?.show();
}

function newGoodsReturn() {
    goodsReturnService
        .new(
            goodsIssueNote.value.goodsIssueNoteId,
            retainedSecurityDeposit.value,
            goodsIssueNote.value.lines
        )
        .then(() => {
            alert("Devolução efetuada com sucesso!");
            navigateTo("/");
        })
        .catch(handleException);
}

onMounted(() => {
    goodsIssueService
        .getById(GOODS_ISSUE_ID)
        .then((result) => {
            goodsIssueNote.value = GoodsIssueNote.build(result);

            retainedSecurityDeposit.value = goodsIssueNote.value.formattedSecurityDeposit;
        })
        .catch((err) => {
            handleException(err);
            navigateTo("/");
        });
});
</script>

<template>
    <section class="section-content">
        <h1 class="text-xl text-center sm:text-2xl sm:my-10 my-8">Guia de Devolução</h1>

        <form class="mb-4">
            <div class="flex items-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
                <input class="input-field" value="John Doe" disabled />
                <input class="input-field" :value="goodsIssueNote.returnDate" disabled />
            </div>

            <div class="flex items-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
                <input class="input-field" :value="goodsIssueNote.purpose?.description" disabled />
                <input
                    class="input-field"
                    :value="goodsIssueNote.purpose?.details || 'N/D'"
                    disabled
                />
            </div>

            <input class="input-field" :value="goodsIssueNote.purpose?.notes" disabled />
        </form>

        <section class="pb-16 sm:pb-5 md:pb-[4.5rem]">
            <div
                class="h-table-lg p-3 flex flex-col justify-between border border-light-500 overflow-hidden"
            >
                <div class="flex-1 overflow-y-auto">
                    <table class="table">
                        <thead>
                            <tr class="text-left">
                                <th class="min-w-24 w-24">ID</th>
                                <th class="min-w-52">Item</th>
                                <th class="min-w-10 w-16">QTD</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="(line, idx) in goodsIssueNote.lines"
                                :key="idx"
                                class="cursor-pointer"
                            >
                                <td>{{ line.itemId }}</td>

                                <td
                                    @click="
                                        showDescribeLineConditionDialog(line.itemId, line.condition)
                                    "
                                >
                                    {{ line.name }}

                                    <br />

                                    <span class="text-light-600 text-sm">
                                        {{ formatVariationValues(line?.variationsValues) }}
                                    </span>
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        v-model="line.quantity"
                                        class="input-number"
                                        min="1"
                                        disabled
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </section>

    <section class="fixed shadow-top bottom-0 w-full shadow-light-500 bg-white">
        <div
            class="flex justify-between items-center section-content p-4 flex-wrap flex-col-reverse md:flex-row md:flex-nowrap gap-4"
        >
            <div class="flex flex-wrap sm:flex-nowrap gap-4 w-full md:w-auto pb-4 md:pb-0">
                <button class="btn-secondary w-full md:flex-1" @click="newGoodsReturn">
                    Devolver
                </button>
                <button class="btn-light w-full md:flex-1">Cancelar</button>
            </div>

            <div class="text-sm md:text-base flex gap-2 items-center w-full md:w-auto">
                <p class="text-center w-full md:w-auto md:text-right space-x-1">
                    <span class="font-medium">Total de caução(kz):</span>
                    <span>{{ goodsIssueNote.formattedSecurityDeposit }}</span>
                </p>

                <p class="flex items-center text-center w-full md:w-auto md:text-right space-x-1">
                    <span class="font-medium">Caução a reter(kz):</span>
                    <input
                        v-model="retainedSecurityDeposit"
                        :disabled="editRatainedSecurityDepositIsDisabled"
                        class="input-field max-w-32"
                    />
                    <span
                        class="material-symbols-outlined cursor-pointer"
                        @click="toggleEditRatainedSecurityDeposit"
                    >
                        edit
                    </span>
                </p>
            </div>
        </div>
    </section>

    <DescribeConditionDialog
        :goods-issue-note="(goodsIssueNote as GoodsIssueNote)"
        ref="conditionDialogRef"
    />
</template>
