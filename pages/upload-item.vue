<script lang="ts" setup>
import { handleException } from "@frontend/helpers/error_handler";
import { UploadService } from "@frontend/services/upload_service";

const currentFormData = ref<FormData | null>(null);
const uploadService = new UploadService();
const currentFileName = ref<string>("Selecione o ficheiro CSV");

const isValidFile = computed(() => currentFormData.value !== null);

function uploadFile() {
    if (!currentFormData.value) return;

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
        currentFileName.value = "Selecione o ficheiro CSV";
        return;
    }

    currentFormData.value = new FormData();
    currentFormData.value.append("file", file);
    currentFileName.value = file.name;
}
</script>

<template>
    <section>
        <div class="section-content">
            <h1 class="text-xl text-center sm:text-2xl sm:my-10 my-8">Importar Artigos</h1>

            <form class="m-auto my-8 w-full flex flex-1 flex-col gap-4 max-w-96">
                <div>
                    <label
                        for="file"
                        class="w-full border-2 border-dashed border-light-500 flex items-center justify-center flex-col h-28 cursor-pointer text-light-600"
                    >
                        <span class="material-symbols-outlined text-4xl mt-4"> attach_file </span>
                        {{ currentFileName }}
                    </label>
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
                    :disabled="!isValidFile"
                    @click="uploadFile"
                >
                    Importar
                </button>
            </form>
        </div>
    </section>
</template>
