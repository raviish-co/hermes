<script lang="ts" setup>
interface Props {
    id?: string;
    isInvalid?: boolean;
}
interface Emit {
    (e: "uploaded", file: File | null): void;
}

defineProps<Props>();
const emits = defineEmits<Emit>();
const currentFileName = ref<string>("");

function uploadFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0] as File;

    if (!file) {
        currentFileName.value = "";
        emits("uploaded", null);
        return;
    }

    currentFileName.value = file.name;
    emits("uploaded", file);
}
</script>

<template>
    <div>
        <div class="flex flex-1">
            <label :for="id ?? 'file'" class="flex items-center justify-center border">
                <span class="material-symbols-outlined text-3xl text-light-600 cursor-pointer">
                    attach_file
                </span>
            </label>

            <span
                class="input-field overflow-hidden truncate text-light-600 text-sm"
                :class="{ invalid: isInvalid }"
                >{{ currentFileName }}</span
            >
        </div>

        <input
            type="file"
            :id="id ?? 'file'"
            accept="text/csv"
            class="hidden"
            @change="uploadFile"
        />
    </div>
</template>
