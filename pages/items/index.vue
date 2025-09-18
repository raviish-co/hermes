<script setup lang="ts">
import { formatVariationValues } from "~/lib/frontend/helpers/format_variation_values";
import { formatCurrency } from "~/lib/frontend/helpers/format_currency";

const criteria = ref<string>("");
const catalog = useCatalog();
const warehouse = useWarehouse();

const dialogRef = ref<HTMLDialogElement>();
const selectedItemId = ref<string>("");

function updateStatus() {
    if (!selectedItemId) return;

    warehouse
        .updateItemStockStatus(selectedItemId.value)
        .then(() => {
            alert("Item actualizado com sucesso");
            close();
            navigateTo("/items");
        })
        .catch((err) => {
            alert(err.statusMessage);
        });
}

function checkItemsOnEnter() {
    for (const item of catalog.items.value) {
        const stock = warehouse.findItemStock(item.itemId);

        if (stock && stock.totalCostOfDepartures > stock.consignmentPrice) {
            selectedItemId.value = item.itemId;
            break;
        }
    }
}

function close() {
    dialogRef.value?.close();
}

function show() {
    dialogRef.value?.showModal();
}

onMounted(async () => {
    catalog.listItems();
    await warehouse.listItemsStock();

    checkItemsOnEnter();
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

        <button @click="show" class="btn-badge">Mostrar</button>

        <NuxtLink :to="{ path: '/items/register' }">
            <button class="btn-add block ml-auto">
                <span>Registar</span> <span class="text-base">+</span>
            </button>
        </NuxtLink>

        <div class="table-container overflow-y-auto mb-6">
            <table class="table">
                <thead>
                    <tr>
                        <th class="min-w-20 w-20">ID</th>
                        <th class="min-w-80 w-80 text-left">Descrição</th>
                        <th class="min-w-40 w-40">Preço Kz</th>
                        <th class="min-w-40 w-40">Stock</th>
                        <th class="min-w-40 w-40">Status</th>
                        <th></th>
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
                            {{ item.name }} <br />
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

                            <span v-else>{{ warehouse.findItemStock(item.itemId)?.total }}</span>
                        </td>
                        <td>
                            <span
                                v-if="warehouse.findItemStock(item.itemId)?.status === 'Interno'"
                                class="badge bg-secondary-500 text-white"
                            >
                                Interno
                            </span>
                            <span v-else class="badge badge-light"> Consignação</span>
                        </td>
                        <td>
                            <NuxtLink :to="`/items/${item.itemId}/`">
                                <span class="material-symbols-outlined"> edit </span>
                            </NuxtLink>
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
                        <h2 class="font-medium text-lg">Marcar como Interno</h2>
                        <span class="material-symbols-outlined cursor-pointer" @click="close"
                            >close</span
                        >
                    </div>
                    <div>
                        <p class="mb-4 text-base">Já é possível marcar o item X como interno</p>
                        <button
                            @click="updateStatus()"
                            class="btn-badge bg-secondary-600 text-white text-sm px-4 py-1.5"
                        >
                            Marcar
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
