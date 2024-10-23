
import { create } from 'zustand';

// import jwtDecode from 'jwt-decode';

export const useAuthStore = create((set) => ({
  username: '',
  accessToken: '',
  updateUsername: (username) => set(() => ({ username: username })),
  updateAccessToken: (accessToken) => set(() => ({ accessToken: accessToken })),
}))