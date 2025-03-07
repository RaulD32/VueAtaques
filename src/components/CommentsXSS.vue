<template>
    <div class="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl border border-purple-300">
      <h2 class="text-2xl font-bold text-purple-700 mb-6 text-center">Maravillas XSS</h2>
      <div class="space-y-4">
        <div
          v-for="(comment, index) in comments"
          :key="index"
          class="border border-purple-300 p-4 rounded-lg bg-purple-50 shadow-sm"
        >
          <p class="text-gray-800 font-medium">Comentario seguro:</p>
          <p class="text-gray-600 italic">{{ comment.comment }}</p>
          <hr class="my-2 border-purple-200" />
          <p class="text-gray-800 font-medium">Renderizado con v-html:</p>
          <p class="text-gray-600 italic" v-html="comment.comment"></p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getComments } from '@/services/APIService';
  
  const comments = ref<{ comment: string }[]>([]);
  
  const fetchComments = async () => {
    try {
      const response = await getComments();
      console.log(response);
      comments.value = response;
    } catch (error) {
      console.error("Error al obtener comentarios", error);
    }
  };
  
  onMounted(fetchComments);
  </script>
  