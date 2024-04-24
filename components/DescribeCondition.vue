<script setup lang="ts">
import type { ConditionModel } from "@frontend/models/condition";
import type { VDialog } from "#build/components";
import { Note } from "~/lib/frontend/domain/note";

interface Emits {
    (e: "update:condition", value: ConditionModel): void;
}

const condition = reactive<ConditionModel>({ status: "Bom", comment: "" });
const dialogRef = ref<typeof VDialog>();
const emits = defineEmits<Emits>();
const itemId = ref<string>("");

const isDisabled = computed(() => {
    if (condition.status === "Mau" && !condition.comment) return true;

    if (condition.comment && condition.comment.length === 0) return false;

    return false;
});

function initializeCondition(id: string, oldCondition: ConditionModel) {
    itemId.value = id;
    condition.comment = "";
    condition.status = "Bom";

    if (oldCondition.comment) {
        condition.comment = oldCondition.comment;
        condition.status = "Mau";
    }
}

function updateCondition() {
    props.note.updateCondition(itemId.value, condition);

    dialogRef.value?.close();
}

function show() {
    dialogRef.value?.show();
}

defineExpose({ show, initializeCondition });
const props = defineProps<{ note: Note }>();
</script>

<template>
    <VDialog ref="dialogRef" title="Descrever estado do artigo" class="max-w-[30rem]">
        <ChooseCondition
            :condition="condition"
            @status="condition.status = $event"
            @comment="condition.comment = $event"
        />

        <button class="btn-secondary" :disabled="isDisabled" @click="updateCondition()">
            Salvar
        </button>
    </VDialog>
</template>
