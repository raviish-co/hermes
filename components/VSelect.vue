<script setup lang="ts">
interface Propos {
    modelValue: string;
    options: string[];
    placeholder: string;
}

interface Emits {
    (e: "update:modelValue", value: string): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Propos>();

function emitSelectedOption(e: Event) {
    const selectedValue = (e.target as HTMLSelectElement).value;
    emits("update:modelValue", selectedValue);
}

onMounted(() => {
    if (props.options.includes(props.placeholder)) {
        emits("update:modelValue", props.placeholder);
    }
});
</script>

<template>
    <select :v-model="modelValue" class="input-field" @change="emitSelectedOption">
        <option selected>{{ placeholder }}</option>
        <option v-for="option in options" :key="option" :value="option">
            {{ option }}
        </option>
    </select>
</template>
