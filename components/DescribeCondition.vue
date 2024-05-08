<script setup lang="ts">
import type { ConditionModel } from "@frontend/models/condition";
import type { VDialog, ChooseCondition } from "#build/components";
import { Note } from "@frontend/domain/note";

interface Emits {
    (e: "update:condition", value: ConditionModel): void;
}

const condition = reactive<ConditionModel>({ status: "Bom", comment: "" });
const emits = defineEmits<Emits>();

const goodQuantities = ref<number>(0);
const badQuantitites = ref<number>(0);

const dialogRef = ref<typeof VDialog>();
const chooseConditionRef = ref<typeof ChooseCondition>();
const itemId = ref<string>("");

const isDisabled = computed(() => {
    if (condition.status === "Mau" && !condition.comment) return true;

    if (condition.status === "Mau" && badQuantitites.value <= 0) return true;

    if (condition.comment && condition.comment.length === 0) return false;

    return false;
});

function initializeCondition(id: string, oldCondition?: ConditionModel) {
    itemId.value = id;
    condition.comment = "";
    condition.status = "Bom";

    if (!oldCondition?.comment) return;

    condition.comment = oldCondition.comment;
    condition.status = "Mau";
}

function initializeQuantities(good: number, bad: number) {
    goodQuantities.value = good;
    chooseConditionRef.value?.initialize(good, bad);
}

function save() {
    props.note.changeQuantity(itemId.value, goodQuantities.value);
    props.note.updateCondition(itemId.value, { status: "Bom" });

    if (condition.status === "Mau") {
        props.note.updateCondition(itemId.value, condition);
        props.note.updateBadQuantities(itemId.value, goodQuantities.value, badQuantitites.value);
    }

    dialogRef.value?.close();
}

function show() {
    dialogRef.value?.show();
}

defineExpose({ show, initializeCondition, initializeQuantities });
const props = defineProps<{ note: Note }>();
</script>

<template>
    <VDialog ref="dialogRef" title="Descrever estado do artigo" class="max-w-[30rem]">
        <ChooseCondition
            ref="chooseConditionRef"
            :condition="condition"
            :quantities="goodQuantities"
            @status="condition.status = $event"
            @comment="condition.comment = $event"
            @bad-quantities="badQuantitites = $event"
        />

        <button class="btn-secondary" :disabled="isDisabled" @click="save()">Salvar</button>
    </VDialog>
</template>
