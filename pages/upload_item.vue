<script lang="ts" setup>
import { handleException } from "~/lib/helpers/handler";
import { UploadService } from "~/lib/services/upload_service";
import { CatalogService } from "~/lib/services/catalog_service";
import type { Category } from "~/lib/models/item";

const currentDepartament = ref<string>("Homem");
const currentSection = ref<string>("");
const currentCategory = ref<string>("");
const categories = ref<string[]>([]);
const currentFormData = ref<FormData | null>(null);
const uploadService = new UploadService();
const catalogService = new CatalogService();
const sections = ref<Category[]>([]);
const sectionNames = ref<string[]>([]);
const currentFileName = ref<string>("");
const departaments: string[] = ["Homem", "Mulher", "Criança"];

function updateSection(section: string) {
    currentSection.value = section;

    categories.value = getCategoriesBySection(section);
}

function getCategoriesBySection(section: string): string[] {
    const categories: string[] = [];

    sections.value.forEach((s) => {
        if (s.name === section) {
            categories.push(...s.subcategories);
        }
    });

    return categories;
}

function updateCategory(category: string) {
    currentCategory.value = category;
}

function listSections() {
    catalogService.listCategories().then((res) => {
        sections.value = res;
        sectionNames.value = res.map((r) => r.name);
    });
}

function searchSection(query: string): string[] {
    const lowerSectionNames = sections.value.map((s) => s.name.toLocaleLowerCase());

    return lowerSectionNames.filter((s) => s.includes(query));
}

const isValidSection = computed(() => currentSection.value !== "");
const isValidCategory = computed(() => currentCategory.value !== "");
const isValidFile = computed(() => currentFormData.value !== null);
const isValidForm = computed(
    () => isValidFile.value && isValidCategory.value && isValidSection.value
);

function uploadFile() {
    if (!currentFormData.value) return;

    if (departaments.includes(currentDepartament.value)) {
        currentFormData.value.append("departament", currentDepartament.value);
    }

    currentFormData.value.append("section", currentSection.value);
    currentFormData.value.append("category", currentCategory.value);

    uploadService
        .upload(currentFormData.value)
        .then((res) => alert(res.message))
        .catch(handleException);
}

function updateFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0] as File;

    if (!file) {
        currentFormData.value = null;
        currentFileName.value = "";
        return;
    }

    currentFormData.value = new FormData();
    currentFormData.value.append("file", file);
    currentFileName.value = file.name;
}

onMounted(() => {
    listSections();
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
                    <option selected>Departamento</option>
                    <option v-for="departament in departaments" :key="departament">
                        {{ departament }}
                    </option>
                </select>
                <InputSelect
                    placeholder="Secção"
                    :search="searchSection"
                    :options="sectionNames"
                    @selected="updateSection"
                />

                <InputSelect
                    placeholder="Categoria"
                    :options="categories"
                    @selected="updateCategory"
                />

                <div>
                    <div class="flex flex-1">
                        <label for="file" class="flex items-center justify-center border">
                            <span
                                class="material-symbols-outlined text-3xl text-light-600 cursor-pointer"
                            >
                                attach_file
                            </span>
                        </label>

                        <span
                            class="input-field overflow-hidden truncate text-light-600 text-sm"
                            :class="{ invalid: !isValidFile }"
                            >{{ currentFileName }}</span
                        >
                    </div>

                    <input
                        type="file"
                        id="file"
                        accept="text/csv"
                        class="hidden"
                        @change="updateFile"
                    />
                </div>

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
