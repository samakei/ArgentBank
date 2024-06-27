import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import authSlice from "../features/auth/authSlice"

// `combineSlices` combine automatiquement les réducteurs en utilisant
// leurs `reducerPath`s, donc nous n'avons plus besoin d'appeler `combineReducers`.
const rootReducer = combineSlices( {auth: authSlice})
// Déduire le type `RootState` à partir du réducteur racine
export type RootState = ReturnType<typeof rootReducer>

// La configuration du magasin est enveloppée dans `makeStore` pour permettre la réutilisation
// lors de la configuration de tests nécessitant la même configuration de magasin
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // L'ajout du middleware API permet la mise en cache, l'invalidation, l'interrogation,
    // et d'autres fonctionnalités utiles de `rtk-query`.
   
    preloadedState,
  })
  // configure les écouteurs en utilisant les valeurs par défaut fournies
  // facultatif, mais requis pour les comportements `refetchOnFocus`/`refetchOnReconnect`
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

// Déduire le type de `store`
export type AppStore = typeof store
// Déduire le type `AppDispatch` à partir du magasin lui-même
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
