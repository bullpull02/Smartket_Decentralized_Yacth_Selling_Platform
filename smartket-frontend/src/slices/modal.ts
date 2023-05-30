import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IModal {
  walletConnectModalOpen: boolean
  loadingModalOpen: boolean
}

const initialState: IModal = {
  walletConnectModalOpen: false,
  loadingModalOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setWalletConnectModalOpen(state, action: PayloadAction<boolean>) {
      state.walletConnectModalOpen = action.payload
    },
    setLoadingModalOpen(state, action: PayloadAction<boolean>) {
      state.loadingModalOpen = action.payload
    },
  },
})

export const { setWalletConnectModalOpen, setLoadingModalOpen } = modalSlice.actions

export default modalSlice.reducer
