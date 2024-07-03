<script setup lang="ts">
interface Props {
    modelValue?: number;
    initital?: number;
    limit?: number;
}

interface Emits {
    (e: "update-quantity", quantity: number): void;
    (e: "enter"): void;
    (e: "tab"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

function updateQuantity(e: Event) {
    const value = parseInt((e.target as HTMLInputElement).value);

    if (!value) {
        emits("update-quantity", 0);
        return;
    }

    if (props.limit && value > props.limit) {
        emits("update-quantity", 0);
        return;
    }

    emits("update-quantity", value);
}
</script>

<template>
    <input
        type="number"
        class="input-number text-center"
        placeholder="QTD"
        min="1"
        :value="modelValue ? modelValue : 1"
        :max="limit"
        :required="true"
        @input="updateQuantity"
        @keypress.enter="$emit('enter')"
        @keydown.tab="emits('tab')"
    />
</template>
