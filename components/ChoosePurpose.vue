<script lang="ts" setup>
interface Emits {
    (e: "descriptionChanged", value: string): void;
    (e: "detailChanged", value: string): void;
    (e: "notesTypeChanged", value: string): void;
    (e: "validPurpose", value: boolean): void;
}

const emits = defineEmits<Emits>();

const INNER_LAUNDRY = "Interna";
const DISCARD = "Descartar";
const PURPOSE = "Finalidade";
const DETAILS = "Detalhes";

const purposes = usePurpose().purposes;
const currentNotesType = ref<string>("");
const currentDetails = ref<string[]>([]);
const currentDescription = ref<string>(PURPOSE);
const descriptions = ref<string[]>([]);
const currentDetail = ref<string>(DETAILS);
const isDisabledDetails = computed(() => currentDetails.value.length <= 0);
const notesTypeIsDisabled = ref<boolean>(false);
const currentNotesTypePlaceholder = ref<string>("Descrição");

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
    if (currentNotesType.value === "" && !notesTypeIsDisabled.value) return false;

    return true;
});

const isValidPurpose = computed(
    () => isValidDescription.value && isValidDetail.value && isValidNotesType.value
);

function getDescriptions() {
    descriptions.value = purposes.value.map((p) => p.description);
}

function findDetailsByDescription(e: Event): void {
    emits("descriptionChanged", currentDescription.value);
    emits("validPurpose", isValidPurpose.value);

    if (currentDescription.value === PURPOSE) {
        currentDetail.value = DETAILS;

        emits("descriptionChanged", currentDetail.value);
        emits("validPurpose", isValidPurpose.value);

        currentDetails.value = [];
        return;
    }

    purposes.value.find((p) => {
        if (p.description === currentDescription.value) {
            currentNotesTypePlaceholder.value = p.notesType!;
            updateCurrentDetails(p.detailsConstraint);
            disableNotesType();
            return true;
        }
    });

    currentDetail.value = DETAILS;
    emits("detailChanged", currentDetail.value);
    emits("validPurpose", isValidPurpose.value);
}

function disableNotesType(): void {
    if (currentDescription.value === DISCARD || currentDetail.value === INNER_LAUNDRY) {
        notesTypeIsDisabled.value = true;
        currentNotesType.value = "";

        emits("notesTypeChanged", currentNotesType.value);
        emits("validPurpose", isValidPurpose.value);

        return;
    }

    notesTypeIsDisabled.value = false;
}

function updateCurrentDetails(details?: string[]) {
    if (!details) {
        currentDetails.value = [];
        return;
    }

    currentDetails.value = details;
}

function emitCurrentDetail(e: Event) {
    emits("detailChanged", currentDetail.value);
    emits("validPurpose", isValidPurpose.value);

    disableNotesType();
}

function emitNotesType(e: Event) {
    emits("notesTypeChanged", currentNotesType.value);
    emits("validPurpose", isValidPurpose.value);
}

function clearInputs() {
    currentDescription.value = PURPOSE;
    currentDetail.value = DETAILS;
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
            :disabled="isDisabledDetails"
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
        :disabled="notesTypeIsDisabled"
        class="input-field mb-4"
        :class="{ invalid: !isValidNotesType }"
        @input="emitNotesType"
    />
</template>
