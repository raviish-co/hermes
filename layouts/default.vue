<script lang="ts" setup>
import { ref } from "vue";

const menuVisibility = ref<boolean>(false);

function toggleMenu() {
    menuVisibility.value = !menuVisibility.value;
}
</script>

<template>
    <section class="h-screen flex flex-col">
        <div
            class="w-full h-20 sm:h-24 py-4 bg-primary flex justify-center items-center fixed z-50"
        >
            <span
                class="material-symbols-outlined absolute text-white text-3xl my-auto left-8 cursor-pointer"
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
            :class="{ hidden: !menuVisibility }"
        >
            <div class="w-full h-24 bg-primary relative">
                <span
                    class="material-symbols-outlined text-white absolute top-6 right-6 cursor-pointer"
                    @click="toggleMenu"
                >
                    close
                </span>
            </div>

            <div class="flex flex-col w-full">
                <NuxtLink to="/goods-issues" class="nuxt-link">
                    <span class="material-symbols-outlined text-xl"> shopping_cart_checkout </span>
                    <span>Guias de saída</span>
                </NuxtLink>

                <NuxtLink to="/goods-receipts/register" class="nuxt-link">
                    <span class="material-symbols-outlined text-xl"> add_shopping_cart </span>
                    <span>Guia de entrada</span>
                </NuxtLink>

                <NuxtLink to="/items/upload" class="nuxt-link">
                    <span class="material-symbols-outlined text-xl"> upload </span>
                    <span>Importar artigos</span>
                </NuxtLink>

                <NuxtLink to="/items" class="nuxt-link">
                    <span class="material-symbols-outlined text-xl"> add_box </span>
                    <span>Artigos</span>
                </NuxtLink>

                <NuxtLink to="/categories" class="nuxt-link">
                    <span class="material-symbols-outlined"> category </span>
                    <span>Categorias</span>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
