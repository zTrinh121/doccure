import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { loggerMiddleware } from '../middleware/loggerMiddleware';

//get Access token here
//https://doichevkostia.dev/blog/authentication-store-with-zustand/
export const decodeAccessToken = (accessToken) => {
  return jwtDecode(accessToken).data.data.access_token;
};

const authStore = createStore()(
  devtools(
    loggerMiddleware(
      (set) => ({
        accessToken: undefined,
        accessTokenData: undefined,
        isLoading: true,
        resetStep: '',
        resetEmail: '',

        actions: {
          setAccessToken: (accessToken) => {
            const accessTokenData = (() => {
              try {
                return accessToken ? accessToken : undefined;
              } catch (error) {
                console.error(error);
                return undefined;
              }
            })();
            set({
              accessToken,
              accessTokenData,
            });
          },

          setIsLoading: (isLoading) => {
            set({ isLoading });
          },

          setResetStep: (resetStep) => {
            set({ resetStep });
          },

          setResetEmail: (resetEmail) => {
            set({ resetEmail });
          },

          clearTokens: () =>
            set({
              accessToken: undefined,
              accessTokenData: undefined,
            }),
        },
      }),
      {
        name: 'auth-store',
        enabled: true,
      },
    ),
  ),
);

// Selectors
const accessTokenSelector = (state) => state.accessToken;
const accessTokenDataSelector = (state) => state.accessTokenData;
const isLoadingSelector = (state) => state.isLoading;
const resetStepSelector = (state) => state.resetStep;
const resetEmailSelector = (state) => state.resetEmail;
const actionsSelector = (state) => state.actions;

// getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getAccessTokenData = () =>
  accessTokenDataSelector(authStore.getState());
export const getIsLoading = () => isLoadingSelector(authStore.getState());
export const getResetStep = () => resetStepSelector(authStore.getResetStep());
export const getResetEmailSelector = () =>
  resetEmailSelector(authStore.getState());
export const getActions = () => actionsSelector(authStore.getState());

function useAuthStore(selector, equalityFn) {
  return useStore(authStore, selector, equalityFn);
}

// Hooks
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useAccessTokenData = () => useAuthStore(accessTokenDataSelector);
export const useIsLoading = () => useAuthStore(isLoadingSelector);
export const useResetStep = () => useAuthStore(resetStepSelector);
export const useResetEmail = () => useAuthStore(resetEmailSelector);
export const useActions = () => useAuthStore(actionsSelector);
