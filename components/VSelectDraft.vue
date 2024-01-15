<script setup lang="ts">
interface Props {
    label: string;
    options: string[];
}

interface Emits {
    (e: "selected", option: string): void;
}

const selectedOption = ref<string>("");
const optionsVisibility = ref<boolean>(false);
const emits = defineEmits<Emits>();
defineProps<Props>();

function selectOption(option: string) {
    selectedOption.value = option;
    emits("selected", option);
}

function toogleOptions() {
    optionsVisibility.value = !optionsVisibility.value;
}

function clearOptions() {
    selectedOption.value = "";
}

defineExpose({ clearOptions });
</script>
<template>
    <div
        class="relative cursor-pointer w-full py-3 px-4 border border-gray-500 bg-white"
        @click="toogleOptions"
    >
        <p class="flex justify-between gap-x-2">
            <span>{{ selectedOption || label }}</span
            ><span>down</span>
        </p>
        <ul class="absolute bg-white p-2 top-10 border" v-show="optionsVisibility">
            <li
                v-for="option in options"
                @mousedown="selectOption(option)"
                class="p-2 hover:bg-gray-200"
            >
                {{ option }}
            </li>
        </ul>
    </div>
</template>
