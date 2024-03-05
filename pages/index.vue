<script lang="ts" setup>
import type { ShowItemsDialog, DescribeConditionDialog, ChoosePurpose } from "#build/components";
import { getCurrentLocalDateTime } from "@frontend/helpers/current_local_date_time";
import { GoodsIssueService } from "@frontend/services/goods_issue_service";
import { handleException } from "@frontend/helpers/error_handler";
import { GoodsIssueNote } from "~/lib/frontend/example";
import type { Condition } from "~/lib/frontend/models/condition";

const itemsDialogRef = ref<typeof ShowItemsDialog>();
const conditionDialogRef = ref<typeof DescribeConditionDialog>();
const returnDate = ref<string>(getCurrentLocalDateTime());

const goodsIssueService = new GoodsIssueService();
const goodsIssueNote = reactive<GoodsIssueNote>(new GoodsIssueNote(returnDate.value));

function newGoodsIssue() {
    goodsIssueService
        .new(goodsIssueNote as GoodsIssueNote)
        .then(({ message }) => {
            alert(message);
        })
        .catch(handleException);
}

function showItems() {
    itemsDialogRef.value?.show();
}

function showConditionDialog(itemId: string, condition?: Condition) {
    conditionDialogRef.value?.initializeCondition(itemId, condition);
    conditionDialogRef.value?.show();
}
</script>

<template>
    <section class="section-content">
        <h1 class="text-xl text-center sm:text-2xl sm:my-10 my-8">Guia de Saída de Artigos</h1>

        <form>
            <div class="flex items-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
                <input class="input-field" placeholder="John Doe" :disabled="true" />

                <input v-model="returnDate" type="datetime-local" class="input-field" />
            </div>

            <ChoosePurpose @choosed="(purpose) => goodsIssueNote.setPurpose(purpose)" />
        </form>

        <section class="pb-16 sm:pb-5 md:pb-[4.5rem]">
            <div
                class="h-table-lg p-3 flex flex-col justify-between border border-light-500 overflow-hidden"
            >
                <div class="w-full flex items-center justify-between">
                    <span
                        class="material-symbols-outlined hover:text-secondary-600 p-2 cursor-pointer"
                        @click="showItems"
                    >
                        add
                    </span>

                    <span
                        class="hover:text-red-500 hover:bg-red-500 hover:bg-opacity-10 p-2 cursor-pointer"
                        @click="goodsIssueNote.clear()"
                    >
                        Limpar
                    </span>
                </div>

                <div class="flex-1 overflow-y-auto">
                    <table class="table">
                        <thead>
                            <tr class="text-left">
                                <th class="min-w-24 w-24">ID</th>
                                <th class="min-w-52">Artigo</th>
                                <th class="min-w-10 w-16">QTD</th>
                                <th class="min-w-36 w-36 text-right">Preço Unid (Kz)</th>
                                <th class="min-w-36 w-36 text-right">Total (Kz)</th>
                                <th class="min-w-10 w-10"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="(line, idx) in goodsIssueNote.lines"
                                :key="idx"
                                class="cursor-pointer"
                            >
                                <td>{{ line.itemId }}</td>
                                <td @click="showConditionDialog(line.itemId, line.condition)">
                                    {{ line.name }}
                                    <br />
                                    <span class="text-light-600 text-sm">
                                        {{ line.formattedVariationsValues }}
                                    </span>
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        v-model="line.quantity"
                                        class="input-number"
                                        min="1"
                                        :max="line.stock"
                                        @input="goodsIssueNote.updateLineQuantity(line.itemId)"
                                    />
                                </td>
                                <td class="text-right">{{ line.formattedPrice }}</td>
                                <td class="text-right">{{ line.formattedTotal }}</td>
                                <td
                                    class="cursor-pointer"
                                    @click="goodsIssueNote.removeLine(line.itemId)"
                                >
                                    <span class="material-symbols-outlined">close</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </section>

    <section class="fixed shadow-top bottom-0 w-full bg-white shadow-light-500">
        <div
            class="flex justify-between items-center section-content p-4 bg-white flex-wrap flex-col-reverse md:flex-row md:flex-nowrap gap-4"
        >
            <div class="flex flex-wrap sm:flex-nowrap gap-4 w-full md:w-auto pb-4 md:pb-0">
                <button
                    class="btn-secondary w-full md:flex-1"
                    @click="newGoodsIssue"
                    :disabled="!goodsIssueNote.isValid()"
                >
                    Solicitar
                </button>
                <button class="btn-light w-full md:flex-1">Cancelar</button>
            </div>

            <div class="text-sm md:text-base flex gap-2 w-full md:w-auto overflow-hidde">
                <p
                    class="text-center w-full md:w-auto md:text-right space-x-1 max-w-80 truncate overflow-hidden"
                >
                    <span class="font-medium">Total Geral (Kz):</span>
                    <span>{{ goodsIssueNote.formattedGrossTotal }}</span>
                </p>

                <p
                    class="text-center w-full md:w-auto md:text-right space-x-1 max-w-80 truncate overflow-hidden"
                >
                    <span class="font-medium">Caução (Kz):</span>
                    <span>{{ goodsIssueNote.formattedSecurityDeposit }}</span>
                </p>
            </div>
        </div>
    </section>

    <ShowItemsDialog
        ref="itemsDialogRef"
        @add="(item, quantity) => goodsIssueNote.addLine(item, quantity)"
    />

    <DescribeConditionDialog
        ref="conditionDialogRef"
        @update-condition="
            (itemId, condition) => goodsIssueNote.updateLineCondition(itemId, condition)
        "
    />
</template>
