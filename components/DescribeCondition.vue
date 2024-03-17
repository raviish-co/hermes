<script setup lang="ts">
import type { Condition } from "@frontend/models/condition";
import type { VDialog } from "#build/components";
import { Note } from "~/lib/frontend/domain/note";

const BAD = "Mau";

const itemId = ref<string>("");
const condition = ref<Condition>({ status: "Bom", comment: "" });
const dialogRef = ref<typeof VDialog>();
const props = defineProps<{ note: Note }>();

const isGoodState = computed(() => condition.value.status !== BAD);
const isValidCondition = computed(() => condition.value.status === BAD && !condition.value.comment);

function initializeCondition(id: string, oldCondition: Condition) {
    itemId.value = id;
    condition.value = Object.assign({}, oldCondition);
}

function updateCondition() {
    if (condition.value.status !== BAD) {
        condition.value.comment = "";
    }

    props.note.updateCondition(itemId.value, condition.value);
    dialogRef.value?.close();
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

        <button class="btn-secondary" :disabled="isValidCondition" @click="updateCondition">
            Salvar
        </button>
    </VDialog>
</template>
