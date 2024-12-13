import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';

//get Access token here
//https://doichevkostia.dev/blog/authentication-store-with-zustand/

const scrollStore = createStore()(
  devtools(
    (set) => ({
      scrollTarget: '',
      actions: {
        setScrollTarget: (scrollTarget) => {
          set({ scrollTarget });
        },
      },
    }),
    {
      name: 'scroll-store',
      enabled: true,
    },
  ),
);

// Selectors
const scrollTargetSelector = (state) => state.scrollTarget;
const actionsSelector = (state) => state.actions;

// getters
export const getScrollTarget = () =>
  scrollTargetSelector(scrollStore.getState());
export const getActions = () => actionsSelector(scrollStore.getState());

function useScrollStore(selector, equalityFn) {
  return useStore(scrollStore, selector, equalityFn);
}

// Hooks
export const useScrollTarget = () => useScrollStore(scrollTargetSelector);
export const useActions = () => useScrollStore(actionsSelector);
