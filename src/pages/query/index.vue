<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types';

const { t } = useI18n();

const toast = useToast();
const localePath = useLocalePath();
const queryStore = useQueryComplaintStore();

const form_fields = reactive({
    code: undefined,
    password: undefined,
});

const goToComplaint = () => {
    navigateTo(localePath('query') + `/${form_fields.code}`);
};

const verifyPassHash = async () => {
    const validation = await $fetch('/api/complaint/check/password', {
        method: 'POST',
        body: {
            code: form_fields.code!,
            password: form_fields.password!,
        },
    });

    if (validation.result) {
        queryStore.setComplaintID(validation.complaint_id);
        queryStore.setResult(validation.result);
        queryStore.setComplaintCode(form_fields.code!);

        toast.add({
            title: 'Correcto',
            icon: 'i-heroicons-check-16-solid',
            description: validation.message,
            color: 'green',
            timeout: 2000,
            callback: goToComplaint,
        });
    } else {
        toast.add({
            title: 'Error',
            icon: 'i-heroicons-x-mark-16-solid',
            description: validation.message,
            color: 'red',
            timeout: 10000,
        });
    }
};

const validateForm = (form_fields: any): FormError[] => {
    const errors = [];

    const codePattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    const isValidCode = codePattern.test(form_fields.code);

    if (!form_fields.code) {
        errors.push({
            path: 'code',
            message: 'Debes introducir el código de la denuncia',
        });
    } else if (!isValidCode) {
        errors.push({
            path: 'code',
            message: 'El código de la denuncia no es valido',
        });
    } else if (!form_fields.password) {
        errors.push({
            path: 'password',
            message: 'Debes introducir la contraseña de la denuncia',
        });
    }

    return errors;
};

/**
 * Page utils
 */

defineI18nRoute({
    paths: {
        en: '/query',
        es: '/consultar',
    },
});
</script>

<template>
    <Title>{{ t('meta.title') }}</Title>
    <section class="flex h-screen p-12 pt-24">
        <main
            class="rounded-xl bg-black/60 inline-flex flex-col w-full h-full p-10 m-auto border border-gray-600">
            <h1 class="mb-8 text-xl font-semibold">Consultar denuncia</h1>
            <div
                class="inline-flex w-full h-full pt-8 mx-auto border-t border-gray-600">
                <div class="inline-flex flex-col m-auto">
                    <UForm
                        :state="form_fields"
                        :validate="validateForm"
                        @submit="verifyPassHash()"
                        class="min-w-80 space-y-8">
                        <UFormGroup
                            label="Código"
                            name="code"
                            help="Introduzca el código de su denuncia."
                            size="xl">
                            <UInput
                                icon="i-heroicons-key"
                                size="md"
                                class="mt-3"
                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                v-maska
                                data-maska="XXXX-XXXX-XXXX-XXXX"
                                data-maska-tokens="{ 'X': { 'pattern': '[A-Z0-9]' }}"
                                v-model="form_fields.code" />
                        </UFormGroup>
                        <UFormGroup
                            label="Contraseña"
                            name="password"
                            help="Introduzca la contraseña de su denuncia."
                            size="xl">
                            <UInput
                                type="password"
                                icon="i-heroicons-lock-closed"
                                size="md"
                                placeholder="••••••••"
                                class="mt-3"
                                v-model="form_fields.password" />
                        </UFormGroup>
                        <UButton
                            type="submit"
                            variant="outline"
                            block
                            size="xl">
                            Consultar estado de la denuncia
                        </UButton>
                    </UForm>
                </div>
            </div>
        </main>
    </section>
</template>

<i18n lang="json">
{
    "en": {
        "meta": {
            "title": "Query complaint",
            "complaintCodeLabel": "Complaint Code"
        }
    },

    "es": {
        "meta": {
            "title": "Consultar denuncia",
            "complaintCodeLabel": "Código de denuncia"
        }
    }
}
</i18n>
