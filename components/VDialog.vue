<script setup lang="ts">
interface Props {
    title: string;
}

const dialogRef = ref<HTMLDialogElement>();

function show() {
    dialogRef.value?.showModal();
}

function close() {
    dialogRef.value?.close();
}

defineProps<Props>();
defineExpose({ show, close });
</script>

<template>
    <dialog ref="dialogRef" class="m-auto py-8 px-6 relative w-full">
        <div class="flex flex-col items-center gap-8">
            <h2 class="font-medium text-lg">{{ title }}</h2>
            <span @click="close" class="cursor-pointer absolute top-4 right-8">X</span>

            <slot />
        </div>
    </dialog>
</template>
