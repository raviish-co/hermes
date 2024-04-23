<script setup lang="ts">
import type { ConditionModel } from "~/lib/frontend/models/condition";

interface Emits {
    (e: "condition", value: ConditionModel): void;
}

interface Props {
    condition?: ConditionModel;
}

const condition = reactive<ConditionModel>({ status: "Bom", comment: "" });
const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const result = computed(() => {
    if (props.condition) {
        condition.status = props.condition.status;
        condition.comment = props.condition.comment;
    }

    return condition;
});

function changeStatus(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    if (value === "Bom") {
        condition.status = "Bom";
        condition.comment = "";
        return;
    }

    condition.status = "Mau";
    condition.comment = "";
    emits("condition", condition);
}
</script>

<template>
    <div class="input-container">
        <select class="input-field" v-model="result.status" @change="changeStatus">
            <option selected value="Bom">Bom</option>
            <option value="Mau">Mau</option>
        </select>

        <input
            type="text"
            placeholder="Escreva uma nota sobre o estado atual do artigo."
            v-model="result.comment"
            :class="condition.status === 'Bom' ? 'input-disabled' : 'input-field'"
            @input="emits('condition', condition)"
        />
    </div>
</template>
