<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-3xl font-bold text-center mb-6 text-purple-700">Acceder a NU🤑</h2>
      <form @submit.prevent="handleSubmitLogin" class="space-y-4">
        <p v-if="loginError" class="text-red-500 text-sm text-center font-bold mt-2">
          {{ loginError }}
        </p>
        <div>
          <label class="block text-gray-600">Correo Electrónico</label>
          <input
            v-model="email"
            type="email"
            placeholder="Ingrese su email"
            class="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            v-bind="emailAttrs"
            required
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>
        <div>
          <label class="block text-gray-600">Contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="Ingrese su contraseña"
            class="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            v-bind="passwordAttrs"
            required
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>
        <button
          type="submit"
          class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
        >
          Iniciar sesión
        </button>
      </form>
      <p class="mt-4 text-center text-gray-600">
        ¿No tienes una cuenta?
        <router-link to="/registro" class="text-purple-600 hover:underline">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const authStore = useAuthStore();
const router = useRouter();
const loginError = ref<string | null>(null);

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Email inválido').required('Campo requerido'),
    password: yup.string().min(6, 'Mínimo 6 caracteres').required('Campo requerido'),
  }),
});

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: true,
});
const [password, passwordAttrs] = defineField('password', {
  validateOnModelUpdate: true,
});

const handleSubmitLogin = handleSubmit(async (values) => {
  loginError.value = null;
  try {
    const response = await authStore.login(values.email, values.password);
    if (response?.status === 200) {
      router.push('/dashboard');
    } else {
      loginError.value = response?.message || 'Credenciales inválidas';
    }
  } catch (error) {
    loginError.value = 'Ocurrió un error inesperado, intenta nuevamente.';
    console.error('Error al iniciar sesión:', error);
  }
});
</script>
