import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';

//get Access token here
//https://doichevkostia.dev/blog/authentication-store-with-zustand/

const gApiStore = createStore()(
  devtools(
    (set, get) => ({
      gApiAccessToken: undefined,
      gApiExpirationTime: undefined,
      actions: {
        setGApiAccessToken: (gApiAccessToken) => {
          set({ gApiAccessToken });
        },

        setGApiExpirationTime: (expirationTime) => {
          set({ expirationTime });
        },
        setGApi: (newGApiAccessToken, newExpirationTime) => {
          set((state) => {
            if (newGApiAccessToken === state.gApiAccessToken) return state;
            else return { gApiAccessToken: newGApiAccessToken, gApiExpirationTime: newExpirationTime }
          });
        },

      }
    }),
    {
      name: 'gApiStore',
      enabled: true,
    }
  )
);



// Selectors
const gApiAccessTokenSelector = (state) => state.gApiAccessToken;
const gApiExpirationTimeSelector = (state) => state.gApiExpirationTime;
const actionsSelector = (state) => state.actions;

// getters
export const getGApiAccessToken = () => gApiAccessTokenSelector(gApiStore.getState());
export const getGApiExpirationTime = () => gApiExpirationTimeSelector(gApiStore.getState());
//actions could benefit from slice pattern
export const getGApiActions = () => actionsSelector(gApiStore.getState());


function useGApiStore(selector, equalityFn) {
  return useStore(gApiStore, selector, equalityFn);
}

// Hooks
export const useGApiAccessToken = () => useGApiStore(gApiAccessTokenSelector);
export const useGApiExpirationTime = () => useGApiStore(gApiExpirationTimeSelector);
export const useGApiActions = () => useGApiStore(actionsSelector);
