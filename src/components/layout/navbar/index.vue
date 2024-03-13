<script setup lang="ts">
const localePath = useLocalePath();
const { t } = useI18n();

const navbar_links = [
    {
        label: t('navbar_links.home'),
        to: localePath('index'),
    },
    {
        label: 'Presentar denuncia',
        to: localePath('report'),
    },
    {
        label: 'Consultar denuncia',
        to: localePath('query'),
    },
];

onMounted(() => {
    const nav = document.querySelector('#navbar');

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 50) {
            nav?.classList.add('bg-black/20', 'backdrop-blur');
        } else {
            nav?.classList.remove('bg-black/20', 'backdrop-blur');
        }
    });
});
</script>

<template>
    <nav id="navbar" class="start-0 fixed top-0 z-20 w-full transition">
        <div
            class="max-w-screen-2xl flex flex-wrap items-center justify-between p-6 mx-auto">
            <NuxtLink
                :to="localePath('index')"
                class="flex items-center space-x-2 text-2xl font-bold">
                <img class="text-primary-500 w-auto h-8" src="/logo.svg" />
                <span>
                    <span class="text-primary-500">Proyecto</span>
                    Normativa
                </span>
            </NuxtLink>
            <button
                data-collapse-toggle="navbarLinks"
                type="button"
                class="md:hidden bg-primary-500 hover:bg-primary-900 inline-flex p-2 text-white rounded-lg"
                aria-controls="navbarLinks"
                aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <UIcon
                    name="i-heroicons-bars-2-16-solid"
                    class="m-auto text-lg"
                    dynamic />
            </button>
            <div class="md:block md:w-auto hidden w-full" id="navbarLinks">
                <ul class="navbar-links">
                    <li v-for="link in navbar_links">
                        <NuxtLink
                            :to="localePath(link.to)"
                            class="navbar-link"
                            aria-current="page">
                            {{ link.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style>
.navbar-links {
    @apply backdrop-blur md:space-x-8 md:flex-row md:bg-transparent md:p-0 md:mt-0 md:border-0 md:space-y-0 transition ease-in-out bg-black/20 flex flex-col mt-4 p-8 font-medium rounded-xl space-y-2;
}

.navbar-link {
    @apply md:p-0 md:bg-transparent bg-red-500/20 block px-3 py-2 text-white rounded md:text-lg font-medium transition ease-in-out;
}

.navbar-link:hover,
.navbar-link.router-link-active {
    @apply md:underline md:underline-offset-4 md:bg-transparent bg-primary-500;
}
</style>

<i18n lang="json">
{
    "en": {
        "navbar_links": {
            "home": "Home"
        }
    },

    "es": {
        "navbar_links": {
            "home": "Inicio"
        }
    }
}
</i18n>
