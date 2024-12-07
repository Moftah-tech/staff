import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

export interface UserState {
    isAuthenticated?: boolean
    accessToken?: string | null
    refreshToken?: string | null
}

const initialState: UserState = {
    isAuthenticated: !!Cookies.get('token'),
    accessToken: Cookies.get('token') ?? null,
    refreshToken: Cookies.get('rfsToken') ?? null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: state => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            Cookies.remove('token');
            Cookies.remove('rfsToken');
        },
        setTokens: (state, action: PayloadAction<any>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
        },
       
    },
})

export const {  logout, setTokens } = userSlice.actions

export default userSlice.reducer
