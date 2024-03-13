<script setup lang="ts">
import type { Agent } from '@/types';

const { t } = useI18n();
const { readItems } = useDirectusItems();

/**
 *
 * Form Steps
 *
 */

const form_steps = [
    {
        id: 0,
        text: 'Informante',
    },
    {
        id: 1,
        text: 'Datos de la denuncia',
    },
    {
        id: 2,
        text: 'Hechos denunciados',
    },
    {
        id: 3,
        text: ' Documentación adjunta',
    },
    {
        id: 4,
        text: ' Seguimiento',
    },
    {
        id: 5,
        text: ' Finalizar',
    },
];

let selected_step = ref(form_steps[0]);

const selectStep = (step_id: number) => {
    document
        .getElementById(`step-${selected_step.value.id}`)
        ?.classList.add('hidden');

    selected_step.value = form_steps[step_id];

    document
        .getElementById(`step-${selected_step.value.id}`)
        ?.classList.remove('hidden');
};

/**
 *
 * Relation W Company
 *
 */

const available_relationships = [
    {
        label: 'Empled@',
        id: 'employee',
    },
    {
        label: 'Proveedor',
        id: 'supplier',
    },
    {
        label: 'Cliente',
        id: 'customer',
    },
    {
        label: 'Socios',
        id: 'partners',
    },
    {
        label: 'ExEmplead@',
        id: 'exemployee',
    },
    {
        label: 'Otra',
        id: 'other',
    },
];

let selected_relationship = ref();

/**
 *
 * Booleans
 *
 */

let anonComplaint = ref(false);
let areWitnesses = ref(false);
let areEvidences = ref(false);
let acceptedTerms = ref(false);

/**
 *
 * Complaint Category
 *
 */

const { data: complaint_categories, pending: complaint_categories_pending } =
    await useAsyncData(() =>
        readItems('compliant_categories' as never, {
            fields: ['id', 'name'],
            nuxtData: false,
        })
    );

const available_complaint_categories: any = [];

complaint_categories.value.forEach((agent: Agent) => {
    available_complaint_categories.push({
        id: agent.id,
        name: agent.name,
    });
});

let selected_complaint_category = ref();

/**
 *
 * Complaint Workplace
 *
 */

const { data: complaint_workplaces, pending: complaint_workplaces_pending } =
    await useAsyncData(() =>
        readItems('compliant_workplaces' as never, {
            fields: ['id', 'name'],
            nuxtData: false,
        })
    );

const available_complaint_workplaces: any = [
    {
        id: 'undefined',
        name: 'Indiferente',
    },
];

complaint_workplaces.value.forEach((agent: Agent) => {
    available_complaint_workplaces.push({
        id: agent.id,
        name: agent.name,
    });
});

let selected_complaint_workplace = ref(available_complaint_workplaces[0]);

/**
 *
 * Complaint Department
 *
 */

const { data: compliant_departments, pending: compliant_departments_pending } =
    await useAsyncData(() =>
        readItems('compliant_departments' as never, {
            fields: ['id', 'name'],
            nuxtData: false,
        })
    );

const available_complaint_departments: any = [
    {
        id: 'undefined',
        name: 'Indiferente',
    },
];

compliant_departments.value.forEach((agent: Agent) => {
    available_complaint_departments.push({
        id: agent.id,
        name: agent.name,
    });
});

let selected_complaint_department = ref(available_complaint_departments[0]);

/**
 *
 * Agents
 *
 */

const { data: agents, pending: agents_pending } = await useAsyncData(() =>
    readItems('agents' as never, {
        fields: ['id', 'name', 'user_id'],
        nuxtData: false,
    })
);

const available_agents: any = [
    {
        id: 'undefined',
        name: 'Indiferente',
    },
];

agents.value.forEach((agent: Agent) => {
    available_agents.push({
        id: agent.id,
        name: agent.name,
    });
});

let selected_agent = ref(available_agents[0]);

/**
 *  Reported Facts
 */

const reported_facts = ref('');

/**
 *
 *  Attached Documentation
 *
 */

// Import Vue FilePond
import vueFilePond from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
);

const accepted_file_types =
    'image/jpeg, image/png, video/mp4, audio/mpeg, application/pdf';

/**
 *
 * Format fields
 *
 */

const boolean2text = (bool: boolean) => {
    let text = 'No';
    if (bool) {
        text = 'Sí';
    }
    return text;
};

/**
 * Page utils
 */

defineI18nRoute({
    paths: {
        en: '/report',
        es: '/denunciar',
    },
});
</script>

