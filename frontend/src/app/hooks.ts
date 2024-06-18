// Ce fichier sert de hub central pour la réexportation des hooks Redux pré-typés.
// Ces importations sont restreintes ailleurs pour garantir une cohérence
// utilisation de hooks typés dans toute l'application.
// Nous désactivons ici la règle ESLint car c'est l'endroit désigné
// pour importer et réexporter les versions typées des hooks.
/* eslint-disable @typescript-eslint/no-restricted-imports */
import {  useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Utiliser dans toute votre application au lieu de `useDispatch` et `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
