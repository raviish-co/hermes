<script lang="ts" setup>
import { ImportService } from "~/lib/frontend/services/upload_service";

const service = new ImportService();
function importItems(formData: FormData) {
    service
        .importItems(formData)
        .then((res) => alert(res.message))
        .catch((err) => alert(err.statusMessage));
}
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">Importar Artigos</h1>
        <UploadFile @import-file="importItems($event!)" />
    </section>
</template>
