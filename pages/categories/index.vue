<script setup lang="ts">
import { CatalogService } from "~/lib/frontend/services/catalog_service";
import type { CategoryModel } from "~/lib/frontend/models/category";

const categories = ref<CategoryModel[]>([]);

const service = new CatalogService();

onMounted(async () => {
    categories.value = await service.listCategories();
});
</script>

<template>
    <div class="section-content">
        <h1 class="page-title">Categorias</h1>
        <div class="table-container overflow-y-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th class="min-w-20 w-20">ID</th>
                        <th class="min-w-60 w-60 text-left">Descrição</th>
                        <th class="min-w-40 w-40"></th>
                        <th class="min-w-40 w-40"></th>
                        <th class="min-w-40 w-40"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="category in categories"
                        :key="category.categoryId"
                        class="text-center"
                    >
                        <td>{{ category.categoryId }}</td>
                        <td class="text-left">{{ category.name }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
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
