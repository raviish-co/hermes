<script setup lang="ts">
import type { VDialog } from "#build/components";
import type { Note } from "~/lib/frontend/domain/note";

const dialogRef = ref<typeof VDialog>();
const itemId = ref<string>("");
const goodQuantities = ref<number>(0);
const badQuantitites = ref<number>(0);
const maxLimit = ref<number>(0);

const isDisabled = computed(() => {
    if (!goodQuantities.value && !badQuantitites.value) return true;

    if (goodQuantities.value + badQuantitites.value === 0) return true;

    if (goodQuantities.value < 0 || badQuantitites.value < 0) return true;

    if (goodQuantities.value === 0 && badQuantitites.value === 0) return true;

    if (goodQuantities.value + badQuantitites.value > maxLimit.value) return true;

    return false;
});

function save() {
    props.note.updateQuantitiesToReturn(itemId.value, goodQuantities.value, badQuantitites.value);
    dialogRef.value?.close();
}

function show(id: string, limit: number) {
    itemId.value = id;
    maxLimit.value = limit;
    dialogRef.value?.show();
}

defineExpose({ show });
const props = defineProps<{ note: Note }>();
</script>

<template>
    <VDialog ref="dialogRef" title="Condição de devolução" class="max-w-[30rem]">
        <input
            class="input-field"
            placeholder="QTD. em boas condições"
            type="number"
            v-model="goodQuantities"
        />
        <input
            class="input-field"
            placeholder="QTD. em más condições"
            type="number"
            v-model="badQuantitites"
        />
        <textarea placeholder="Comentário" rows="3" class="input-field resize-none" />
        <button class="btn-secondary" :disabled="isDisabled" @click="save()">Salvar</button>
    </VDialog>
</template>
