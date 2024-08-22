import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authActions';

const token = localStorage.getItem('token') || null;

interface AuthState {
    loading: boolean;
    error: string | null;
    success: boolean;
    userInfo: any;
    token: string | null;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    success: false,
    userInfo: null,
    token,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.userInfo = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error';
            });
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.userInfo = action.payload;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Unknown error';
            });
    },
});

export default authSlice.reducer;