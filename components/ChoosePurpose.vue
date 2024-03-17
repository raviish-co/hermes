<script lang="ts" setup>
import { Purpose } from "~/lib/frontend/domain/purpose";
import type { PurposeSpecificationModel } from "~/lib/frontend/models/purpose_specification";
import { PurposeService } from "~/lib/frontend/services/purpose_service";

const purpose = ref<Purpose>(new Purpose("", ""));
const specitications = ref<PurposeSpecificationModel[]>([]);
const detailsConstraint = ref<string[]>([]);
const notesType = ref<string>("");
const emits = defineEmits<{ (e: "choosed", purpose: Purpose): void }>();

const disableDetailsConstraint = computed(
    () => detailsConstraint.value.length <= 0 || purpose.value.description == ""
);
const isEmptyDescription = computed(() => purpose.value.description === "");
const isEmptyDetails = computed(
    () => purpose.value.details === "" && !disableDetailsConstraint.value
);
const isEmptyNotes = computed(() => purpose.value.notes === "" && !isEmptyDescription.value);

const service = new PurposeService();
specitications.value = await service.listPurposes();

function chooseDetails(evt: Event): void {
    const el = evt.target as HTMLSelectElement;
    purpose.value.description = el.value;

    const specification = specitications.value.find((s) => s.description === el.value);

    if (!specification) {
        notesType.value = "";
        purpose.value.notes = "";
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
</script>

<template>
    <div class="space-y-4">
        <div class="input-container">
            <select
                class="input-field"
                :value="purpose.description || 'Finalidade'"
                :class="{ invalid: isEmptyDescription }"
                @change="chooseDetails"
            >
                <option selected disabled>Finalidade</option>
                <option v-for="spec in specitications" :key="spec.description">
                    {{ spec.description }}
                </option>
            </select>

            <select
                :value="purpose.details || 'Detalhes'"
                :class="{
                    'input-field': !disableDetailsConstraint,
                    'input-disabled': disableDetailsConstraint,
                    invalid: isEmptyDetails,
                }"
                @change="selectDetails"
            >
                <option selected disabled>Detalhes</option>
                <option v-for="opt in detailsConstraint" :key="opt">
                    {{ opt }}
                </option>
            </select>
        </div>
        <input
            v-model="purpose.notes"
            :class="{
                'input-field': !isEmptyDescription,
                'input-disabled': isEmptyDescription,
                invalid: isEmptyNotes,
            }"
            :placeholder="notesType"
            @input="$emit('choosed', purpose)"
        />
    </div>
</template>
