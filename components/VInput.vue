<script setup lang="ts">
interface Propos {
    disabled?: boolean;
    placeholder: string;
}

interface Emits {
    (e: "input", value: string): void;
}

function emitValue(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    emits("input", value);
}

const emits = defineEmits<Emits>();
defineProps<Propos>();
</script>

<template>
    <input class="input-field" :placeholder="placeholder" :disabled="disabled" @input="emitValue" />
</template>
