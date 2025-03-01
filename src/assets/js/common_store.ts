/**
 * @fileoverview [공통] Redux 스토어 설정
 *
 * @author 
 * @version 1.0.0
 */
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. 유저 정보 타입 정의
interface User {
  id: string;
  name: string;
  email: string;
}

// 2. 인증 상태 타입 정의
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// 3. 초기 상태 정의
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// 4. Slice 생성
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// 5. 액션 & 리듀서 내보내기
export const { login, logout } = authSlice.actions;
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

// 6. RootState 및 AppDispatch 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;