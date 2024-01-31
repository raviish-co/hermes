<script setup lang="ts">
import type { VDialog } from "#build/components";
import { convertToNumber } from "~/lib/helpers/convert_to_number";
import { formatCurrency } from "~/lib/helpers/format_currency";
import type { Product, ProductVariation, RequestProduct } from "~/lib/models/product";

interface Props {
    product: Product;
    requestList: RequestProduct[];
}

interface Emits {
    (e: "added"): void;
}

const dialogRef = ref<typeof VDialog>();
const quantities = ref<number[]>([]);
const total = ref<string>("0");
const props = defineProps<Props>();
const emits = defineEmits<Emits>();

function quantityNotDefined() {
    return quantities.value.length === 0;
}

function isTheSameRequestProduct(product: RequestProduct) {
    return props.requestList.some((r) => r.id === product.id);
}

function isTheSameVariations(variations: ProductVariation[]) {
    return props.requestList.find((ra) => ra.variations?.at(0) === variations);
}

function makeRequestProduct(product: Product, quantity: number, varitations?: ProductVariation[]) {
    return {
        ...product,
        requestId: new Date().getTime().toString(),
        quantity: quantity,
        total: total.value,
        variations: varitations ? [varitations] : [],
    };
}

function calculateTotal(quantity: number): string {
    const price = convertToNumber(props.product.price);
    const total = (price * quantity) / 100;
    return formatCurrency(total);
}

function addProductWithoutVariations() {
    if (quantityNotDefined()) {
        dialogRef.value?.close();
        emits("added");
        return;
    }

    const quantity = quantities.value[0];

    total.value = calculateTotal(quantity);

    const requestProduct = makeRequestProduct(props.product, quantity);

    if (isTheSameRequestProduct(requestProduct)) return;

    props.requestList.push(requestProduct);

    dialogRef.value?.close();
    quantities.value = [];
}

function addProductToRequestList(): void {
    if (!props.product.variations) {
        addProductWithoutVariations();
        return;
    }

    const requestProducts: RequestProduct[] = [];

    props.product.variations?.forEach((variations, idx) => {
        const quantity = quantities.value[idx];

        if (quantity > 0) {
            total.value = calculateTotal(quantity);

            const requestProduct = makeRequestProduct(props.product, quantity, variations);

            if (isTheSameVariations(variations) && quantity === requestProduct.quantity) return;

            requestProducts.push(requestProduct);
        }
    });

    props.requestList.push(...requestProducts);

    quantities.value = [];
    dialogRef.value?.close();

    emits("added");
}

function showDialog() {
    dialogRef.value?.show();
}

function initializeQuantities(variations: ProductVariation[][]) {
    variations?.forEach((_, idx) => (quantities.value[idx] = 0));
}

defineExpose({ show: showDialog, initializeQuantities });
</script>

<template>
    <VDialog ref="dialogRef" title="Adicionar artigo a lista de solicitação" class="max-w-[40rem]">
        <div class="flex items-center gap-x-4 w-full">
            <h2 class="font-medium flex-1">{{ product?.id }} # {{ product?.name }}</h2>

            <div v-if="!product?.variations">
                <input v-model="quantities[0]" type="number" class="max-w-24" placeholder="QTD" />
            </div>
        </div>

        <div class="w-full" v-if="product?.variations">
            <div
                v-for="(variations, idx) in product?.variations"
                :key="idx"
                class="flex gap-x-4 items-center p-2 mb-1"
            >
                <div class="flex flex-1 gap-x-2 cursor-pointer">
                    <div v-for="variation in variations" class="flex space-x-1">
                        <span>{{ variation.name }}</span>
                        <span> : </span>
                        <span>{{ variation.value }}</span>
                    </div>
                </div>

                <span class="px-2 py-1 bg-secondary-600 rounded-3xl text-sm text-white">
                    3 em stock
                </span>

                <input v-model="quantities[idx]" type="number" class="max-w-24" placeholder="QTD" />
            </div>
        </div>

        <button class="btn-secondary" @click="addProductToRequestList">Adicionar</button>
    </VDialog>
</template>
~/lib/models/product
