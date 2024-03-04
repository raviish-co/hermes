<script lang="ts" setup>
interface Emits {
    (e: "descriptionChanged", value: string): void;
    (e: "detailChanged", value: string): void;
    (e: "notesTypeChanged", value: string): void;
    (e: "validPurposeChanged", value: boolean): void;
}

const emits = defineEmits<Emits>();

const INNER_LAUNDRY = "Interna";
const PURPOSE = "Finalidade";
const DETAILS = "Detalhes";

const purposes = usePurpose().purposes;

const currentNotesType = ref<string>("");
const currentDetail = ref<string>(DETAILS);
const currentDescription = ref<string>(PURPOSE);
const currentDetails = ref<string[]>([]);
const currentNotesTypePlaceholder = ref<string>("Descrição");
const descriptions = ref<string[]>([]);
const isDisabledDetailsSelect = computed(() => currentDetails.value.length <= 0);
const isDisabledNotesTypeInput = ref<boolean>(false);

const isValidDescription = computed(() =>
    purposes.value.some((p) => p.description === currentDescription.value)
);

const isValidDetail = computed(() => {
    if (currentDetails.value.length > 0) {
        return currentDetails.value.some((s) => s === currentDetail.value);
    }

    return true;
});

const isValidNotesType = computed(() => {
    if (currentNotesType.value === "" && !isDisabledNotesTypeInput.value) return false;

    return true;
});

const isValidPurpose = computed(
    () => isValidDescription.value && isValidDetail.value && isValidNotesType.value
);

function getDescriptions() {
    descriptions.value = purposes.value.map((p) => p.description);
}

function disableNotesTypeInput(): void {
    if (currentDetail.value === INNER_LAUNDRY) {
        isDisabledNotesTypeInput.value = true;
        currentNotesType.value = "";

        emits("notesTypeChanged", currentNotesType.value);
        emits("validPurposeChanged", isValidPurpose.value);

        return;
    }

    isDisabledNotesTypeInput.value = false;
}

function updateCurrentDetails(details: string[]) {
    if (details.length === 0) {
        currentDetails.value = [];
        currentDetail.value = DETAILS;

        emits("detailChanged", currentDetail.value);

        return;
    }

    currentDetails.value = details;
}

function findDetailsByDescription(): void {
    emits("descriptionChanged", currentDescription.value);
    emits("validPurposeChanged", isValidPurpose.value);

    if (currentDescription.value === PURPOSE) {
        currentDetail.value = DETAILS;

        emits("descriptionChanged", currentDetail.value);
        emits("validPurposeChanged", isValidPurpose.value);

        currentDetails.value = [];
        return;
    }

    purposes.value.find((p) => {
        if (p.description === currentDescription.value) {
            currentNotesTypePlaceholder.value = p.notesType!;
            updateCurrentDetails(p.detailsConstraint!);
            return true;
        }
    });

    disableNotesTypeInput();

    emits("detailChanged", currentDetail.value);
    emits("validPurposeChanged", isValidPurpose.value);
}

function emitCurrentDetail() {
    emits("detailChanged", currentDetail.value);
    emits("validPurposeChanged", isValidPurpose.value);

    disableNotesTypeInput();
}

function emitNotesType() {
    emits("notesTypeChanged", currentNotesType.value);
    emits("validPurposeChanged", isValidPurpose.value);
}

function clearInputs() {
    currentDescription.value = PURPOSE;
    currentDetail.value = DETAILS;
    currentNotesType.value = "";
}

defineExpose({ clearInputs });

onMounted(() => {
    getDescriptions();
});
</script>

<template>
    <div class="flex items-center gap-4 mb-4 flex-wrap sm:flex-nowrap">
        <select
            v-model="currentDescription"
            class="input-field"
            :class="{ invalid: !isValidDescription }"
            @change="findDetailsByDescription"
        >
            <option selected>{{ PURPOSE }}</option>
            <option v-for="description in descriptions" :key="description">
                {{ description }}
            </option>
        </select>

        <select
            v-model="currentDetail"
            :disabled="isDisabledDetailsSelect"
            class="input-field"
            :class="{ invalid: !isValidDetail }"
            @change="emitCurrentDetail"
        >
            <option selected>{{ DETAILS }}</option>
            <option v-for="detail in currentDetails" :key="detail">
                {{ detail }}
            </option>
        </select>
    </div>

    <input
        v-model="currentNotesType"
        :placeholder="currentNotesTypePlaceholder"
        :disabled="isDisabledNotesTypeInput"
        class="input-field mb-4"
        :class="{ invalid: !isValidNotesType }"
        @input="emitNotesType"
    />
</template>
