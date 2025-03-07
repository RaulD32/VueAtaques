import { ref } from "vue";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { getItems, getItemById, createItem, updateItem, deleteItemById, deleteAllItems } from "@/services/itemService";
import { logService } from "@/services/LogService";

const toast = useToast();

interface Item {
    id: number;
    name: string;
    description: string;
}

export const useItemStore = defineStore('items', () => {
    const items = ref<Item[]>([]);
    const currentItem = ref<Item | null>(null);

    async function fetchItems() {
        try {
            const response = await getItems();
            console.log(response);
            items.value = response;
        } catch (error: any) {
            const errorMessage = 'Error al obtener los items';
            console.error(errorMessage, error);
            await logService.log('error', errorMessage, { error });
            toast.error('Hubo un error al cargar los items');
        }
    }

    async function fetchItemById(itemId: number) {
        try {
            const response = await getItemById(itemId);
            currentItem.value = response
        } catch (error: any) {
            const errorMessage = 'Error al obtener el item';
            console.error(errorMessage, error);
            await logService.log('error', errorMessage, { error, itemId });
            toast.error('Hubo un error al cargar el item');
        }
    }

    async function addItem(newItem: Omit<Item, 'id'>) {
        try {
            const response = await createItem(newItem);
            items.value.push(response);
            await fetchItems();
            toast.success('Item creado correctamente');
        } catch (error: any) {
            const errorMessage = 'Error al crear el item';
            console.error(errorMessage, error);
            await logService.log('error', errorMessage, { error, newItem });
            toast.error('Hubo un error al crear el item');
        }
    }

    async function modifyItem(itemId: number, updatedItem: Partial<Item>) {
        try {
            const response = await updateItem(itemId, updatedItem);
            // Actualiza el ítem en la lista de manera inmutable
            items.value = items.value.map(item =>
                item.id === itemId ? { ...item, ...response } : item
            );
            toast.success('Item actualizado correctamente');
        } catch (error: any) {
            const errorMessage = 'Error al actualizar el item';
            console.error(errorMessage, error);
            await logService.log('error', errorMessage, { error, itemId, updatedItem });
            toast.error('Hubo un error al actualizar el item');
        }
    }

    async function removeItem(itemId: number) {
        try {
            await deleteItemById(itemId);
            items.value = items.value.filter((item) => item.id !== itemId);
            toast.success('Item eliminado correctamente');
        } catch (error: any) {
            const errorMessage = 'Error al eliminar el item';
            console.error(errorMessage, error);
            await logService.log('error', errorMessage, { error, itemId });
            toast.error('Hubo un error al eliminar el item');
        }
    }

    async function removeAllItems() {
        try {
            await deleteAllItems();
            items.value = [];
            toast.success('Todos los items eliminados correctamente');
        } catch (error: any) {
            const errorMessage = 'Error al eliminar todos los items';
            console.error(errorMessage, error);
            await logService.log('error', errorMessage, { error });
            toast.error('Hubo un error al eliminar todos los items');
        }
    }

    return {
        items,
        currentItem,
        fetchItems,
        fetchItemById,
        addItem,
        modifyItem,
        removeItem,
        removeAllItems,
    };
});