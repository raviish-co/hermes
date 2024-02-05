<script setup lang="ts">
interface Props {
    title: string;
}

defineProps<Props>();

const dialogRef = ref<HTMLDialogElement>();

function show() {
    dialogRef.value?.showModal();
}

function close() {
    dialogRef.value?.close();
}

defineExpose({ show, close });
</script>

<template>
    <dialog ref="dialogRef" class="m-auto p-4 w-full bg-transparent fixed">
        <div class="bg-white py-8 px-6 flex flex-col items-center gap-8">
            <h2 class="font-medium text-lg">{{ title }}</h2>
            <span @click="close" class="cursor-pointer absolute top-8 right-8">X</span>

            <slot />
        </div>
    </dialog>
</template>
