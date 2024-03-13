<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
    layout: 'login',
});

defineI18nRoute({
    paths: {
        en: '/login',
        es: '/login',
    },
});
</script>

<template>
    <Title>{{ t('meta.title') }}</Title>
    <Login />
</template>

<i18n lang="json">
{
    "en": {
        "meta": {
            "title": "Login"
        }
    },

    "es": {
        "meta": {
            "title": "Iniciar sesión"
        }
    }
}
</i18n>
