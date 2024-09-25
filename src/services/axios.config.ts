import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.LOG_ANALYZER_API_URL}/api/`,
})

export const serviceApi = axios.create({
  baseURL: `${process.env.LOG_ANALYZER_API_URL}/api/services`,
})

serviceApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
},
  Promise.reject
)

serviceApi.interceptors.response.use((response) => response)

export default axiosInstance
