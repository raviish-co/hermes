<script setup lang="ts">
import type { ConditionModel } from "~/lib/frontend/models/condition";
import { CatalogService } from "~/lib/frontend/services/catalog_service";

const GOOD = "Bom";
const BAD = "Mau";

const name = ref<string>("");
const price = ref<number>();
const condition = ref<ConditionModel>({ status: "Bom" });
const isGood = ref<boolean>(true);

const service = new CatalogService();

async function register() {
    if (!name.value || !price.value) {
        alert("Preencha todos os campos.");
        return;
    }

    const item = {
        name: name.value,
        price: price.value,
        comment: condition.value.comment,
    };

    await service.registerItem(item);
}

function changeStatus(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (value === GOOD) {
        isGood.value = true;
        return;
    }

    isGood.value = false;
    condition.value.status = BAD;
}
</script>
<template>
    <div class="section-content">
        <h1 class="page-title">Registrar artigo</h1>
        <div class="space-y-4">
            <div class="input-container">
                <input class="input-field" type="text" placeholder="Nome" v-model="name" />
                <input class="input-field" type="number" placeholder="Preço" v-model="price" />
            </div>

            <div class="input-container">
                <select class="input-field" @change="changeStatus">
                    <option selected disabled>Escolher estado</option>
                    <option value="Bom">Bom</option>
                    <option value="Mau">Mau</option>
                </select>

                <input
                    type="text"
                    placeholder="Escreva uma nota sobre o estado atual do artigo."
                    v-model="condition.comment"
                    :class="isGood ? 'input-disabled' : 'input-field'"
                />
            </div>

            <button class="btn bg-secondary-500" @click="register()">Registrar</button>
        </div>
    </div>
</template>
