import axios from 'axios'
import { logService } from '@/services/LogService'
import api from './axiosInstances'

//Request generico para hacer peticiones a la API
export const genericRequest = async (url: string, method: string, body?: any) => {
  try {
    const response = await axios({
      url: url,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    })
    return response.data
  } catch (error: any) {
    await logService.log('error', `Error in genericRequest: ${error.message}`, {
      url,
      method,
      body,
      error,
    })
    throw error
  }
}

export const genericRequestAutheticated = async (
  url: string,
  method: string,
  body?: any,
) => {
  try {
    const response = await api({
      url: url,
      method: method,
      data: body,
    })
    return response.data
  } catch (error: any) {
    await logService.log('error', `Error in genericRequestAutheticated: ${error.message}`, {
      url,
      method,
      body,
      error,
    })
    throw error
  }
}