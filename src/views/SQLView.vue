<template>
    <Navbar>
      <h1 class="text-3xl font-bold text-center text-purple-700 mb-6">Agregar Item😱</h1>
  
      <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
        <!-- Input para nombre -->
        <input v-model="newItem.name" type="text" placeholder="Nombre del item"
          class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
  
        <!-- Input para descripción -->
        <input v-model="newItem.description" type="text" placeholder="Descripción del item"
          class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
  
        <!-- Botón agregar -->
        <button @click="addItem"
          class="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full sm:w-auto">
          Agregar
        </button>
      </div>
  
      <div class="mt-6">
        <h2 class="text-2xl font-semibold text-center text-red-600 mb-4">Inyección SQL😰</h2>
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <!-- Input para SQL Query -->
          <input v-model="sqlQuery" type="text" placeholder="Ejemplo: ' OR '1'='1"
            class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
  
          <!-- Botón ejecutar SQL -->
          <button @click="executeSQLi"
            class="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full sm:w-auto">
            Ejecutar
          </button>
        </div>
  
        <!-- Resultados de SQL -->
        <div v-if="sqlResults" class="mt-6 p-5 bg-white shadow-md rounded-lg border border-gray-300">
          <h3 class="text-xl font-bold text-gray-800 mb-3">Vas a llorar?, GAME OVER😭</h3>
          <div class="bg-gray-50 p-4 rounded-md border border-gray-200">
            <pre class="text-gray-700 text-sm whitespace-pre-wrap">{{ sqlResults }}</pre>
          </div>
        </div>
  
        <!-- Error de SQL -->
        <div v-if="error" class="text-red-500 mt-4 text-center">
          {{ error }}
        </div>
      </div>
  
      <ItemComponent />
    </Navbar>
  </template>
  
  <script lang="ts" setup>
  import Navbar from '@/components/Navbar.vue';
  import { ref } from 'vue';
  import { useItemStore } from '@/stores/itemStore';
  import ItemComponent from '@/components/ItemComponent.vue';
  import { sqlInjection } from '@/services/APIService';
  
  const itemStore = useItemStore();
  const sqlQuery = ref("");
  const sqlResults = ref<any>(null);
  const error = ref<string>("");
  
  // Estado para el nuevo item
  const newItem = ref({
      name: '',
      description: '',
  });
  
  // Función para agregar un nuevo item
  const addItem = async () => {
      if (newItem.value.name && newItem.value.description) {
          await itemStore.addItem(newItem.value);
          newItem.value = { name: '', description: '' };
      }
  };
  
  // Ejecutar SQL Injection
  const executeSQLi = async () => {
      try {
          const response = await sqlInjection(sqlQuery.value);
          sqlResults.value = response.results;
          error.value = "";
      } catch (err) {
          error.value = "Error: La inyección SQL fue bloqueada o la consulta falló.";
          sqlResults.value = null;
          console.error("Error en SQLi:", err);
      }
  };
  </script>
  