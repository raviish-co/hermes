<script lang="ts" setup>
import { ImportService } from "@frontend/services/upload_service";
import { handleError } from "@frontend/utils/error_handler";

const service = new ImportService();
function importItems(formData: FormData) {
    service.importItems(formData).then((res) => {
        if (res.isLeft()) {
            handleError(res.value, "importItems");
            return;
        }
        alert(res.value.message);
    });
}
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">Importar Artigos</h1>
        <UploadFile @import-file="importItems($event!)" />
    </section>
</template>
