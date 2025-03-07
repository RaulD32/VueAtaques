<template>
  <BaseForm>
    <h2 class="text-3xl font-semibold text-center text-purple-700 mb-6">Crear Cuenta</h2>
    <form @submit.prevent="handleSubmitRegister" class="space-y-6">

      <!-- Correo Electrónico -->
      <div>
        <label class="block text-gray-600 text-sm font-medium mb-1">Correo Electrónico</label>
        <input 
          type="email"
          :class="{ 'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400': true, 'border-red-500': errors.email }"
          placeholder="Ingrese su correo"
          v-model="email"
          v-bind="emailAttrs"
          required 
        />
        <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
      </div>

      <!-- Contraseña -->
      <div>
        <label class="block text-gray-600 text-sm font-medium mb-1">Contraseña</label>
        <input 
          type="password"
          :class="{ 'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400': true, 'border-red-500': errors.password }"
          placeholder="Ingrese su contraseña"
          v-model="password"
          v-bind="passwordAttrs"
          required 
        />
        <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>
      </div>

      <!-- Confirmar Contraseña -->
      <div>
        <label class="block text-gray-600 text-sm font-medium mb-1">Confirmar Contraseña</label>
        <input 
          type="password"
          :class="{ 'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400': true, 'border-red-500': errors.confirmPassword }"
          placeholder="Confirme su contraseña"
          v-model="confirmPassword"
          v-bind="confirmPasswordAttrs"
          required 
        />
        <span v-if="errors.confirmPassword" class="text-red-500">{{ errors.confirmPassword }}</span>
      </div>

      <!-- Botón Registrarse -->
      <button type="submit" class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition duration-300">
        Registrarse
      </button>
    </form>

    <!-- Enlace para iniciar sesión -->
    <p class="text-center text-sm text-gray-500 mt-4">
      ¿Ya tienes cuenta? <RouterLink to="/" class="text-purple-500 hover:underline">Inicia sesión</RouterLink>
    </p>
  </BaseForm>
</template>

<script lang="ts" setup>
import BaseForm from '@/components/BaseForm.vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/userStore';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const authStore = useAuthStore();
const router = useRouter();

// Esquema de validación con Yup
const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
      .required('Debe confirmar su contraseña')
  })
});

// Definir los campos con validación reactiva
const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: true });
const [password, passwordAttrs] = defineField('password', { validateOnModelUpdate: true });
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword', { validateOnModelUpdate: true });

// Manejar el envío del formulario
const handleSubmitRegister = handleSubmit(async (values) => {
  try {
    await authStore.register(values.email, values.password);
    router.push('/');
  } catch (error) {
    console.error('Error en el registro:', error);
  }
});
</script>
