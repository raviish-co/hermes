<script setup lang="ts">
import { formatVariationValues } from "@frontend/helpers/format_variation_values";
import { formatCurrency } from "@frontend/helpers/format_currency";
import { handleError } from "@frontend/utils/error_handler";
import CreateButton from "~/components/CreateButton.vue";

const criteria = ref<string>("");
const catalog = useCatalog();
const warehouse = useWarehouse();
const auth = useAuth();

const selectedItemId = ref<string>("");
const seletedItemName = ref<string>("");
const dialogRef = ref<HTMLDialogElement>();

function markItemInStockAsIntern() {
    if (!selectedItemId.value) return;

    warehouse
        .markItemInStockAsIntern(selectedItemId.value)
        .then(async () => {
            alert("Artigo marcado como interno com sucesso");
            close();
            await warehouse.listItemsStock();
        })
        .catch((err) =>
            handleError(
                err,
                "markItemInStockAsIntern",
                "Não foi possivel marcar o artigo como interno. Tente novamente mais tarde."
            )
        );
}

function setUserDataAndShowModal(itemId: string, itemName: string) {
    selectedItemId.value = itemId;
    seletedItemName.value = itemName;
    show();
}

function close() {
    dialogRef.value?.close();
}

function show() {
    dialogRef.value?.showModal();
}

onMounted(async () => {
    await auth.checkAuth();

    catalog.listItems();
    await warehouse.listItemsStock();
});
</script>

<template>
    <div class="section-content relative">
        <h1 class="page-title">Artigos</h1>
        <div class="mb-6">
            <input
                type="text"
                placeholder="Pesquisar artigos..."
                class="input-field"
                v-model="criteria"
                @input="catalog.searchItems(criteria)"
            />
        </div>

        <CreateButton path="/items/register" title="Registar" />

        <div class="table-container overflow-y-auto mb-6">
            <table class="table">
                <thead>
                    <tr>
                        <th class="min-w-20 w-20">ID</th>
                        <th class="min-w-80 w-80 text-left">Descrição</th>
                        <th class="min-w-40 w-40">Preço (Kz)</th>
                        <th class="min-w-32 w-32">Stock</th>
                        <th class="min-w-50 w-50 text-nowrap">Acumulado (Kz)</th>
                        <th></th>
                        <th class="min-w-30 w-30"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in toValue(catalog.items)"
                        :key="item.itemId"
                        class="text-center"
                    >
                        <td>{{ item.itemId }}</td>
                        <td class="text-left">
                            {{ item.name }}
                            <span>
                                <sup
                                    v-if="
                                        warehouse.findItemStock(item.itemId)?.itemStockType ===
                                        'Consignação'
                                    "
                                    class="ml-2 bg-light-500 py-1 px-1.5 rounded-full text-white font-medium"
                                    >{{ warehouse.findItemStock(item.itemId)?.itemStockType }}</sup
                                >
                            </span>
                            <br />
                            <span class="text-light-600 break-words text-xs sm:text-sm">
                                {{ formatVariationValues(item.variationsValues) }}
                            </span>
                        </td>
                        <td class="text-gray-500">{{ formatCurrency(item.price) }}</td>
                        <td class="text-center">
                            <span v-if="!warehouse.findItemStock(item.itemId)" class="badge-danger">
                                Esgotado
                            </span>

                            <span
                                v-else-if="warehouse.findItemStock(item.itemId)?.total === 0"
                                class="badge-danger"
                            >
                                Esgotado
                            </span>

                            <span v-else class="text-gray-500">{{
                                warehouse.findItemStock(item.itemId)?.total
                            }}</span>
                        </td>
                        <td class="text-gray-500">
                            <span v-if="!warehouse.findItemStock(item.itemId)"> 0 </span>

                            <span
                                v-else-if="
                                    warehouse.findItemStock(item.itemId)?.totalValueOfOutputs === 0
                                "
                            >
                                0
                            </span>

                            <span v-else>
                                {{
                                    formatCurrency(
                                        warehouse.findItemStock(item.itemId)?.totalValueOfOutputs!
                                    )
                                }}
                            </span>
                        </td>
                        <td>
                            <NuxtLink :to="`/items/${item.itemId}/`">
                                <span class="material-symbols-outlined"> edit </span>
                            </NuxtLink>
                        </td>
                        <td>
                            <span
                                v-if="warehouse.isConsignmentItemStock(item.itemId)"
                                @click="setUserDataAndShowModal(item.itemId, item.name)"
                                class="text-xs text-nowrap cursor-pointer"
                                :class="
                                    warehouse.isInternalItemStock(item.itemId)
                                        ? 'badge-success'
                                        : 'badge-warning'
                                "
                                >Marcar como interno</span
                            >
                        </td>
                    </tr>
                </tbody>
            </table>

            <dialog
                ref="dialogRef"
                title="Marcar item como interno"
                class="w-full m-auto bg-white px-6 py-8 max-w-[32rem]"
            >
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <h2 class="font-medium text-lg">Marcar como interno</h2>
                        <span class="material-symbols-outlined cursor-pointer" @click="close"
                            >close</span
                        >
                    </div>
                    <div>
                        <p class="mb-4 text-sm text-gray-500">
                            Está a Marcar o artigo <b> {{ seletedItemName }} </b> como interno.
                        </p>
                        <button
                            @click="markItemInStockAsIntern()"
                            class="btn-badge bg-secondary-600 text-white text-sm px-4 py-1.5"
                        >
                            Marcar
                        </button>
                        <button
                            class="btn-badge bg-red-800/80 ml-2 text-white text-sm px-4 py-1.5"
                            @click="close()"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </dialog>

            <p v-if="catalog.items.value.length === 0" class="pt-10 text-gray-500 text-center">
                Não existem artigos no momento. Registe um novo
            </p>
        </div>

        <div class="mb-10">
            <ThePagination :total="toValue(catalog.pages)" @changed="catalog.changePage($event)" />
        </div>
    </div>
</template>
