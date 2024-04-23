<script setup lang="ts">
interface Props {
    oldTags?: string[];
}

interface Emits {
    (e: "tags", value: string[]): void;
}

const tag = ref<string>("");
const newTags = ref<string[]>([]);

const result = computed(() => {
    if (props.oldTags) newTags.value = [...props.oldTags];
    return newTags.value;
});

function add(value: string) {
    if (!value) return;

    emits("tags", newTags.value);

    newTags.value.push(value);

    tag.value = "";
}

function remove(index: number) {
    newTags.value.splice(index, 1);

    emits("tags", newTags.value);
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<template>
    <div class="input-tags">
        <div class="flex flex-wrap gap-2 p-0" :class="{ 'p-2': result.length > 0 }">
            <span
                v-for="(tag, idx) in result"
                class="badge-light cursor-pointer"
                @click="remove(idx)"
            >
                {{ tag }}
            </span>
        </div>
        <input
            class="w-full border-0 bg-transparent focus:ring-0 focus:border-primary"
            placeholder="Tags para o artigo"
            v-model="tag"
            @keypress.enter="add(tag)"
        />
    </div>
</template>
