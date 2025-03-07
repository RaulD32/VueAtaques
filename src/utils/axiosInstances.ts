import axios from "axios";
import { useAuthStore } from "@/stores/userStore";
import { useToast } from "vue-toastification";

const toast = useToast();

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Agregar token automáticamente a cada petición
api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//verificar si el token ha expirado
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const authStore = useAuthStore();
        if (error.response) {
            const { status, error: errorMessage } = error.response.data;

            if (status === 401) {
                if (errorMessage === "Token expirado") {
                    toast.error("Tu sesión ha expirado, inicia sesión nuevamente.");
                    authStore.logout();
                } else if (errorMessage === "Token inválido") {
                    toast.error("Token inválido, por favor inicia sesión.");
                    authStore.logout();
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
