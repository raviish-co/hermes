<script setup lang="ts">
interface Emits {
    (e: "add"): void;
    (e: "clearLines"): void;
}

defineEmits<Emits>();
defineProps(["note", "isReturned"]);
</script>
<template>
    <div class="pb-24 sm:pb-5 md:pb-[4.5rem]">
        <div class="table-container">
            <div class="flex items-center w-full" v-if="!isReturned">
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
