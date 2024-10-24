
import { create } from 'zustand';

// import jwtDecode from 'jwt-decode';

export const useAuthStore = create((set) => ({
  accessToken: '',
  setAccessToken: (accessToken) => set(() => ({ accessToken: accessToken })),
}))