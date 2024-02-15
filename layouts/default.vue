<script lang="ts" setup>
import { ref } from "vue";

const menuVisibility = ref<boolean>(false);

function toggleMenu() {
    menuVisibility.value = !menuVisibility.value;
}
</script>

<template>
    <section class="h-screen flex flex-col">
        <div class="w-full h-20 sm:h-24 py-4 bg-primary flex justify-center items-center relative">
            <span
                class="material-symbols-outlined absolute hidden md:inline-block text-white text-3xl my-auto left-8 cursor-pointer"
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

        <main class="h-full">
            <section class="pb-[7.25rem] md:pb-0">
                <slot />
            </section>
        </main>

        <div
            class="z-50 fixed bottom-0 bg-white p-4 w-full flex gap-4 items-center justify-between text-sm md:fixed md:w-80 md:h-screen md:flex-col md:justify-start md:items-start md:p-0 md:top-0 menu-shadow"
            :class="{ 'md:hidden': !menuVisibility }"
        >
            <div class="w-full h-24 bg-primary relative hidden md:inline-block">
                <span
                    class="material-symbols-outlined text-white absolute top-6 right-6 cursor-pointer"
                    @click="toggleMenu"
                >
                    close
                </span>
            </div>

            <NuxtLink
                to="/"
                class="flex flex-col gap-3 items-center flex-1 md:flex-initial md:flex-row md:hover:bg-black md:hover:text-white md:w-full"
            >
                <span
                    class="material-symbols-outlined text-xl h-12 w-12 flex items-center justify-center text-white bg-primary rounded-full md:bg-transparent md:text-inherit"
                >
                    shopping_cart_checkout
                </span>
                <span>Guia de saída</span>
            </NuxtLink>

            <NuxtLink
                to="/upload_item"
                class="flex flex-col gap-3 items-center flex-1 md:flex-initial md:flex-row md:hover:bg-black md:hover:text-white md:w-full"
            >
                <span
                    class="material-symbols-outlined text-xl h-12 w-12 flex items-center justify-center text-white bg-primary rounded-full md:bg-transparent md:text-inherit"
                >
                    upload
                </span>
                <span>Importar</span>
            </NuxtLink>
        </div>
    </section>
</template>
