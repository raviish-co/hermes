<script setup lang="ts">
import type { ConditionModel } from "~~/server/frontend/models/condition";

interface Emits {
    (e: "status", value: "Bom" | "Mau"): void;
    (e: "comment", value: string): void;
    (e: "badQuantities", value: number): void;
}

interface Props {
    condition?: ConditionModel;
    quantities: number;
}

const emits = defineEmits<Emits>();
const condition = reactive({ status: "Bom", comment: "" });
const props = defineProps<Props>();
const badQuantitites = ref<number>(0);
const total = ref<number>(0);

const result = computed(() => {
    if (props.condition) {
        condition.status = props.condition.status;
        condition.comment = props.condition.comment ?? "";
    }

    return condition;
});

function changeStatus(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    reset(props.quantities);

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

function calculate() {
    if (total.value === 0) {
        total.value = props.quantities;
    }

    total.value = props.quantities - badQuantitites.value;

    if (total.value < 0) {
        total.value = props.quantities;
        emits("badQuantities", 0);
        return;
    }

    emits("badQuantities", badQuantitites.value);
}

function initialize(good: number, bad: number) {
    total.value = good - bad;
    badQuantitites.value = bad;
}

function reset(value: number) {
    total.value = value;
    badQuantitites.value = 0;
}

defineExpose({ reset, initialize });
</script>

<template>
    <div class="space-y-4">
        <select class="input-field" v-model="result.status" @change="changeStatus">
            <option selected value="Bom">Bom</option>
            <option value="Mau">Mau</option>
        </select>

        <input class="input-disabled" :value="total" />

        <input
            class="input-field"
            placeholder="0"
            v-model="badQuantitites"
            type="number"
            :class="{
                'input-disabled': condition.status === 'Bom',
                invalid:
                    badQuantitites > quantities ||
                    badQuantitites < 0 ||
                    (!badQuantitites && condition.status === 'Mau'),
            }"
            @input="calculate()"
        />

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