<template>
    <Title>{{ t('meta.title') }}</Title>
    <section class="flex h-screen p-12 pt-24">
        <main
            class="rounded-xl bg-black/60 scroll-smooth card-scrollbar inline-flex flex-col w-full h-full p-10 m-auto overflow-y-auto border border-gray-600">
            <h1 class="mb-8 text-xl font-semibold">Presentar denuncia</h1>
            <div
                class="inline-flex w-full pt-8 mx-auto space-x-20 border-t border-gray-600">
                <ol class="min-w-fit space-y-4">
                    <li
                        v-for="step in form_steps"
                        :id="`step-${step.id}-button`">
                        <UButton
                            v-if="selected_step.id >= step.id"
                            @click="selectStep(step.id)"
                            size="xl"
                            color="green"
                            variant="solid"
                            :label="step.text"
                            icon="i-heroicons-check-circle"
                            class="w-full" />
                        <UButton
                            v-else
                            @click="selectStep(step.id)"
                            size="xl"
                            color="gray"
                            variant="solid"
                            :label="step.text"
                            icon="i-heroicons-minus-circle"
                            class="w-full" />
                    </li>
                </ol>

                <div
                    v-if="
                        !agents_pending ||
                        !complaint_categories_pending ||
                        !complaint_workplaces_pending ||
                        !compliant_departments_pending
                    "
                    class="w-full">
                    <div id="step-0">
                        <div class="flex w-full">
                            <div class="w-1/2 px-8 space-y-8">
                                <UFormGroup
                                    label="Relación"
                                    hint="Obligatorio"
                                    help="Indique su relación con la empresa."
                                    size="xl"
                                    required>
                                    <USelect
                                        icon="i-heroicons-users"
                                        class="mt-3"
                                        placeholder="Seleccionar"
                                        size="md"
                                        v-model="selected_relationship"
                                        :options="available_relationships" />
                                </UFormGroup>
                                <UFormGroup label="Denuncia anónima" size="xl">
                                    <UToggle
                                        v-model="anonComplaint"
                                        class="mt-2"
                                        size="md" />
                                </UFormGroup>
                                <!-- TODO: Agregar el Captcha -->
                            </div>
                            <div
                                v-if="!anonComplaint"
                                class="w-1/2 px-8 space-y-8">
                                <UFormGroup
                                    label="Nombre y apellidos"
                                    help="Introduzca su nombre y apellidos."
                                    size="xl"
                                    required>
                                    <UInput
                                        type="text"
                                        icon="i-heroicons-identification"
                                        size="md"
                                        placeholder="John Doe"
                                        class="mt-3" />
                                </UFormGroup>
                                <UFormGroup
                                    label="Email"
                                    help="Introduzca su correo eléctronico."
                                    size="xl"
                                    required>
                                    <UInput
                                        type="email"
                                        icon="i-heroicons-envelope"
                                        size="md"
                                        placeholder="email@domain.tld"
                                        class="mt-3" />
                                </UFormGroup>
                                <UFormGroup
                                    label="Teléfono"
                                    help="Introduzca un teléfono de contacto."
                                    size="xl"
                                    required>
                                    <UInput
                                        type="tel"
                                        icon="i-heroicons-phone"
                                        size="md"
                                        placeholder="XXX-XX-XX-XX"
                                        v-maska
                                        data-maska="XXX-XX-XX-XX"
                                        data-maska-tokens="{ 'X': { 'pattern': '[0-9]' }}"
                                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}"
                                        class="mt-3" />
                                </UFormGroup>
                            </div>
                        </div>
                    </div>

                    <div id="step-1" class="hidden">
                        <div class="flex w-full">
                            <div class="w-1/2 px-8 space-y-8">
                                <UFormGroup
                                    label="Testigos"
                                    help="¿Hay más testigos de los hechos denunciados?"
                                    size="xl">
                                    <UToggle
                                        v-model="areWitnesses"
                                        class="mt-2"
                                        size="md" />
                                </UFormGroup>
                                <UFormGroup
                                    label="Pruebas"
                                    help="¿Tiene pruebas de los hechos denunciados?"
                                    size="xl">
                                    <UToggle
                                        v-model="areEvidences"
                                        class="mt-2"
                                        size="md" />
                                </UFormGroup>
                            </div>
                            <div class="w-1/2 px-8 space-y-8">
                                <UFormGroup
                                    label="Tipo de denuncia"
                                    hint="Obligatorio"
                                    help="Seleccione el tipo de denuncia denuncia."
                                    size="xl"
                                    required>
                                    <ClientOnly>
                                        <UInputMenu
                                            v-model="
                                                selected_complaint_category
                                            "
                                            :options="
                                                available_complaint_categories
                                            "
                                            option-attribute="name"
                                            icon="i-heroicons-tag"
                                            size="md"
                                            class="mt-3" />
                                    </ClientOnly>
                                </UFormGroup>
                                <UFormGroup
                                    label="Centro de trabajo"
                                    hint="Opcional"
                                    help="Seleccione el lugar de trabajo de los hechos."
                                    size="xl">
                                    <ClientOnly>
                                        <UInputMenu
                                            v-model="
                                                selected_complaint_workplace
                                            "
                                            :options="
                                                available_complaint_workplaces
                                            "
                                            option-attribute="name"
                                            icon="i-heroicons-building-office"
                                            size="md"
                                            class="mt-3" />
                                    </ClientOnly>
                                </UFormGroup>
                                <UFormGroup
                                    label="Departamento"
                                    hint="Opcional"
                                    size="xl">
                                    <ClientOnly>
                                        <UInputMenu
                                            v-model="
                                                selected_complaint_department
                                            "
                                            :options="
                                                available_complaint_departments
                                            "
                                            option-attribute="name"
                                            icon="i-heroicons-user-group"
                                            size="md"
                                            class="mt-3" />
                                    </ClientOnly>
                                </UFormGroup>
                            </div>
                        </div>
                    </div>

                    <div id="step-2" class="hidden h-full">
                        <div class="flex w-full h-full">
                            <div class="w-full m-auto">
                                <UFormGroup
                                    class="backdrop-blur px-12 py-4 m-auto"
                                    label="Hechos denunciados"
                                    help="Explique con detalle los hechos denunciados"
                                    size="xl">
                                    <UTextarea
                                        class="w-full mt-2"
                                        size="md"
                                        :rows="12"
                                        autoresize
                                        v-model="reported_facts" />
                                </UFormGroup>
                            </div>
                        </div>
                    </div>

                    <div id="step-3" class="hidden h-full">
                        <div class="flex w-full h-full">
                            <div class="w-full m-auto">
                                <UFormGroup
                                    class="backdrop-blur px-12 py-4 m-auto"
                                    label="Documentación adjunta"
                                    help="Puede adjuntar hasta 3 documentos, imágenes, audios o vídeos que considere relevantes para su denuncia."
                                    size="xl">
                                    <ClientOnly>
                                        <file-pond
                                            class="mt-4"
                                            :allow-multiple="true"
                                            credits=""
                                            maxFiles="3"
                                            label-idle="Arrastra y suelta tus archivos o <span class='filepond--label-action'>Explora</span>"
                                            :accepted-file-types="
                                                accepted_file_types
                                            " />
                                    </ClientOnly>
                                </UFormGroup>
                            </div>
                        </div>
                    </div>

                    <div id="step-4" class="hidden">
                        <div class="flex w-full h-full">
                            <div class="w-2/3 m-auto space-y-8">
                                <UAlert
                                    icon="i-heroicons-information-circle"
                                    color="primary"
                                    variant="soft"
                                    title="Seguimiento de la denuncia"
                                    description="Use al menos 8 caracteres con letras y números." />
                                <div class="w-3/4 mx-auto">
                                    <UFormGroup
                                        label="Contraseña"
                                        help="Introduzca la contraseña de su denuncia."
                                        size="xl"
                                        required>
                                        <UInput
                                            type="password"
                                            icon="i-heroicons-lock-closed"
                                            size="md"
                                            placeholder="••••••••"
                                            class="mt-3" />
                                    </UFormGroup>
                                    <UFormGroup
                                        help="Repita de nueva la contraseña."
                                        size="xl"
                                        required>
                                        <UInput
                                            type="password"
                                            icon="i-heroicons-lock-closed"
                                            size="md"
                                            placeholder="••••••••"
                                            class="mt-3" />
                                    </UFormGroup>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="step-5" class="hidden h-full">
                        <div class="flex w-full h-full">
                            <div class="w-5/6 m-auto space-y-8">
                                <UAlert
                                    icon="i-heroicons-information-circle"
                                    color="blue"
                                    variant="soft"
                                    title="Verifique los datos de su denuncia antes de finalizarla" />

                                <div class="flex w-full">
                                    <div class="w-3/5 p-8 pr-0 space-y-8">
                                        <div
                                            class="w-full flex max-w-sm items-center justify-between mb-4">
                                            <label
                                                class="text-md font-semibold leading-none text-gray-200">
                                                Relación con la Empresa:
                                            </label>
                                            <UBadge
                                                class="w-44"
                                                color="gray"
                                                size="lg"
                                                variant="solid">
                                                {{
                                                    selected_relationship ||
                                                    'No seleccionado'
                                                }}
                                            </UBadge>
                                        </div>
                                        <div
                                            class="w-full flex max-w-sm items-center justify-between mb-4">
                                            <label
                                                class="text-md font-semibold leading-none text-gray-200">
                                                Tipo de Denuncia:
                                            </label>
                                            <UBadge
                                                class="w-44"
                                                color="gray"
                                                size="lg"
                                                variant="solid">
                                                {{
                                                    selected_complaint_category?.name ||
                                                    'No seleccionado'
                                                }}
                                            </UBadge>
                                        </div>
                                        <div
                                            class="w-full flex max-w-sm items-center justify-between mb-4">
                                            <label
                                                class="text-md font-semibold leading-none text-gray-200">
                                                Centro:
                                            </label>
                                            <UBadge
                                                class="w-64"
                                                color="gray"
                                                size="lg"
                                                variant="solid">
                                                {{
                                                    selected_complaint_workplace.name ||
                                                    'No seleccionado'
                                                }}
                                            </UBadge>
                                        </div>
                                    </div>
                                    <div class="w-2/5 p-8 pl-0 space-y-8">
                                        <div
                                            class="w-full flex max-w-sm items-center justify-between mb-4">
                                            <label
                                                class="text-md font-semibold leading-none text-gray-200">
                                                Testigos:
                                            </label>
                                            <UBadge
                                                class="w-24"
                                                color="gray"
                                                size="lg"
                                                variant="solid">
                                                {{ boolean2text(areWitnesses) }}
                                            </UBadge>
                                        </div>
                                        <div
                                            class="w-full flex max-w-sm items-center justify-between mb-4">
                                            <label
                                                class="text-md font-semibold leading-none text-gray-200">
                                                Pruebas:
                                            </label>
                                            <UBadge
                                                class="w-24"
                                                color="gray"
                                                size="lg"
                                                variant="solid">
                                                {{ boolean2text(areEvidences) }}
                                            </UBadge>
                                        </div>
                                        <div
                                            class="w-full flex max-w-sm items-center justify-between mb-4">
                                            <label
                                                class="text-md font-semibold leading-none text-gray-200">
                                                Departamento:
                                            </label>
                                            <UBadge
                                                class="w-36"
                                                color="gray"
                                                size="lg"
                                                variant="solid">
                                                {{
                                                    selected_complaint_department.name ||
                                                    'No seleccionado'
                                                }}
                                            </UBadge>
                                        </div>
                                    </div>
                                </div>

                                <div class="w-full px-8 py-4 mx-auto space-y-6">
                                    <UFormGroup
                                        label="Hechos denunciados"
                                        size="xl">
                                        <UTextarea
                                            class="w-full mt-2"
                                            size="md"
                                            autoresize
                                            v-model="reported_facts"
                                            disabled />
                                    </UFormGroup>
                                    <UFormGroup
                                        label="Gestor"
                                        hint="Opcional"
                                        help="Si lo desea puede elegir el gestor de la empresa que tramite su denuncia."
                                        size="xl">
                                        <ClientOnly>
                                            <UInputMenu
                                                v-model="selected_agent"
                                                :options="available_agents"
                                                option-attribute="name"
                                                icon="i-heroicons-user"
                                                size="md"
                                                class="mt-3" />
                                        </ClientOnly>
                                    </UFormGroup>
                                    <UFormGroup
                                        class="bg-opacity-10 p-4 bg-red-400 rounded-lg"
                                        required>
                                        <div class="flex space-x-5">
                                            <UToggle
                                                v-model="acceptedTerms"
                                                size="md" />
                                            <p
                                                class="text-sm font-medium text-red-400">
                                                Para enviar su denuncia debe
                                                aceptar nuestras condiciones de
                                                uso y nuestra política de
                                                privacidad.
                                            </p>
                                        </div>
                                    </UFormGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="w-full h-full">
                    <UProgress animation="swing" />
                </div>
            </div>
        </main>
    </section>
</template>

<i18n lang="json">
{
    "en": {
        "meta": {
            "title": "File complaint"
        }
    },

    "es": {
        "meta": {
            "title": "Presentar denuncia"
        }
    }
}
</i18n>

<style>
.filepond--drop-label {
    @apply text-gray-400;
}

.filepond--label-action {
    @apply underline underline-offset-2;
}

.filepond--panel-root {
    @apply bg-gray-900 rounded-md border border-gray-600;
}

.card-scrollbar::-webkit-scrollbar {
    @apply w-3;
}

.card-scrollbar::-webkit-scrollbar-track {
    @apply bg-gray-600 rounded-r-xl;
}

.card-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-gray-900 border-[3.5px] border-solid border-gray-600 rounded-r-xl;
}
</style>
