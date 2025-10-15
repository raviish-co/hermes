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
const sentStatus = ref<boolean>(false);
const authMode = ref<"Otp" | "Default">("Otp");

const service = new AuthService();

async function authenticate() {
    if (!validateForm(username.value, password.value)) {
        return;
    }

    const voidOrErr = await service.authenticate(username.value, password.value, authMode.value);

    if (voidOrErr) {
        error.value.message = voidOrErr.message;
        return;
    }

    error.value = {};
}

async function sendOTP() {
    const voidOrErr = await service.generateOtp(username.value);

    if (voidOrErr) {
        error.value.message = voidOrErr.message;
        sentStatus.value = false;
        return;
    }

    error.value = {};
    sentStatus.value = true;
}

function login() {
    if (authMode.value === "Default") {
        return authenticate();
    }
    return sendOTP();
}

function changeAuthMode() {
    password.value = "";
    authMode.value = authMode.value === "Otp" ? "Default" : "Otp";
}

function cancel() {
    username.value = "";
    password.value = "";
    sentStatus.value = false;
    error.value = {};
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
    <div class="h-screen -mt-24 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="mt-16 sm:mx-auto sm:w-full sm:max-w-md border px-8 py-16 shadow-sm">
            <div v-if="!sentStatus" class="space-y-6">
                <h2 class="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Iniciar sessão
                </h2>
                <form class="space-y-6">
                    <p class="text-sm text-gray-500 mt-4">
                        Digite o seu utilizador para receber o código de autenticação
                    </p>
                    <div class="text-red-500 mt-1 text-center mb-4" v-if="error.message">
                        {{ error.message }}
                    </div>
                    <div>
                        <input placeholder="Utilizador" class="input-field" v-model="username" />
                    </div>
                    <div class="text-red-500 text-sm mt-1" v-if="error.username">
                        {{ error.username }}
                    </div>

                    <div v-if="authMode === 'Default'">
                        <input
                            :type="authMode === 'Default' ? 'password' : 'text'"
                            placeholder="Palavra-passe"
                            class="input-field"
                            v-model="password"
                        />
                    </div>
                    <div
                        class="text-red-500 text-sm mt-1"
                        v-if="error.password && authMode === 'Default'"
                    >
                        {{ error.password }}
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">
                            Iniciar sessão com o nome de utilizador e palavra-passe
                            <input type="checkbox" class="w-4 h-4 ml-1" @change="changeAuthMode" />
                        </p>
                    </div>
                    <button type="button" class="btn btn-secondary" @click="login()">Entrar</button>
                </form>
            </div>
            <div v-else class="space-y-6">
                <div class="text-center">
                    <span class="material-symbols-outlined text-3xl sm:text-6xl m-4"> sms </span>
                </div>

                <h2
                    class="mt-32 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
                >
                    Código de verificação
                </h2>

                <p class="text-gray-500 text-center">
                    Enviamos o código de verificação para o seu contacto
                </p>

                <div>
                    <input
                        placeholder="Código de verificação"
                        class="input-field"
                        v-model="password"
                    />
                </div>

                <p class="text-gray-500">
                    Se não recebeu o código? clique em
                    <button
                        class="text-secondary-600 underline font-medium"
                        type="button"
                        @click="sendOTP()"
                    >
                        Reenviar
                    </button>
                </p>

                <button type="button" class="btn btn-secondary" @click="authenticate()">
                    Vericar
                </button>

                <button type="button" class="btn bg-primary" @click="cancel()">Cancelar</button>
            </div>
        </div>
    </div>
</template>
