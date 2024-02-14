<script lang="ts" setup>
import { handleException } from "~/lib/helpers/handler";
import { UploadService } from "~/lib/services/upload_service";
import { CatalogService } from "~/lib/services/catalog_service";
import { departaments } from "~/lib/constants";
import type { Category } from "~/lib/models/item";

const currentDepartament = ref<string>("Homem");
const currentCategory = ref<string>("");
const currentSubcategory = ref<string>("");
const subcategories = ref<string[]>([]);
const currentFormData = ref<FormData | null>(null);
const uploadService = new UploadService();
const catalogService = new CatalogService();
const categories = ref<Category[]>([]);
const categorieNames = ref<string[]>([]);

function updateCategory(category: string) {
    currentCategory.value = category;

    subcategories.value = getSubcategoriesByCategory(category);
}

function getSubcategoriesByCategory(category: string): string[] {
    const subcategories: string[] = [];

    categories.value.forEach((c) => {
        if (c.name === category) {
            subcategories.push(...c.subcategories);
        }
    });

    return subcategories;
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

function listCategories() {
    catalogService.listCategories().then((res) => {
        categories.value = res;
        categorieNames.value = res.map((r) => r.name);
    });
}

function searchCategory(query: string): string[] {
    const lowerCategorieNames = categories.value.map((c) => c.name.toLocaleLowerCase());

    return lowerCategorieNames.filter((c) => c.includes(query));
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
        .then((res) => alert(res.message))
        .catch(handleException);
}

onMounted(() => {
    listCategories();
});
</script>

<template>
    <section>
        <div class="w-full h-20 sm:h-24 py-4 bg-primary flex justify-center items-center">
            <NuxtLink to="/" class="h-16">
                <img src="/images/logo.png" alt="Logotipo da Raviish" class="h-full" />
            </NuxtLink>
        </div>

        <div class="section-content">
            <h1 class="text-xl text-center sm:text-2xl sm:my-10 my-8">Importar Artigos</h1>

            <form class="m-auto my-8 w-full flex flex-1 flex-col gap-4 max-w-96">
                <select v-model="currentDepartament" class="input-field">
                    <option v-for="departament in departaments" :key="departament">
                        {{ departament }}
                    </option>
                </select>
                <InputSelect
                    placeholder="Secção"
                    :search="searchCategory"
                    :options="categorieNames"
                    @selected="updateCategory"
                />
                <InputSelect
                    placeholder="Subsecção"
                    :options="subcategories"
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
        </div>
    </section>
</template>
