import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { apiLogin, apiCreateUser, apiUpdateUser, apiDeleteUser } from 'utils/user'

interface IUser {
  user: any
  isLoggedIn: boolean
}

const initialState: IUser = {
  user: {},
  isLoggedIn: false,
}

export const login = createAsyncThunk('user/login', async () => {
  try {
    const data = await apiLogin()
    return data
  } catch (err) {
    throw err
  }
})

export const createUser = createAsyncThunk('user/create', async (params: Register) => {
  try {
    const data = await apiCreateUser(params)
    return data
  } catch (err) {
    throw err
  }
})

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ id, params }: { id: number; params: Register }) => {
    try {
      const data = await apiUpdateUser(id, params)
      return data
    } catch (err) {
      throw err
    }
  },
)

export const deleteUser = createAsyncThunk('user/delete', async (id: number) => {
  try {
    const data = await apiDeleteUser(id)
    return data
  } catch (err) {
    throw err
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.user = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload.success) {
        state.isLoggedIn = true
        state.user = { ...action.payload.data.user }
      }
    })
    builder.addCase(createUser.fulfilled, (state, action) => {})
    builder.addCase(createUser.rejected, (state, action) => {})
    builder.addCase(updateUser.fulfilled, (state, action) => {})
    builder.addCase(updateUser.rejected, (state, action) => {})
    builder.addCase(deleteUser.fulfilled, (state, action) => {})
    builder.addCase(deleteUser.rejected, (state, action) => {})
  },
})

export const { setLoggedIn, logout } = userSlice.actions

export default userSlice.reducer
