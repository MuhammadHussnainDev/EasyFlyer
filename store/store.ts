import { configureStore, AnyAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import favoritesReducer from './slices/favoritesSlice';
import brandFlyersReducer from './slices/brandSlice';
import storeFlyersReducer from './slices/storeSlice';
import eventsReducer from './slices/eventSlice';
import toggleCategory from './slices/categoriesSlice';

// Configure persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Combine reducers
const rootReducer = combineReducers({
  favorites: favoritesReducer,
  brandFlyers: brandFlyersReducer,
  storeFlyers: storeFlyersReducer,
  Events: eventsReducer,
  categories: toggleCategory,
});

// Wrap the root reducer to handle a global RESET_STATE action (dispatched on logout)
const resettableRootReducer = (
  state: ReturnType<typeof rootReducer> | undefined,
  action: AnyAction,
) => {
  if (action.type === 'RESET_STATE') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, resettableRootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['_persist'],
      },
    }),
});

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

export const persistor = persistStore(store);
export default store;
