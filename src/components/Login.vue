<template>
  <section class="flex h-screen">
    <div class="lg:py-16 lg:px-12 max-w-screen-md px-4 py-8 m-auto text-center">
      <div class="flex mb-4 text-gray-400">
        <div class="mx-auto">
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" size="lg" />
        </div>
      </div>
      <h1 class="lg:mb-6 md:text-5xl xl:text-6xl  mb-4 text-4xl font-bold leading-none tracking-tight text-white">
        {{ t('login') }}
      </h1>
      <form @submit.prevent="handleSubmit" class="md:text-lg xl:text-xl font-light text-gray-400">
        <div class="mb-4">
          <label for="email" class="block text-gray-400 text-sm font-bold mb-2">{{ t('email') }}</label>
          <div class="flowbite-form-group">
            <UInput v-model="email" type="email" variant="outline" required/>
          </div>
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-400 text-sm font-bold mb-2">{{ t('password') }}</label>
          <div class="flowbite-form-group">
            <UInput v-model="password" type="password" required />
          </div>
        </div>
        <UButton type="submit" :ui="{ rounded: 'rounded-full' }">{{ t('loginButton') }}</UButton>
      </form>
    </div>
  </section>
</template>
  
<script setup lang="ts">
const { t } = useI18n();

const email = ref(t('email'));
const password = ref(t('password'));

watchEffect(() => {
  email.value = t('');
  password.value = t('');
});

//Autenticatiom

const { login } = useDirectusAuth()

const handleSubmit = async () => {

  console.log("he hecho clic")
  if (!email.value || !password.value) {
    alert(t('Rellene tods los campos'));
    return;
  }

  try {
    console.log(email.value + password.value)
    await login(email.value, password.value);
    console.log('Autenticado')
  } catch (error) {
    console.error('Error during login:', error);
    console.log('No AUTENTICADO')
  }
};

</script>
  
<i18n lang="json">
{
  "en": {
    "login": "Login",
    "email": "Email",
    "email": "Enter your email",
    "password": "Password",
    "password": "Enter your password",
    "loginButton": "Login"
  },
  "es": {
    "login": "Iniciar sesión",
    "email": "Correo electrónico",
    "email": "Ingresa tu correo electrónico",
    "password": "Contraseña",
    "password": "Ingresa tu contraseña",
    "loginButton": "Iniciar sesión"
  }
}
</i18n>
  