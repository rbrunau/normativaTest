<script setup>

/**
 * 
 * 
 * TODO: Hay que crear el layout vacío para las páginas de login/password-reset/etc
 * 
 */

const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true,
});
</script>

<template>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
        <Head>
            <template v-for="link in head.link" :key="link.id">
                <Link
                    :id="link.id"
                    :rel="link.rel"
                    :href="link.href"
                    :hreflang="link.hreflang" />
            </template>
            <template v-for="meta in head.meta" :key="meta.id">
                <Meta
                    :id="meta.id"
                    :property="meta.property"
                    :content="meta.content" />
            </template>
        </Head>
        <Body>
            <main class="min-h-screen bg-gray-900">
                <NuxtPage />
            </main>
            <footer>
                <layout-footer />
            </footer>
        </Body>
    </Html>
</template>
