<script setup lang="ts">
interface Props {
    total: number;
}

interface Emits {
    (e: "changed", currentPage: number): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const currentPage = ref<number>(1);

function goToNexPage() {
    if (currentPage.value < props.total) {
        currentPage.value += 1;
        emits("changed", currentPage.value);
    }
}

function goToPreviousPage() {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
        emits("changed", currentPage.value);
    }
}
</script>

<template>
    <div v-if="total > 1" class="flex items-center gap-x-4">
        <span @click="goToPreviousPage" class="cursor-pointer p-2 hover:bg-gray-200">«</span>
        <div class="flex gap-x-1 font-semibold text-white">
            <span v-if="currentPage > 1" class="px-2 pt-1 bg-gray-400">{{ currentPage - 1 }}</span>
            <span class="px-2 pt-1 bg-gray-500">{{ currentPage }}</span>
            <span v-if="currentPage < total" class="px-2 pt-1 bg-gray-400">{{
                currentPage + 1
            }}</span>
        </div>
        <span @click="goToNexPage" class="cursor-pointer p-2 hover:bg-gray-200">»</span>
    </div>
</template>
