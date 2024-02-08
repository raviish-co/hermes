<script lang="ts" setup>
interface Props {
    placeholder: string;
    search?: (query: string) => string[];
    list?: string[];
    isInvalid?: boolean;
}

interface Emits {
    (e: "selected", result: string): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const dropdownVisibility = ref<boolean>(false);
const searchResult = ref<string[]>([]);
const query = ref<string>("");

async function search() {
    searchResult.value = props.search!(query.value);
}

function showDropDown() {
    dropdownVisibility.value = true;
}

function hideDropDown() {
    dropdownVisibility.value = false;
}

function execute() {
    if (!query.value) return;

    if (props.search) {
        search();
    }

    emits("selected", query.value);
}

function selectResult(result: string) {
    query.value = result;

    emits("selected", result);

    hideDropDown();
}
</script>

<template>
    <div class="relative">
        <input
            :placeholder="placeholder"
            v-model="query"
            class="input-field"
            :class="{ invalid: isInvalid }"
            @input="execute"
            @focusin="showDropDown"
            @focusout="hideDropDown"
        />

        <div
            class="absolute z-50 bg-white flex flex-col mt-2 shadow-md w-full"
            :class="{ hidden: !dropdownVisibility }"
        >
            <span
                v-for="(result, idx) in searchResult"
                :key="idx"
                class="px-3 py-1 cursor-pointer hover:bg-opacity-20"
                @mousedown="selectResult(result)"
                >{{ result }}</span
            >

            <span v-if="searchResult.length === 0" class="px-3 py-2"
                >Nenhum valor encontrado...</span
            >
        </div>
    </div>
</template>
