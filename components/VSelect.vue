<script setup lang="ts">
interface Propos {
    options: string[];
    placeholder: string;
}

interface Emits {
    (e: "change", value: string): void;
}

const emits = defineEmits<Emits>();
defineProps<Propos>();

function emitSelectedValue(e: Event) {
    const selectedValue = (e.target as HTMLSelectElement).value;
    emits("change", selectedValue);
}
</script>

<template>
    <select class="input-field" @change="emitSelectedValue">
        <option selected disabled>{{ placeholder }}</option>
        <option v-for="(option, idx) in options" :key="idx" :value="option">
            {{ option }}
        </option>
    </select>
</template>
