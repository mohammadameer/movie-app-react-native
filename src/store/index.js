import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { AsyncStorage } from 'react-native';
import { configurePersist } from 'zustand-persist';

const { persist } = configurePersist({
  storage: AsyncStorage,
  rootKey: 'root',
});

// the state of the app

const useStore = create(
  devtools(
    persist({ key: 'state' }, (set) => ({
      // state
      favourites: [],
      // actions
      addMovie: (movie) =>
        set((oldState) => ({ ...oldState, favourites: [...oldState.favourites, movie] })),
      deleteMovie: (movie) =>
        set((oldState) => ({
          ...oldState,
          favourites: oldState.favourites.filter(({ id }) => id !== movie.id),
        })),
    }))
  )
);

export default useStore;
