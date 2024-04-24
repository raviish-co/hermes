<script setup lang="ts">
import type { ConditionModel } from "~/lib/frontend/models/condition";

interface Emits {
    (e: "status", value: "Bom" | "Mau"): void;
    (e: "comment", value: string): void;
}

interface Props {
    condition?: ConditionModel;
}

const condition = reactive({ status: "Bom", comment: "" });
const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const result = computed(() => {
    if (props.condition) {
        condition.status = props.condition.status;
        condition.comment = props.condition.comment ?? "";
    }

    return condition;
});

function changeStatus(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (value === "Bom") {
        condition.status = "Bom";
        condition.comment = "";
        emits("status", "Bom");
        emits("comment", condition.comment);
        return;
    }

    condition.status = "Mau";
    condition.comment = "";

    emits("status", "Mau");
    emits("comment", condition.comment);
}
</script>

<template>
    <div class="space-y-4">
        <select class="input-field" v-model="result.status" @change="changeStatus">
            <option selected value="Bom">Bom</option>
            <option value="Mau">Mau</option>
        </select>

        <textarea
            v-model="condition.comment"
            placeholder="Escreva uma nota sobre o estado atual do artigo."
            :rows="3"
            :class="condition.status === 'Bom' ? 'input-disabled' : 'input-field'"
            class="input-field resize-none"
            @input="emits('comment', condition.comment)"
        />
    </div>
</template>
