import { genericRequestAutheticated } from "@/utils/genericRequest";

const base_url = 'http://localhost:3000'

// const headers = {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + localStorage.getItem('token'),
// }

// Obtener todos los items
export const getItems = async () => {
    const response = await genericRequestAutheticated('/items', 'GET');
    return response;
};

// Obtener un item por ID
export const getItemById = async (itemId: number) => {
    const response = await genericRequestAutheticated(`/items/${itemId}`, 'GET');
    return response;
};

// Crear un nuevo item
export const createItem = async (newItem: { name: string; description: string }) => {
    return await genericRequestAutheticated('/items', 'POST', newItem);
};

// Actualizar un item existente
export const updateItem = async (itemId: number, updatedItem: { name: string; description: string }) => {
    return await genericRequestAutheticated(`/items/${itemId}`, 'PUT', updatedItem);
};

// Eliminar un item por ID
export const deleteItemById = async (itemId: number) => {
    return await genericRequestAutheticated(`/items/${itemId}`, 'DELETE');
};

// Eliminar todos los items
export const deleteAllItems = async () => {
    return await genericRequestAutheticated('/items', 'DELETE');
};