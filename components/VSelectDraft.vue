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
    <div class="relative" @click="toogleOptions">
        <p class="p-2">{{ selectedOption || label }}<span>&nbsp;down</span></p>
        <ul class="absolute bg-white p-2 top-10" v-show="optionsVisibility">
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
