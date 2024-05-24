<script setup lang="ts">
import { ImportService } from "~/lib/frontend/services/upload_service";

const service = new ImportService();

function importFile(formData: FormData) {
    service
        .importItems(formData)
        .then((res) => alert(res.message))
        .catch((err) => alert(err.statusMessage));
}
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">Importar Stock</h1>
        <UploadFile @import-file="importFile($event!)" />
    </section>
</template>
