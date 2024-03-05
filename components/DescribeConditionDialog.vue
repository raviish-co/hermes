<script setup lang="ts">
import type { Condition } from "@frontend/models/condition";
import type { VDialog } from "#build/components";

const BAD = "Mau";
const itemId = ref<string>("");
const condition = ref<Condition>({ status: "Bom", comment: "" });
const dialogRef = ref<typeof VDialog>();

const isGoodState = computed(() => condition.value.status !== BAD);
const isValidCondition = computed(() => condition.value.status === BAD && !condition.value.comment);

const emits = defineEmits<{ (e: "updateCondition", itemId: string, condition: Condition): void }>();

function initializeCondition(id: string, oldCondition: Condition) {
    itemId.value = id;
    condition.value = oldCondition;
}

function show() {
    dialogRef.value?.show();
}

defineExpose({ show, initializeCondition });
</script>

<template>
    <VDialog ref="dialogRef" title="Descrever estado do artigo" class="max-w-[30rem]">
        <select class="input-field" v-model="condition.status">
            <option value="Bom">Bom</option>
            <option value="Mau">Mau</option>
        </select>

        <textarea
            v-model="condition.comment"
            placeholder="Escreva uma nota sobre o estado atual do artigo."
            :rows="3"
            :disabled="isGoodState"
            class="input-field resize-none"
        />

        <button
            class="btn-secondary"
            :disabled="isValidCondition"
            @click="$emit('updateCondition', itemId, condition)"
        >
            Salvar
        </button>
    </VDialog>
</template>
