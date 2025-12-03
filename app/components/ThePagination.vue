<script setup lang="ts">
interface Props {
    total: number;
}

interface Emits {
    (e: "changed", page: number): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const page = ref<number>(1);

function nextPage() {
    if (page.value >= props.total) return;

    page.value += 1;
    emits("changed", page.value);
}

function previousPage() {
    if (page.value <= 1) return;

    page.value -= 1;
    emits("changed", page.value);
}
</script>

<template>
    <div v-if="total > 1" class="flex justify-center items-center gap-2">
        <span
            class="material-symbols-outlined cursor-pointer hover:bg-gray-100"
            @click="previousPage()"
        >
            keyboard_double_arrow_left
        </span>

        <div class="flex gap-x-1 font-semibold">
            <span v-if="page > 1" class="px-2 pt-1">{{ page - 1 }}</span>
            <span class="px-2 pt-1 bg-secondary-600 text-white">{{ page }}</span>
            <span v-if="page < total" class="px-2 pt-1">{{ page + 1 }}</span>
        </div>

        <span
            class="material-symbols-outlined cursor-pointer hover:bg-gray-100"
            @click="nextPage()"
        >
            keyboard_double_arrow_right
        </span>
    </div>
</template>
