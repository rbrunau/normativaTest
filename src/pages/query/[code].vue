<script setup lang="ts">
import type { Complaint } from '@/types';

const { t } = useI18n();
const { readItem } = useDirectusItems();

const toast = useToast();
const localePath = useLocalePath();
const queryStore = useQueryComplaintStore();

const { data: complaintQuery, refresh: refreshComplaint } = await useAsyncData(
    () =>
        readItem('complaints' as never, queryStore.$state.complaint_id!, {
            fields: ['*.*'],
            nuxtData: false,
        })
);

const complaint: Complaint | null = complaintQuery.value;

/**
 * Tab
 */

const tabs = [
    {
        key: 'info',
        label: t('tabs.info.label'),
        icon: 'i-heroicons-information-circle',
    },
    {
        key: 'complaint',
        label: t('tabs.complaint.label'),
        icon: 'i-heroicons-document',
    },
    {
        key: 'resolution',
        label: t('tabs.resolution.label'),
        icon: 'i-heroicons-document-check',
    },
    {
        key: 'record',
        label: t('tabs.record.label'),
        icon: 'i-heroicons-clock',
    },
];

/**
 *
 * Format fields
 *
 */
const formatDate = (input: string, include_hour: boolean) => {
    const date = new Date(input);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    let formatted_date = `${day}/${month}/${year}`;

    if (include_hour) {
        formatted_date = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    return formatted_date;
};

const formatSerious = (input: boolean) => {
    let formatted_serious = 'Normal';

    if (input) {
        formatted_serious = 'Grave';
    }

    return formatted_serious;
};

const formatState = (input: string) => {
    let label = 'Abierta';

    switch (input) {
        case 'validated':
            label = 'Validada';
            break;
        case 'not_validated':
            label = 'No validada';
            break;
        case 'investigating':
            label = 'Investigando';
            break;
        case 'resolved':
            label = 'Resulta';
            break;
        case 'closed':
            label = 'Cerrada';
            break;
    }

    return label;
};

/**
 * Methods
 */

const goQueryPage = () => {
    navigateTo(localePath('query'));
};

const closeComplaint = () => {
    queryStore.setComplaintCode(undefined);
    queryStore.setComplaintID(undefined);
    queryStore.setResult(false);

    toast.add({
        title: 'Correcto',
        icon: 'i-heroicons-check-16-solid',
        description: 'Se ha cerrado su denuncia',
        color: 'green',
        timeout: 2000,
        callback: goQueryPage,
    });
};

/**
 * Page utils
 */
definePageMeta({
    middleware: 'complaint-password',
});

defineI18nRoute({
    paths: {
        en: '/query/[code]',
        es: '/consultar/[code]',
    },
});
</script>

<template>
    <Title>{{ t('meta.title') }}</Title>
    <section class="flex h-screen p-12 pt-24">
        <ClientOnly>
            <main
                v-if="complaint"
                class="rounded-xl bg-black/60 inline-flex flex-col w-full h-full p-10 m-auto border border-gray-600">
                <div class="relative flex mb-8">
                    <h1 class="mx-auto text-xl font-semibold text-center">
                        Consultar denuncia
                        <span class="text-primary-500">
                            {{ complaint.code }}
                        </span>
                    </h1>
                    <div class="absolute right-0 my-auto space-x-3">
                        <UButton
                            icon="i-heroicons-document-arrow-down-solid"
                            color="black"
                            variant="solid">
                            Descargar
                        </UButton>
                        <UButton
                            @click="closeComplaint"
                            icon="i-heroicons-x-circle-16-solid"
                            color="primary"
                            variant="solid">
                            Cerrar denuncia
                        </UButton>
                    </div>
                </div>
                <div
                    class="inline-flex w-full h-full pt-8 mx-auto border-t border-gray-600">
                    <UTabs :items="tabs" class="w-full max-w-4xl mx-auto">
                        <template #item="{ item }">
                            <div
                                v-if="item.key === 'info'"
                                class="inline-flex py-8 mt-8 w-full divide-x divide-gray-600">
                                <div class="w-full space-y-6 py-4 px-8">
                                    <div
                                        class="w-full flex max-w-xs items-center justify-between mb-4">
                                        <label
                                            class="text-lg font-semibold leading-none text-gray-400">
                                            Recibida:
                                        </label>
                                        <UBadge
                                            class="w-44"
                                            color="gray"
                                            size="lg"
                                            variant="solid">
                                            {{
                                                formatDate(
                                                    complaint.date_created,
                                                    true
                                                )
                                            }}
                                        </UBadge>
                                    </div>
                                    <div
                                        class="w-full flex max-w-xs items-center justify-between mb-4">
                                        <label
                                            class="text-lg font-semibold leading-none text-gray-400">
                                            Vencimiento:
                                        </label>
                                        <UBadge
                                            class="w-44"
                                            color="gray"
                                            size="lg"
                                            variant="solid">
                                            {{
                                                formatDate(
                                                    complaint.end_date,
                                                    false
                                                )
                                            }}
                                        </UBadge>
                                    </div>
                                    <div
                                        class="w-full flex max-w-xs items-center justify-between mb-4">
                                        <label
                                            class="text-lg font-semibold leading-none text-gray-400">
                                            Nivel:
                                        </label>
                                        <UBadge
                                            class="w-44"
                                            color="primary"
                                            size="lg"
                                            variant="solid">
                                            <span class="w-full text-center">
                                                {{
                                                    formatSerious(
                                                        complaint.serious
                                                    )
                                                }}
                                            </span>
                                        </UBadge>
                                    </div>
                                    <div
                                        class="w-full flex max-w-xs items-center justify-between mb-4">
                                        <label
                                            class="text-lg font-semibold leading-none text-gray-400">
                                            Estado:
                                        </label>
                                        <UBadge
                                            class="w-44"
                                            color="black"
                                            size="lg"
                                            variant="solid">
                                            <span class="w-full text-center">
                                                {{
                                                    formatState(complaint.state)
                                                }}
                                            </span>
                                        </UBadge>
                                    </div>
                                </div>
                                <div class="w-full py-4 px-8">
                                    <h3
                                        class="text-primary-500 text-lg font-semibold">
                                        <UIcon
                                            name="i-heroicons-chat-bubble-left-right-solid"
                                            class="mr-2"
                                            color="primary" />
                                        <span class="text-white">
                                            {{
                                                t('tabs.info.content.messages')
                                            }}
                                        </span>
                                    </h3>
                                </div>
                            </div>

                            <div
                                v-if="item.key === 'complaint'"
                                class="inline-flex py-8 mt-8"></div>

                            <div
                                v-if="item.key === 'resolution'"
                                class="inline-flex py-8 mt-8"></div>

                            <div
                                v-if="item.key === 'record'"
                                class="inline-flex py-8 mt-8"></div>
                        </template>
                    </UTabs>
                </div>
            </main>
        </ClientOnly>
    </section>
</template>

<i18n lang="json">
{
    "en": {
        "meta": {
            "title": "Query complaint"
        },
        "card": {
            "title": "Complaint code"
        },
        "tabs": {
            "info": {
                "label": "Information",
                "content": {
                    "messages": "Mensajes",
                    "recieved": "Received:",
                    "end_date": "End date:",
                    "level": "Nivel:",
                    "state": "State:"
                }
            },
            "complaint": { "label": "Your complaint", "content": {} },
            "resolution": { "label": "Resolution", "content": {} },
            "record": { "label": "History", "content": {} }
        }
    },

    "es": {
        "meta": {
            "title": "Consultar denuncia"
        },
        "card": {
            "title": "Consultar denuncia"
        },
        "tabs": {
            "info": {
                "label": "Información",
                "content": {
                    "messages": "Mensajes",
                    "recieved": "Recibido:",
                    "end_date": "Vencimiento:",
                    "level": "Mivel:",
                    "state": "Estado:"
                }
            },
            "complaint": { "label": "Información", "content": {} },
            "resolution": { "label": "Resolución", "content": {} },
            "record": { "label": "Historial", "content": {} }
        }
    }
}
</i18n>
