<script setup lang="ts">
import type { ConditionModel } from "~/lib/frontend/models/condition";
import { CatalogService } from "~/lib/frontend/services/catalog_service";

type Variation = {
    variationId: string;
    name: string;
    value?: string;
    values: string[];
};

const GOOD = "Bom";
const BAD = "Mau";

const name = ref<string>("");
const price = ref<number>();
const categoryId = ref<string>();
const condition = ref<ConditionModel>({ status: "Bom" });

const showVariations = ref<boolean>(false);
const selectedVariations = ref<Variation[]>([]);
const isGood = ref<boolean>(true);

const service = new CatalogService();

const variations = await service.listVariations();
const categories = await service.listCategories();

function chooseCategory(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    showVariations.value = true;

    const category = categories.find((category) => category.name === value)!;

    categoryId.value = category.categoryId;

    const variationsIds = category.variationsIds;

    selectedVariations.value = variations.filter((v) => variationsIds.includes(v.variationId));

    name.value = category.name;
}

function chooseVariation(event: Event, variation: any) {
    const value = (event.target as HTMLSelectElement).value;
    variation.value = value;
}

function register() {
    if (!name.value || !price.value) {
        alert("Preencha todos os campos.");
        return;
    }

    const variationValues = selectedVariations.value.map((v) => ({
        variationId: v.variationId,
        name: v.name,
        value: v.value!,
    }));

    const data = {
        name: name.value,
        price: price.value,
        comment: condition.value.comment,
        categoryId: categoryId.value,
        variations: variationValues,
    };

    service
        .registerItem(data)
        .then(() => alert("Artigo registrado com sucesso."))
        .catch((err) => alert(err.statusMessage));
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
            <select class="input-field" @change="chooseCategory">
                <option value selected disabled>Categoria</option>
                <option v-for="category in categories" :key="category.categoryId">
                    {{ category.name }}
                </option>
            </select>

            <div v-if="showVariations" class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div v-for="variation in selectedVariations" :key="variation.variationId">
                    <select class="input-field" @change="chooseVariation($event, variation)">
                        <option selected disabled>{{ variation.name }}</option>
                        <option v-for="value in variation.values" :key="value">
                            {{ value }}
                        </option>
                    </select>
                </div>
            </div>

            <input class="input-field" type="text" placeholder="Nome" v-model="name" />
            <input class="input-field" type="number" placeholder="Preço" v-model="price" />

            <div class="input-container">
                <select class="input-field" @change="changeStatus">
                    <option selected value="Bom">Bom</option>
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
