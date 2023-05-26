import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { apiLogin, apiCreateUser, apiUpdateUser, apiDeleteUser } from 'utils/user'
import { apiCreateYacht } from 'utils/yacht'

interface IUser {
  user: any
  isLoggedIn: boolean
  yachts: any[]
}

const initialState: IUser = {
  user: {},
  isLoggedIn: false,
  yachts: [],
}

export const login = createAsyncThunk('user/login', async () => {
  try {
    const data = await apiLogin()
    return data
  } catch (err) {
    throw err
  }
})

export const createUser = createAsyncThunk('user/create', async (params: any) => {
  try {
    const data = await apiCreateUser(params)
    return data
  } catch (err) {
    throw err
  }
})

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ id, params }: { id: number; params: any }) => {
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

export const createYacht = createAsyncThunk('user/createYacht', async (params: any) => {
  try {
    const data = await apiCreateYacht(params)
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
      localStorage.removeItem('signature')
      localStorage.removeItem('walletAddress')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload.success) {
        state.isLoggedIn = true
        state.user = { ...action.payload.data.user }
        state.yachts = [...action.payload.data.user.yachts]
      }
    })
    builder.addCase(createUser.fulfilled, (state, action) => {})
    builder.addCase(createUser.rejected, (state, action) => {})
    builder.addCase(updateUser.fulfilled, (state, action) => {})
    builder.addCase(updateUser.rejected, (state, action) => {})
    builder.addCase(deleteUser.fulfilled, (state, action) => {})
    builder.addCase(deleteUser.rejected, (state, action) => {})
    builder.addCase(createYacht.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.yachts = [...action.payload.data.yachts]
      }
    })
  },
})

export const { setLoggedIn, logout } = userSlice.actions

export default userSlice.reducer
