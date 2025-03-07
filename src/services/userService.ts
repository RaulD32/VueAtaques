import { genericRequest, genericRequestAutheticated } from "@/utils/genericRequest";
import { logService } from "./LogService";
import { useAuthStore } from "@/stores/userStore";

const base_url = 'http://localhost:3000'

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('token'),
}

const handleError = async (error: any, context: string) => {
  const errorMessage = `Error durante ${context}: ${error.message}`
  console.error(errorMessage)

  const errorDetails = {
    response: error.response
      ? {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      }
      : null,
    request: error.request || null,
    message: error.message,
  }

  await logService.log('error', errorMessage, errorDetails)
  throw error
}

export const LoginService = async (email: string, password: string) => {
  try {
    return await genericRequest(base_url + '/users/login', 'POST', { email, password })
  } catch (error) {
    await handleError(error, 'login')
  }
}

export const RegisterService = async (email: string, password: string) => {
  try {
    return await genericRequest(base_url + '/users/register', 'POST', { email, password })
  } catch (error) {
    await handleError(error, 'registration')
  }
}

export const LogoutService = async () => {
  try {
    return await genericRequestAutheticated('/users/logout', 'POST')
  } catch (error) {
    await handleError(error, 'logout')
  }
}