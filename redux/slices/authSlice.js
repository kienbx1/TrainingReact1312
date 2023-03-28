import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const signUpUser = createAsyncThunk('auth/signUpUser', async (data) => {
  try {
    const response = await axios.post('/api/auth/signup', data)
    if (response) {
      toast.success(response.data.msg, {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
    return response
  } catch (error) {
    if (error) {
      toast.error(error.response.data.msg, {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
    return error.response
  }
})

export const loginUser = createAsyncThunk('auth/loginUser', async (data) => {
  try {
    const response = await axios.post('/api/auth', data)
    cookies.set('token', response.data.token)
    // cookies.set('role', response.data.role)
    return response
  } catch (error) {
    if (error) {
      toast.error(error.response.data.msg, {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
    return error.response
  }
})

export const getMe = createAsyncThunk('auth/getMe', async (token) => {
  try {
    const response = await axios.get('/api/auth/me', {
      headers: {
        Authorization: token
      }
    })
    return response
  } catch (error) {
    return error.response
  }
})

const initialState = {
  user: {},
  registerStatus: '',
  registerError: '',
  registerSuccess: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state, action) => {
      cookies.remove('token')

      return {
        user: {},
        registerStatus: '',
        registerError: '',
        registerSuccess: ''
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state, action) => {
        return {
          ...state,
          registerStatus: 'pending',
          registerError: '',
          registerSuccess: ''
        }
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          return {
            ...state,
            registerStatus: 'success',
            registerError: '',
            registerSuccess: action.payload.data.msg
          }
        } else {
          return {
            ...state,
            registerStatus: 'rejected',
            registerSuccess: '',
            registerError: action.payload.data.msg
          }
        }
      })
      .addCase(signUpUser.rejected, (state, action) => {
        return { ...state }
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true
        state.error = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload.status !== 200) {
          state.error = true
          state.msg = action.payload.data.msg
        } else {
          state.error = false

          state.msg = action.payload.data.msg
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.msg = action.payload.data.msg
      })
      .addCase(getMe.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          return {
            ...state,
            user: action.payload.data.user
          }
        }
      })
  }
})

export const { resetState } = authSlice.actions
export default authSlice.reducer
