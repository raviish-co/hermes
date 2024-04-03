<script setup lang="ts">
interface Emits {
    (e: "add"): void;
    (e: "clearLines"): void;
}

interface Props {
    showButtons?: boolean;
}

withDefaults(defineProps<Props>(), {
    showButtons: true,
});

defineEmits<Emits>();
</script>
<template>
    <div class="pb-24 sm:pb-5 md:pb-[4.5rem]">
        <div class="table-container p-3 border border-light-500 overflow-hidden">
            <div v-if="showButtons" class="flex items-center w-full">
                <span
                    class="material-symbols-outlined hover:text-secondary-600 cursor-pointer"
                    @click="$emit('add')"
                >
                    add
                </span>

                <span
                    class="hover:text-red-500 hover:bg-red-500 hover:bg-opacity-10 cursor-pointer p-2 ml-auto"
                    @click="$emit('clearLines')"
                >
                    Limpar
                </span>
            </div>

            <slot />
        </div>
    </div>
</template>
