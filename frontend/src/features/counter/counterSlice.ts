import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { fetchCount } from "./counterAPI"

export interface CounterSliceState {
  value: number
  status: "idle" | "loading" | "failed"
}

const initialState: CounterSliceState = {
  value: 0,
  status: "idle",
}

// Si vous n'utilisez pas de thunks asynchrones, vous pouvez utiliser le `createSlice` autonome.
export const counterSlice = createAppSlice({
  name: "counter",
  // `createSlice` déduira le type d'état à partir de l'argument `initialState`
  initialState,
  // Le champ `reducers` permet de définir des réducteurs et de générer les actions associées
  reducers: create => ({
    increment: create.reducer(state => {
      // Redux Toolkit nous permet d'écrire une logique "mutante" dans les réducteurs. Il
      // ne mute pas réellement l'état car il utilise la bibliothèque Immer,
      // qui détecte les changements dans un "état brouillon" et produit un tout nouveau
      // état immuable basé sur ces changements
      state.value += 1
    }),
    decrement: create.reducer(state => {
      state.value -= 1
    }),
    // Utiliser le type `PayloadAction` pour déclarer le contenu de `action.payload`
    incrementByAmount: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.value += action.payload
      },
    ),
    // La fonction ci-dessous s'appelle un thunk et nous permet d'effectuer une logique asynchrone. Il
    // peut être distribué comme une action régulière: `dispatch(incrementAsync(10))`. Ce
    // appellera le thunk avec la fonction `dispatch` comme premier argument. Asynchrone
    // le code peut ensuite être exécuté et d'autres actions peuvent être envoyées. Merci
    // généralement utilisé pour effectuer des requêtes asynchrones.
    incrementAsync: create.asyncThunk(
      async (amount: number) => {
        const response = await fetchCount(amount)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.value += action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  // Vous pouvez définir vos sélecteurs ici. Ces sélecteurs reçoivent la tranche
  // état comme premier argument.
  selectors: {
    selectCount: counter => counter.value,
    selectStatus: counter => counter.status,
  },
})

// Des créateurs d'actions sont générés pour chaque fonction de réduction de cas.
export const { decrement, increment, incrementByAmount, incrementAsync } =
  counterSlice.actions

// Les sélecteurs renvoyés par `slice.selectors` prennent l'état racine comme premier argument.
export const { selectCount, selectStatus } = counterSlice.selectors

// Nous pouvons également écrire des thunks à la main, qui peuvent contenir à la fois une logique de synchronisation et une logique asynchrone.
// Voici un exemple de distribution conditionnelle d'actions en fonction de l'état actuel.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState())

    if (currentValue % 2 === 1 || currentValue % 2 === -1) {
      dispatch(incrementByAmount(amount))
    }
  }
