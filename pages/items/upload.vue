<script lang="ts" setup>
import { ImportService } from "~/lib/frontend/services/upload_service";
import { handleError } from "~/lib/frontend/utils/error_handler";

const service = new ImportService();
function importItems(formData: FormData) {
    service
        .importItems(formData)
        .then((res) => alert(res.message))
        .catch((err) =>
            handleError(
                err,
                "importItems",
                "Não foi possivel importar os artigos. Tente novamente mais tarde."
            )
        );
}
</script>

<template>
    <section class="section-content">
        <h1 class="page-title">Importar Artigos</h1>
        <UploadFile @import-file="importItems($event!)" />
    </section>
</template>
