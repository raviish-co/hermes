<script lang="ts" setup>
interface Props {
    placeholder: string;
    options?: string[];
    isInvalid?: boolean;
}

interface Emits {
    (e: "selected", result: string): void;
}

const emits = defineEmits<Emits>();
defineProps<Props>();
const selectedValue = ref<string>("");

const dropdownVisibility = ref<boolean>(false);

function showDropDown() {
    dropdownVisibility.value = true;
}

function hideDropDown() {
    dropdownVisibility.value = false;
}

function emitResult(result: string) {
    selectedValue.value = result;
    emits("selected", result);

    hideDropDown();
}
</script>

<template>
    <div class="relative">
        <input
            v-model="selectedValue"
            :placeholder="placeholder"
            class="input-field"
            :class="{ invalid: isInvalid }"
            @input="() => emitResult(selectedValue)"
            @focusin="showDropDown"
            @focusout="hideDropDown"
        />

        <div
            class="absolute z-50 bg-white flex flex-col mt-2 shadow-md w-full h-36 overflow-y-auto"
            :class="{ hidden: !dropdownVisibility }"
        >
            <span
                v-for="(result, idx) in options"
                :key="idx"
                class="px-3 py-1 cursor-pointer hover:bg-opacity-20"
                @mousedown="emitResult(result)"
                >{{ result }}</span
            >
        </div>
    </div>
</template>
