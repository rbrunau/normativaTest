<script setup lang="ts">
const { t } = useI18n();

const localePath = useLocalePath();
</script>

<template>
    <Title>{{ t('meta.title') }}</Title>
    <section class="flex h-screen">
        <main
            class="rounded-xl bg-black/60 inline-flex flex-col p-10 m-auto border border-gray-600">
            <h1 class="text-xl font-semibold">
                Canal de Denuncias de Aragonesa de Legislación y Acreditación
                Sociedad Limitada
            </h1>
            <div class="m-auto mt-8 space-x-4">
                <UButton
                    :to="localePath('report')"
                    size="xl"
                    variant="outline"
                    icon="i-heroicons-arrow-down-tray-solid">
                    Presentar una denuncia
                </UButton>
                <UButton
                    :to="localePath('query')"
                    size="xl"
                    variant="outline"
                    icon="i-heroicons-information-circle-solid">
                    Consultar estado denuncia
                </UButton>
            </div>
        </main>
    </section>
</template>

<i18n lang="json">
{
    "en": {
        "meta": {
            "title": "Home"
        }
    },

    "es": {
        "meta": {
            "title": "Inicio"
        }
    }
}
</i18n>
