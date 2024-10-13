<script setup lang="ts">
import { AuthService } from "@frontend/services/auth_service";

type LoginError = {
    username?: string;
    password?: string;
    message?: string;
};

const username = ref<string>("");
const password = ref<string>("");
const error = ref<LoginError>({});

const service = new AuthService();

async function authenticate() {
    if (!validateForm(username.value, password.value)) {
        return;
    }

    const voidOrErr = await service.authenticate(username.value, password.value);

    if (voidOrErr) {
        error.value.message = voidOrErr.message
        return
    }

    error.value = {}

}

function validateForm(username: string, password: string) {
    error.value = {};

    if (!username) {
        error.value.username = "Indique o nome de utilizador";
    }

    if (!password) {
        error.value.password = "Indique a palavra-passe";
    }

    if (username && password) {
        error.value = {};
        return true;
    }

    return false;
}
</script>
<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <h2 class="mt-32 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Iniciar sessão
        </h2>
        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="text-red-500 mt-1 text-center mb-4" v-if="error.message">
                {{ error.message }}
            </div>
            <form class="space-y-6">
                <div>
                    <div class="mt-2">
                        <input
                            placeholder="Nome de utilizador"
                            class="input-field"
                            v-model="username"
                        />
                    </div>
                    <div class="text-red-500 text-sm mt-1" v-if="error.username">
                        {{ error.username }}
                    </div>
                </div>

                <div>
                    <div class="mt-2">
                        <input
                            type="password"
                            autocomplete="current-password"
                            class="input-field"
                            placeholder="Palavra-passe"
                            required
                            v-model="password"
                        />
                    </div>
                    <div class="text-red-500 text-sm mt-1" v-if="error.password">
                        {{ error.password }}
                    </div>
                </div>

                <button type="button" class="btn btn-secondary" @click="authenticate">
                    Entrar
                </button>
            </form>
        </div>
    </div>
</template>
