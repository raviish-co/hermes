<script setup lang="ts">
import { ImportService } from "@frontend/services/upload_service";
import { handleError } from "@frontend/utils/error_handler";

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
        .catch((err) =>
            handleError(
                err,
                "importFile",
                "Não foi possivel importar o stock. Tente novamente mais tarde."
            )
        );
}
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">Importar Stock</h1>
        <UploadFile @import-file="importFile($event!)" />
    </section>
</template>
