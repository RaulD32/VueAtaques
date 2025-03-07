import { ref, computed } from "vue";
import { LoginService, RegisterService, LogoutService } from "@/services/userService";
import { logService } from "@/services/LogService";
import type { User } from "@/interfaces/User";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import router from "@/router";

const toast = useToast();

export const useAuthStore = defineStore('auth', () => {
  const user = ref({} as User);
  const token = useStorage('token', '');
  const isLoggedIn = computed(() => token.value !== '' && token.value !== undefined);

  //Funciones 
  async function login(email: string, password: string) {
    try {
      const response = await LoginService(email, password);
      console.log("Respuesta del backend en userStore:", response);

      if (response.status === 200 && response.data) {
        user.value = response.data;
        token.value = user.value.token;
        return { status: response.status, message: response.message };
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error en la petición:", error.response.data);
        return { status: error.response.status, message: error.response.data.error };
      } else {
        console.error("Error inesperado:", error);
        return { status: 500, message: "Error interno del cliente" };
      }
    }
  }


  async function register(email: string, password: string) {
    try {
      const response = await RegisterService(email, password)
      console.log('Respuesta: ', response)
      if (response.status === 200 && response.data) {
        user.value = response.data;
        token.value = user.value.token;
        toast.success('Usuario registrado correctamente')
      }
    } catch (error: any) {
      const errorMessage = 'Error al registrar'

      if (error.response && error.response.data) {
        const { status, error: serverError } = error.response.data;

        if (status === 400 && serverError) {
          toast.error(serverError);
          return;
        }
      }

      console.error(errorMessage, error)
      await logService.log('error', errorMessage, { error, email })
      toast.error('Hubo un error')
    }
  }

  async function logout() {
    try {
      const response = await LogoutService()
      console.log(response);
      if (response.status === 200) {
        user.value = {} as User
        token.value = ''
        router.push('/');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        const errorMessage = 'Token inválido o expirado';
        console.error(errorMessage, error);
        // token.value = '';
        // router.push('/');
        // toast.error("Token inválido, por favor inicia sesión nuevamente.");
      } else {
        const errorMessage = 'Error al cerrar sesión';
        console.error(errorMessage, error);
        await logService.log('error', errorMessage, { error });
      }
    }
  }

  return {
    login, register, logout,
    isLoggedIn, token, user
  }
})
