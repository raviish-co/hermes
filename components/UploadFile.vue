<script setup lang="ts">
const fileName = ref<string>("Selecione o ficheiro CSV");
const isValidFile = computed(() => formData.value !== undefined);
const formData = ref<FormData>();

interface Emits {
    (e: "import-file", formData?: FormData): void;
}

function uploadFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0] as File;

    if (!file) {
        formData.value = undefined;
        fileName.value = "Selecione o ficheiro CSV";
        return;
    }

    formData.value = new FormData();
    formData.value.append("file", file);
    fileName.value = file.name;
}

defineEmits<Emits>();
</script>

<template>
    <div class="m-auto my-8 w-full flex flex-1 flex-col gap-4 max-w-96">
        <div>
            <label
                for="file"
                class="w-full border-2 border-dashed border-light-500 flex items-center justify-center flex-col h-28 cursor-pointer text-light-600"
            >
                <span class="material-symbols-outlined text-4xl mt-4"> attach_file </span>
                {{ fileName }}
            </label>
            <input type="file" id="file" accept="text/csv" class="hidden" @change="uploadFile" />
        </div>

        <button
            type="button"
            class="btn btn-secondary"
            :disabled="!isValidFile"
            @click="$emit('import-file', formData)"
        >
            Importar
        </button>
    </div>
</template>
