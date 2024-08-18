import axios from 'axios'

const createAxiosInstance = (baseURL: string, secretKey: string) => {
  const instance = axios.create({ baseURL })

  instance.interceptors.request.use((request) => {
    request.headers['x-api-key'] = secretKey
    request.headers['Content-Type'] = 'application/json'

    return request
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorMessage: string =
        error.response?.data?.error || 'Error resp interceptors'
      console.error('Error resp interceptors', errorMessage)
      return Promise.reject(error)
    }
  )

  return instance
}

export const catApiInstance = createAxiosInstance(
  process.env.NEXT_PUBLIC_URL_SERVER_ADDRESS_CAT || '',
  process.env.NEXT_PUBLIC_API_KEY_CAT || ''
)
export const dogApiInstance = createAxiosInstance(
  process.env.NEXT_PUBLIC_URL_SERVER_ADDRESS_DOG || '',
  process.env.NEXT_PUBLIC_API_KEY_CAT || ''
)
