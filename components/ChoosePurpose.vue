<script lang="ts" setup>
import type { PurposeSpecificationModel } from "~/lib/frontend/models/purpose_specification";
import { PurposeService } from "~/lib/frontend/services/purpose_service";
import { Purpose } from "~/lib/frontend/domain/purpose";

interface Emits {
    (e: "choosed", purpose: Purpose): void;
}

const emits = defineEmits<Emits>();

const specitications = ref<PurposeSpecificationModel[]>([]);
const purpose = ref<Purpose>({} as Purpose);
const detailsConstraint = ref<string[]>([]);
const notesType = ref<string>("");

const service = new PurposeService();

const disableDetailsConstraint = computed(() => {
    if (detailsConstraint.value.length <= 0 || purpose.value.description == "") return true;
    return false;
});

const isEmpty = computed(() => {
    if (!purpose.value.description) return true;

    if (!purpose.value.notes && !purpose.value.description) return true;

    if (!purpose.value.details && !disableDetailsConstraint) return true;

    return false;
});

function choosePurpose(event: Event): void {
    const el = event.target as HTMLSelectElement;

    purpose.value = new Purpose(el.value);

    const specification = specitications.value.find((s) => s.description === el.value);

    if (!specification) {
        notesType.value = "";
        purpose.value.notes = "";
        return;
    }

    detailsConstraint.value = specification.detailsConstraint ?? [];
    notesType.value = specification.notesType;

    emits("choosed", purpose.value as Purpose);
}

function selectDetails(event: Event) {
    const target = event.target as HTMLSelectElement;
    purpose.value.details = target.value;
}

onMounted(async () => {
    specitications.value = await service.listPurposes();
});
</script>

<template>
    <div class="space-y-4">
        <div class="input-container">
            <select
                class="input-field"
                :class="{ 'input-required': !purpose?.description }"
                :value="purpose.description || 'Finalidade'"
                @change="choosePurpose"
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
                    'input-required': purpose.details == '',
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
            class="input-field"
            :class="{
                'input-disabled': isEmpty,
                'input-required': purpose.notes == '',
            }"
            :placeholder="notesType"
            @input="$emit('choosed', purpose as Purpose)"
        />
    </div>
</template>
