<script lang="ts" setup>
defineProps<{
    path: string;
    title: string;
}>();
</script>
<template>
    <div class="flex justify-end">
        <NuxtLink :to="{ path: path }" class="btn-add">
            <span>{{ title }}</span> <span class="text-base">+</span>
        </NuxtLink>
    </div>
</template>
