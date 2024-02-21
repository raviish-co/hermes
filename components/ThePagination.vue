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
    <div v-if="total > 0" class="flex items-center gap-x-4">
        <span
            class="material-symbols-outlined cursor-pointer hover:bg-gray-100"
            @click="goToPreviousPage"
        >
            keyboard_double_arrow_left
        </span>

        <div class="flex gap-x-1 font-semibold">
            <span v-if="currentPage > 1" class="px-2 pt-1">{{ currentPage - 1 }}</span>
            <span class="px-2 pt-1 bg-secondary-600 text-white">{{ currentPage }}</span>
            <span v-if="currentPage < total" class="px-2 pt-1">{{ currentPage + 1 }}</span>
        </div>

        <span
            class="material-symbols-outlined cursor-pointer hover:bg-gray-100"
            @click="goToNexPage"
        >
            keyboard_double_arrow_right
        </span>
    </div>
</template>
