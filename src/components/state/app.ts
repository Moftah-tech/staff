import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface AppState {
  isLoading: boolean
  headerTitle: string
  errorAlert:boolean
  alertTitle: string
}

const initialState: AppState = {
  isLoading: false,
  headerTitle: "",
  errorAlert:false,
  alertTitle: "Something went wrong!",
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading =  action.payload;
        },
        setHeaderTitle: (state, action: PayloadAction<string>) => {
          state.headerTitle =  action.payload;
      },
      setErrorAlert:(state, action: PayloadAction<boolean>) => {
        state.errorAlert = action.payload;;
      },
      setAlertTitle:(state, action: PayloadAction<string>) => {
        state.alertTitle = action.payload
      }
    },
})

export const { setIsLoading, setHeaderTitle,setErrorAlert, setAlertTitle } = appSlice.actions

export default appSlice.reducer
