<script lang="ts" setup>
import { ImportService } from "~/lib/frontend/services/upload_service";

const service = new ImportService();
function importItems(formData: FormData) {
    service
        .importItems(formData)
        .then((res) => alert(res.message))
        .catch((err) => {
            if (err.statusCode === 500) {
                alert("Não foi possivel importar os artigos. Tente novamente mais tarde.");
                console.error("Erro ao importar os artigos:", err);
                return;
            }

            alert(err.statusMessage);
            console.error("Erro ao importar os artigos:", err);
        });
}
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">Importar Artigos</h1>
        <UploadFile @import-file="importItems($event!)" />
    </section>
</template>
