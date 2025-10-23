<script setup lang="ts">
import { ImportService } from "~/lib/frontend/services/upload_service";

const service = new ImportService();

const auth = useAuth();
const username = ref<string>();

onMounted(async () => {
    await auth.checkAuth();
    username.value = await auth.getUsername();
});

function importFile(formData: FormData) {
    formData.append("username", username.value as string);
    service
        .importItemsStock(formData)
        .then((res) => alert(res.message))
        .catch((err) => {
            if (err.statusCode === 500) {
                alert("Não foi possível importar o stock. Tente novamente mais tarde.");
                console.error("Erro ao importar o stock:", err);
                return;
            }

            alert(err.statusMessage);
            console.error("Erro ao importar o stock:", err);
        });
}
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">Importar Stock</h1>
        <UploadFile @import-file="importFile($event!)" />
    </section>
</template>
