<script setup lang="ts">
import type { VDialog } from "#build/components";
import type { Note } from "@frontend/domain/note";
import type { ConditionModel } from "@frontend/models/condition";

const dialogRef = ref<typeof VDialog>();
const itemId = ref<string>("");
const goodQuantities = ref<number>(0);
const badQuantitites = ref<number>(0);
const maxLimit = ref<number>(0);
const comment = ref<string>("");

interface Emits {
    (e: "update-quantity", value: { itemId: string; total: number }): void;
}

const emits = defineEmits<Emits>();

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
    if (comment) {
        const condition = { status: "Mau", comment: comment.value };
        props.note.updateCondition(itemId.value, condition as ConditionModel);
    }
    dialogRef.value?.close();

    const total = goodQuantities.value + badQuantitites.value;

    emits("update-quantity", {
        itemId: itemId.value,
        total,
    });
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
        <textarea
            placeholder="Comentário"
            rows="3"
            class="input-field resize-none"
            v-model="comment"
        />
        <button class="btn-secondary" :disabled="isDisabled" @click="save()">Salvar</button>
    </VDialog>
</template>
