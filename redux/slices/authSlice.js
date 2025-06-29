// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';


const tokenFromStorage = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
let user = null;
if (tokenFromStorage) {
  try {
    user = jwtDecode(tokenFromStorage);
  } catch {
    localStorage.removeItem('token');
  }
}

const initialState = {
  token: tokenFromStorage,
  user,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const token = action.payload;
      state.token = token;
      try {
        state.user = jwtDecode(token);
        localStorage.setItem('token', token);
      } catch {
        state.user = null;
      }
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
