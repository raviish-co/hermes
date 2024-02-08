<script lang="ts" setup>
import type { VDialog } from "#build/components";
import { handleException } from "~/lib/helpers/handler";
import { UploadService } from "~/lib/services/upload_service";
import { departaments } from "~/lib/constants";

const dialogRef = ref<typeof VDialog>();
const currentDepartament = ref<string>("Homem");
const currentCategory = ref<string>("");
const currentSubcategory = ref<string>("");
const subcategories = ref<string[]>([]);
const currentFormData = ref<FormData | null>(null);
const uploadService = new UploadService();

function updateCategory(category: string) {
    currentCategory.value = category;
}

function updateSubcategory(subcategory: string) {
    currentSubcategory.value = subcategory;
}

function updateFile(file: File | null) {
    if (!file) {
        currentFormData.value = null;
        return;
    }

    currentFormData.value = new FormData();
    currentFormData.value.append("file", file);
}

function searchCategory(query: string): string[] {
    return [];
}

const isValidCategory = computed(() => currentCategory.value !== "");
const isValidSubcategory = computed(() => currentSubcategory.value !== "");
const isValidFile = computed(() => currentFormData.value !== null);
const isValidForm = computed(
    () => isValidFile.value && isValidSubcategory.value && isValidCategory.value
);

function uploadFile() {
    if (!currentFormData.value) return;

    currentFormData.value.append("departament", currentDepartament.value);
    currentFormData.value.append("category", currentCategory.value);
    currentFormData.value.append("subcategory", currentSubcategory.value);

    uploadService
        .upload(currentFormData.value)
        .then((res) => console.log(res))
        .catch(handleException);
}

function showDialog() {
    dialogRef.value?.show();
}

defineExpose({ show: showDialog });
</script>

<template>
    <VDialog ref="dialogRef" title="Importar Itens" class="max-w-96">
        <form class="w-full flex flex-1 flex-col gap-4">
            <select v-model="currentDepartament" class="input-field">
                <option v-for="departament in departaments" :key="departament">
                    {{ departament }}
                </option>
            </select>

            <SearchSelect
                placeholder="Categoria"
                :search="searchCategory"
                @selected="updateCategory"
            />

            <SearchSelect
                placeholder="Categoria"
                :list="subcategories"
                @selected="updateSubcategory"
            />

            <UploadFile @uploaded="updateFile" />

            <button
                type="button"
                class="btn btn-secondary"
                :disabled="!isValidForm"
                @click="uploadFile"
            >
                Importar
            </button>
        </form>
    </VDialog>
</template>
