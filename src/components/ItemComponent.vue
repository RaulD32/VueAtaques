<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-8">
      <h2 class="text-3xl font-semibold text-center text-purple-700 mb-6">Lista de Items</h2>
  
      <button @click="deleteAll" class="px-4 py-2 my-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all w-full">
        Eliminar Todos
      </button>
  
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead class="bg-purple-600 text-white">
            <tr>
              <th class="px-6 py-4 text-left text-lg font-medium">Nombre</th>
              <th class="px-6 py-4 text-left text-lg font-medium">Descripción</th>
              <th class="px-6 py-4 text-left text-lg font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-gray-700">{{ item.name }}</td>
              <td class="px-6 py-4 text-gray-700">{{ item.description }}</td>
              <td class="px-6 py-4 text-sm">
                <button @click="openEditModal(item)" class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mr-3 transition-all">
                  Editar
                </button>
                <button @click="deleteItem(item.id)" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal para editar el item -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-xl w-1/3">
          <h3 class="text-2xl font-semibold text-purple-700 mb-4">Editar Item</h3>
          <form @submit.prevent="saveItem">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nombre</label>
              <input v-model="editingItem.name" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" id="name" type="text" placeholder="Nombre" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Descripción</label>
              <input v-model="editingItem.description" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" id="description" type="text" placeholder="Descripción" />
            </div>
            <div class="flex justify-end">
              <button type="button" @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-2">Cancelar</button>
              <button type="submit" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useItemStore } from '@/stores/itemStore';
  
  const itemStore = useItemStore();
  const { items, fetchItems, removeItem, removeAllItems, modifyItem } = itemStore;
  
  // Estado del modal
  const isModalOpen = ref(false);
  const editingItem = ref({ id: null, name: '', description: '' });
  
  // Cargar items al montar el componente
  onMounted(() => {
    fetchItems();
  });
  
  // Función para abrir el modal de edición
  const openEditModal = (item: any) => {
    editingItem.value = { ...item }; // Copia el ítem a editar
    isModalOpen.value = true; // Abre el modal
  };
  
  // Función para cerrar el modal
  const closeModal = () => {
    isModalOpen.value = false;
    editingItem.value = { id: null, name: '', description: '' }; // Limpia el ítem en edición
  };
  
  // Función para guardar los cambios del ítem
  const saveItem = async () => {
    if (editingItem.value.id !== null) {
      await modifyItem(editingItem.value.id, editingItem.value);
      closeModal(); // Cierra el modal
    }
  };
  
  // Función para eliminar un ítem
  const deleteItem = async (itemId: number) => {
    if (confirm('¿Estás seguro de eliminar este ítem?')) {
      await removeItem(itemId);
    }
  };
  
  // Eliminar todos
  const deleteAll = async () => {
    if (confirm('¿Estás seguro de eliminar todos los ítems?')) {
      await removeAllItems();
    }
  };
  </script>
  