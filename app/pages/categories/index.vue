<script setup lang="ts">
import CreateButton from "~/components/CreateButton.vue";

const catalog = useCatalog();
const auth = useAuth();

onMounted(async () => {
    await auth.checkAuth();
    catalog.listCategories();
    catalog.listVariations();
});
</script>

<template>
    <div class="section-content">
        <h1 class="page-title">Categorias</h1>

        <CreateButton path="/categories/register" title="Criar" />

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

            <p v-if="catalog.categories.value.length === 0" class="pt-10 text-gray-500 text-center">
                Não existem categorias no momento. Crie uma nova
            </p>
        </div>
    </div>
</template>
