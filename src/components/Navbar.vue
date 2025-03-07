<template>
  <div class="min-h-screen flex bg-purple-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gradient-to-b from-purple-700 to-purple-900 text-white p-6 flex flex-col justify-between rounded-r-xl shadow-lg">
      <div>
        <h1 class="text-3xl font-bold mb-8">Evil NU🤑</h1>
        <nav class="space-y-4">
          <h2 class="text-3xl font-bold mb-8">Ataques😱</h2>
          <router-link to="/dashboard" class="block text-lg font-medium hover:text-gray-300 transition">
            XSS
          </router-link>
          <router-link to="/sql" class="block text-lg font-medium hover:text-gray-300 transition">
            SQL
          </router-link>
        </nav>
      </div>
      <button 
        @click="handleLogout" 
        class="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition">
        Cerrar sesión
      </button>
    </aside>

    <!-- Contenido Principal -->
    <main class="flex-1 flex items-center justify-center p-8">
      <div class="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/userStore';

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};
</script>
