<script setup lang="ts">
import type { VariationModel } from "~/lib/frontend/models/variation";
import { CatalogService } from "~/lib/frontend/services/catalog_service";

const selectedVariations = ref<VariationModel[]>([]);
const variations = ref<VariationModel[]>([]);
const name = ref<string>("");
const description = ref<string>("");

const service = new CatalogService();

function selectVariation(variationId: string) {
    if (isSelected(variationId)) {
        selectedVariations.value = selectedVariations.value.filter(
            (v) => v.variationId !== variationId
        );
        return;
    }

    const variation = variations.value.find((v) => v.variationId === variationId)!;
    selectedVariations.value.push(variation);
}

function isSelected(variationId: string) {
    return selectedVariations.value.some((v) => v.variationId === variationId);
}

function register() {
    const variationsIds = selectedVariations.value.map((v) => v.variationId);
    service
        .registerCategory(name.value, variationsIds, description.value)
        .then((res) => alert(res.message))
        .catch((err) => alert(err.statusMessage));
}

onMounted(async () => {
    variations.value = await service.listVariations();
});
</script>

<template>
    <div class="section-content">
        <h1 class="page-title">Registar categoria</h1>

        <div class="space-y-4">
            <input class="input-field" type="text" placeholder="Categoria" v-model="name" />
            <input class="input-field" type="text" placeholder="Descrição" v-model="description" />

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
                <div class="h-64 border border-light-500 overflow-y-auto">
                    <h2 class="p-2 bg-gray-400 text-white">Variações disponíveis</h2>
                    <ul class="space-y-1">
                        <li
                            v-for="variation in variations"
                            :key="variation.variationId"
                            class="cursor-pointer p-2 text-gray-500 hover:bg-gray-100"
                            :class="{
                                'bg-gray-100': isSelected(variation.variationId),
                            }"
                            @click="selectVariation(variation.variationId)"
                        >
                            {{ variation.name }}
                        </li>
                    </ul>
                </div>

                <div class="h-64 border border-light-500 overflow-y-auto">
                    <h2 class="p-2 bg-gray-400 text-white">Variações selecionadas</h2>
                    <ul class="space-y-1">
                        <li
                            class="p-2 text-gray-500"
                            v-for="variation in selectedVariations"
                            :key="variation.variationId"
                        >
                            {{ variation.name }}
                        </li>
                    </ul>
                </div>
            </div>

            <button class="btn bg-secondary-500" :disabled="name.length === 0" @click="register()">
                Registrar
            </button>
        </div>
    </div>
</template>
