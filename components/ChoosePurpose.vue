<script lang="ts" setup>
import type { Purpose } from "@frontend/models/purpose";
import type { PurposeSpecificationModel } from "~/lib/frontend/models/purpose_specification";
import { PurposeService } from "~/lib/frontend/services/purpose_service";

const purpose = ref<Purpose>({
    description: "",
    details: "",
    notes: "",
});

const service = new PurposeService();
const specitications = ref<PurposeSpecificationModel[]>([]);
const detailsConstraint = ref<string[]>([]);
const notesType = ref<string>("");

const disableDetailsConstraint = computed(
    () => detailsConstraint.value.length <= 0 || purpose.value.description == ""
);
const isEmptyDescription = computed(() => purpose.value.description === "");
const isEmptyDetails = computed(
    () => purpose.value.details === "" && !disableDetailsConstraint.value
);
const isEmptyNotes = computed(() => purpose.value.notes === "" && !isEmptyDescription.value);

specitications.value = await service.listPurposes();

const emits = defineEmits<{ (e: "choosed", purpose: Purpose): void }>();

function chooseDetails(evt: Event): void {
    const el = evt.target as HTMLSelectElement;
    purpose.value.description = el.value;

    const specification = specitications.value.find((s) => s.description === el.value);

    if (!specification) {
        notesType.value = "";
        return;
    }

    detailsConstraint.value = specification.detailsConstraint ?? [];
    notesType.value = specification.notesType;

    emits("choosed", purpose.value);
}

function selectDetails(evt: Event) {
    const target = evt.target as HTMLSelectElement;
    purpose.value.details = target.value;
}

function clear() {
    purpose.value = {
        description: "",
        details: "",
        notes: "",
    };
}

defineExpose({ clear });
</script>

<template>
    <div class="flex items-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
        <select
            class="input-field"
            :class="{ invalid: isEmptyDescription }"
            @change="chooseDetails"
        >
            <option selected value="">Finalidade</option>
            <option v-for="spec in specitications" :key="spec.description">
                {{ spec.description }}
            </option>
        </select>

        <select
            class="input-field"
            :class="{ invalid: isEmptyDetails }"
            :disabled="disableDetailsConstraint"
            @change="selectDetails"
        >
            <option selected value="">Detalhes</option>
            <option v-for="opt in detailsConstraint" :key="opt">
                {{ opt }}
            </option>
        </select>
    </div>

    <!-- :class="{ invalid: !isValidNotes }" -->

    <input
        v-model="purpose.notes"
        class="input-field mb-4"
        :class="{ invalid: isEmptyNotes }"
        :disabled="isEmptyDescription"
        :placeholder="notesType"
        @input="$emit('choosed', purpose)"
    />
</template>
