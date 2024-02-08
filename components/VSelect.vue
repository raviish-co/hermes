<script setup lang="ts">
interface Propos {
    value: string;
    options: string[];
    placeholder?: string;
    selectedValue?: string;
    isInvalid?: boolean;
}

interface Emits {
    (e: "change", value: string): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Propos>();

function emitSelectedOption(e: Event) {
    const selectedValue = (e.target as HTMLSelectElement).value;
    emits("change", selectedValue);
}

function isSelectedValue(option: string): boolean {
    return option === props.selectedValue;
}

onMounted(() => {
    if (props.options.includes(props?.placeholder!)) {
        emits("change", props?.placeholder!);
    }
});
</script>

<template>
    <select
        :value="value"
        class="input-field"
        :class="{ invalid: isInvalid }"
        @change="emitSelectedOption"
    >
        <option selected>{{ placeholder }}</option>
        <option
            v-for="option in options"
            :selected="isSelectedValue(option)"
            :key="option"
            :value="option"
        >
            {{ option }}
        </option>
    </select>
</template>
