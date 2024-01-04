<script setup lang="ts">
import { PURPOSES } from "~/lib/data/purposes";
</script>

<template>
    <div class="w-full h-36 bg-slate-600"></div>
    <section class="section-content">
        <section class="flex items-center mb-11 mt-4">
            <h1 class="flex-1 text-center">Guia de Saída de Artigos</h1>
            <span class="text-2xl cursor-pointer">...</span>
        </section>
        <section>
            <form class="mb-6">
                <div class="flex items-center gap-x-3 mb-4">
                    <input placeholder="Jonh  Doe" disabled class="input-field" />
                    <input
                        type="date"
                        placeholder="Data prevista para a devolução[dd/mm/aaaa]"
                        required
                        class="input-field"
                    />
                </div>
                <div class="flex items-center gap-x-3 mb-4">
                    <VSelect placeholder="Finalidade" :options="PURPOSES" />
                    <VSelect placeholder="Secção" :options="[]" />
                </div>
                <input placeholder="Descrição" class="input-field" />
            </form>
        </section>
        <section>
            <div
                class="h-72 p-2 flex flex-col justify-between border border-gray-500 rounded overflow-hidden"
            >
                <div class="flex-1 overflow-y-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Item</th>
                                <th>QTD</th>
                                <th>Preço por unidade</th>
                                <th>Total</th>
                                <th>Caução</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>XPTO</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button class="btn w-full">Adicionar</button>
            </div>

            <p class="text-right space-x-1 mt-4">
                <span class="font-bold">Total:</span>
                <span>10.000,00</span>
            </p>
        </section>
        <div class="space-x-4">
            <button class="btn">Solicitar</button>
            <button class="btn">Cancelar</button>
        </div>
    </section>
</template>
