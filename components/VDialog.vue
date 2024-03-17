<script setup lang="ts">
const dialogRef = ref<HTMLDialogElement>();

function show() {
    dialogRef.value?.showModal();
}

function close() {
    dialogRef.value?.close();
}

defineProps<{ title: string }>();
defineExpose({ show, close });
</script>

<template>
    <dialog ref="dialogRef" class="w-full m-auto bg-white px-6 py-8">
        <div class="space-y-8">
            <div class="flex justify-between items-center">
                <h2 class="font-medium text-lg">{{ title }}</h2>
                <span class="material-symbols-outlined cursor-pointer" @click="close">close</span>
            </div>
            <slot />
        </div>
    </dialog>
</template>
