import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axios.config'
import toast from 'react-hot-toast'

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: { name: string, email: string, password: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axiosInstance.post(
        'signup',
        { name, email, password },
        config
      )
      return data 
    } catch (error: any) {
      console.log(error)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axiosInstance.post(
        'login',
        { email, password },
        config
      )
      localStorage.setItem('token', data.token)
      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
      }
      localStorage.setItem('user', JSON.stringify(user))
      return data
    } catch (error: any) {
      if (error.response && error.response.data.errorMessage) {
        toast.error(error.response.data.errorMessage)
        return rejectWithValue(error.response.data.errorMessage)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
