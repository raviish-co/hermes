<script lang="ts" setup>
import { NuxtLink } from "#components";
import { ref } from "vue";

const visibility = ref<boolean>(false);
const auth = useAuth();

function logout() {
    toggleMenu();

    auth.logout();
}

function toggleMenu() {
    visibility.value = !visibility.value;
}

onMounted(async () => {
    await auth.checkAuth();
});
</script>

<template>
    <section class="h-screen flex flex-col">
        <div
            class="w-full h-20 sm:h-24 py-4 bg-primary flex justify-center items-center fixed z-50"
        >
            <span
                class="material-symbols-outlined absolute text-white text-3xl my-auto left-8 cursor-pointer"
                v-if="auth.isAuthenticated.value"
                @click="toggleMenu"
            >
                menu
            </span>

            <div class="w-full h-20 sm:h-24 py-4 bg-primary flex justify-center items-center">
                <NuxtLink to="/" class="h-16">
                    <img src="/images/logo.png" alt="Logotipo da Raviish" class="h-full" />
                </NuxtLink>
            </div>
        </div>

        <main class="mt-24">
            <section class="pb-[7.25rem] md:pb-0">
                <slot />
            </section>
        </main>

        <div
            class="z-50 fixed shadow-lg bottom-0 bg-white flex text-sm w-4/5 min-w-52 sm:w-80 h-screen flex-col justify-start items-start p-0 top-0"
            :class="{ hidden: !visibility }"
        >
            <div class="w-full h-24 bg-primary relative">
                <span
                    class="material-symbols-outlined text-white absolute top-6 right-6 cursor-pointer"
                    @click="toggleMenu"
                >
                    close
                </span>
            </div>

            <div v-if="auth.isAuthenticated.value" class="flex flex-col w-full">
                <NuxtLink to="/" class="nuxt-link">
                    <span class="material-symbols-outlined text-xl"> dashboard </span>
                    <span>Dashboard</span>
                </NuxtLink>

                <NuxtLink to="/goods-issues" class="nuxt-link">
                    <span class="material-symbols-outlined text-xl"> shopping_cart_checkout </span>
                    <span>Guias de saída</span>
                </NuxtLink>

                <NuxtLink to="/goods-receipts/" class="nuxt-link">
                    <span class="material-symbols-outlined text-xl"> add_shopping_cart </span>
                    <span>Guia de entrada</span>
                </NuxtLink>

                <NuxtLink to="/items/upload" class="nuxt-link">
                    <span class="material-symbols-outlined text-xl"> upload </span>
                    <span>Importar artigos</span>
                </NuxtLink>

                <NuxtLink to="/goods-receipts/upload/" class="nuxt-link">
                    <span class="material-symbols-outlined text-xl"> upload </span>
                    <span>Importar stock</span>
                </NuxtLink>

                <NuxtLink to="/items" class="nuxt-link">
                    <span class="material-symbols-outlined text-xl"> add_box </span>
                    <span>Artigos</span>
                </NuxtLink>

                <NuxtLink to="/categories" class="nuxt-link">
                    <span class="material-symbols-outlined"> category </span>
                    <span>Categorias</span>
                </NuxtLink>

                <NuxtLink class="nuxt-link cursor-pointer" @click="logout()">
                    <span class="material-symbols-outlined"> logout </span>
                    <span>Sair</span>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
