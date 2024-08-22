import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.LOG_ANALYZER_API_URL}/api/`,
})

export default axiosInstance
