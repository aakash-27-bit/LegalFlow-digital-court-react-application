
import { createSlice } from '@reduxjs/toolkit';
import { ROLES } from '../config/constants';

const initialState = {
    userId: '',
    userName: '',
    role: ROLES.USER,
};

const loginSlice = createSlice({
    name: 'userAccount',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.role = action.payload.role || ROLES.USER;
        },
        logout: (state) => {
            state.userId = '';
            state.userName = '';
            state.role = ROLES.USER;
            localStorage.removeItem('Access-token');
            localStorage.setItem('isLoggedIn', 'false');//<-- Add this line
        },
        updateProfile: (state, action) => {
            state.userName = action.payload.userName || state.userName;
            state.role = action.payload.role || state.role;
        }
    }
});

export const { login, logout, updateProfile } = loginSlice.actions;
export default loginSlice.reducer;
