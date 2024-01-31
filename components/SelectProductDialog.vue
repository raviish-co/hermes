<script setup lang="ts">
import type { VDialog } from "#build/components";
import { PRODUCTS } from "~/lib/data/products";
import type { Product } from "~/lib/models/product";
import { ProductService } from "~/lib/services/product_service";

interface Emits {
    (e: "select", article: Product): void;
}

const dialogRef = ref<typeof VDialog>();
const emits = defineEmits<Emits>();
const query = ref<string>("");
const products = ref<Product[]>([]);
const total = ref<number>(1);

const productService = new ProductService();

function emitSelectedProduct(product: Product) {
    dialogRef.value?.close();
    emits("select", product);
}

async function searchProduct() {
    if (query.value.length < 3) {
        products.value = [];
        return;
    }

    products.value = await productService.searchProducts(query.value);
}

async function listProducts(pageToken: number = 1) {
    const { products: a, total: t } = await productService.listProducts(pageToken);

    products.value = a;
    total.value = t;
}

function showDialog() {
    dialogRef.value?.show();
}

defineExpose({ show: showDialog });

onMounted(async () => {
    await listProducts();
});
</script>

<template>
    <VDialog ref="dialogRef" title="Pesquisar Artigo" class="max-w-[30rem]">
        <VInput
            placeholder="Pesquisar por Nome ou ID"
            type="search"
            v-model="query"
            @update:model-value="searchProduct"
        />

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-if="products" v-for="product in products" :key="product.id">
                    <td class="w-16">{{ product.id }}</td>
                    <td class="w-96" @click="emitSelectedProduct(product)">
                        {{ product.name }}
                    </td>
                    <td>
                        <span
                            v-if="product.isUnique"
                            class="px-2 py-1 bg-secondary-600 rounded-3xl text-sm text-white"
                        >
                            Único
                        </span>
                    </td>
                </tr>

                <tr v-if="products.length === 0">
                    <td colspan="3">Nenhum resultado encontrado</td>
                </tr>
            </tbody>
        </table>

        <p>
            <ThePagination :total="total" @changed="listProducts" />
        </p>
    </VDialog>
</template>
~/lib/data/products ~/lib/models/product
