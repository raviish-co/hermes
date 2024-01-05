<script setup lang="ts">
type InputType = "text" | "date";

interface Props {
    disabled?: boolean;
    placeholder: string;
    type?: InputType;
}

interface Emits {
    (e: "input", value: string): void;
}

const emits = defineEmits<Emits>();
withDefaults(defineProps<Props>(), { type: "text" });

function emitValue(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    emits("input", value);
}
</script>

<template>
    <input
        class="input-field"
        :placeholder="placeholder"
        :disabled="disabled"
        :type="type"
        @input="emitValue"
    />
</template>
