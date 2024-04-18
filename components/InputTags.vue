<script setup lang="ts">
interface Props {
    tags: string[];
}

const tag = ref<string>("");

function addTag() {
    if (!tag.value) return;

    props.tags.push(tag.value);
    tag.value = "";
}

function removeTag(index: number) {
    props.tags.splice(index, 1);
}

const props = defineProps<Props>();
</script>

<template>
    <div class="input-tags">
        <div
            class="flex flex-wrap gap-2"
            :class="{
                'p-0': tags.length === 0,
                'p-2': tags.length > 0,
            }"
        >
            <span
                v-if="tags"
                v-for="(tag, idx) in tags"
                class="badge-light cursor-pointer"
                @click="removeTag(idx)"
            >
                {{ tag }}
            </span>
        </div>
        <input
            class="w-full border-0 bg-transparent focus:ring-0 focus:border-primary"
            placeholder="Tags para o artigo"
            v-model="tag"
            @keypress.enter="addTag()"
        />
    </div>
</template>
