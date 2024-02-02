<script setup lang="ts">
type InputType = "text" | "date" | "search" | "number";

interface Props {
    disabled?: boolean;
    modelValue?: string | number | Date;
    placeholder?: string;
    type?: InputType;
}

interface Emits {
    (e: "update:modelValue", value: string | Date | number): void;
}

const emits = defineEmits<Emits>();
withDefaults(defineProps<Props>(), {
    type: "text",
});

function emitValue(e: Event) {
    const type = (e.target as HTMLInputElement).type;

    if (type === "date") {
        const value = (e.target as HTMLInputElement).valueAsDate;
        emits("update:modelValue", value!);
        return;
    }

    const value = (e.target as HTMLInputElement).value;

    emits("update:modelValue", value);
}
</script>

<template>
    <input
        :v-model="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :type="type"
        class="input-field"
        @input="emitValue"
    />
</template>
