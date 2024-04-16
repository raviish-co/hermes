<script setup lang="ts">
const catalog = useCatalog();

onMounted(async () => {
    catalog.listCategories();
    catalog.listVariations();
});
</script>

<template>
    <div class="section-content">
        <h1 class="page-title">Categorias</h1>
        <div class="table-container overflow-y-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th class="min-w-40 w-40">ID</th>
                        <th class="min-w-40 w-40 text-left">Nome</th>
                        <th class="min-w-40 w-40 text-left">Variações</th>
                        <th class="min-w-40 w-40 text-left">Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="category in toValue(catalog.categories)"
                        :key="category.categoryId"
                        class="text-center"
                    >
                        <td>{{ category.categoryId }}</td>
                        <td class="text-left">{{ category.name }}</td>
                        <td class="text-left">
                            <div class="flex flex-wrap gap-2">
                                <span
                                    v-for="variation in catalog.filterVariations(
                                        category.variationsIds
                                    )"
                                    :key="variation.variationId"
                                >
                                    <span class="badge-light">{{ variation.name }} <br /></span>
                                </span>
                            </div>
                        </td>
                        <td class="text-left">{{ category.description }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <NuxtLink :to="{ path: '/categories/register' }">
            <button class="btn-circle mt-8 ml-auto block">
                <span class="material-symbols-outlined">add</span>
            </button>
        </NuxtLink>
    </div>
</template>
