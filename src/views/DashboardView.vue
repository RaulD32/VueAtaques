<template>
  
  <Navbar>
  
    <div class="flex flex-col items-center space-y-6 w-full">
      <!-- Input y Botón -->
      <div class="flex w-full max-w-xl space-x-4">
        <input 
          v-model="userScript" 
          placeholder="Ingresa un script aquí"
          class="border border-purple-400 p-3 rounded-lg w-full bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500" 
        />
        <button 
          @click="handleSubmit"
          class="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
        >
          Enviar
        </button>
      </div>

      <!-- Renderizado de contenido -->
      <div class="w-full max-w-2xl p-6 bg-white border border-purple-300 shadow-md rounded-lg">
        <h2 class="text-xl font-semibold text-purple-700 mb-4">Vista previa</h2>
        <div class="border border-purple-200 p-4 bg-purple-50 rounded-md shadow-sm" v-html="renderedContent"></div>
      </div>

      <!-- Componente de comentarios -->
      <CommentsXSS />
    </div>
  </Navbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import CommentsXSS from '@/components/CommentsXSS.vue';
import { useAuthStore } from '@/stores/userStore';
import { postComment } from '@/services/APIService';

// Almacena el contenido del input
const userScript = ref('');
const renderedContent = ref('');
const authStore = useAuthStore();

//Renderiza el XSS
const renderScript = () => {
  renderedContent.value = userScript.value;
};

const handleSubmit = async () => {
  if (!userScript.value.trim()) return;

  renderScript();

  try {
    await postComment(userScript.value, authStore.user.id);
    userScript.value = "";
  } catch (error) {
    console.error("Error al enviar comentario:", error);
  }
};
</script>
