<script setup lang="ts">
interface Props {
    sectionId?: string;
}

interface Emits {
    (e: "section", value: string): void;
}

const emits = defineEmits<Emits>();
const catalog = useCatalog();

function chooseSection(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    emits("section", value);
}

defineProps<Props>();
onMounted(() => catalog.listSections());
</script>

<template>
    <select class="input-field" @change="chooseSection">
        <option :selected="sectionId === undefined" disabled>Secção</option>
        <option
            v-for="section in toValue(catalog.sections)"
            :key="section.sectionId"
            :value="section.sectionId"
            :selected="section.sectionId === sectionId"
        >
            {{ section.name }}
        </option>
    </select>
</template>
