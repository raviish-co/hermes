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
    <dialog ref="dialogRef" class="m-auto py-8 px-6 rounded relative">
        <div class="flex flex-col items-center gap-8">
            <h2 class="font-bold text-xl">{{ title }}</h2>
            <span @click="close" class="cursor-pointer absolute top-4 right-8">X</span>

            <VInput class="max-w-sm" placeholder="Pesquisar por Nome ou ID" />

            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Variação</th>
                        <th>Item da Variação</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>12345</td>
                        <td>Adams Family Thing hand / Mão [Cor: Bege]</td>
                        <td>
                            <select>
                                <option>Cor</option>
                            </select>
                        </td>
                        <td>
                            <select>
                                <option>Bege</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <p>Paginação</p>
        </div>
    </dialog>
</template>
