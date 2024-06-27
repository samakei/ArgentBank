// src/features/auth/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axios from 'axios';

// Interface pour l'utilisateur
interface User {
  email: string;
  password: string;
  pseudo: string;
  userName: string;
  firstName: string;
  lastName: string;
}

// Interface pour l'état d'authentification
interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// État initial de l'authentification
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'), // Récupérer le token du localStorage
  status: 'idle',
  error: null,
};

// Action asynchrone pour la connexion
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('/user/login', { email, password });

      console.log('Réponse de l\'API:', response.data); // Journaliser la réponse complète

      const data = response.data;
      const token = data.body?.token;

      if (!token) {
        console.error('Token non retourné par l\'API:', data); // Journaliser la réponse si pas de token
        throw new Error('Token non retourné par l\'API');
      }

      localStorage.setItem('token', token); // Stocker le token
      return { user: data.body.user, token }; // Assurez-vous que `data.body.user` est correct
    } catch (error: any) {
      console.error('Erreur de connexion:', error); // Journaliser l'erreur pour débogage
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Action asynchrone pour mettre à jour les informations de l'utilisateur
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData: { pseudo: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    try {
      const response = await axios.put('/user/profile', userData, {
        headers: {
          'Authorization': `Bearer ${state.auth.token}`, // Inclure le token dans les en-têtes
        }
      });

      const data = response.data;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Création du slice pour l'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    // Action pour la déconnexion
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Nettoyer le localStorage lors de la déconnexion
    },
    // Action pour définir le token
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'; // Mise à jour de l'état lors de la connexion en cours
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.status = 'succeeded'; // Mise à jour de l'état lors de la connexion réussie
        state.user = action.payload.user; // Stocker l'utilisateur connecté
        state.token = action.payload.token; // Stocker le token JWT
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'; // Mise à jour de l'état lors de l'échec de la connexion
        state.error = action.payload as string; // Stocker le message d'erreur
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload; // Mise à jour des informations de l'utilisateur
      });
  },
});

// Exportation de l'action logout pour l'utiliser dans les composants
export const { logout, setToken } = authSlice.actions;

// Sélecteurs pour récupérer des données spécifiques de l'état
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

// Exportation du reducer pour l'ajouter au store
export default authSlice.reducer;


/*Explications
    axios.defaults.baseURL : Définit l'URL de base pour toutes les requêtes Axios, simplifiant ainsi les requêtes en n'ayant à spécifier que les chemins relatifs.
    login action : Utilise axios.post pour envoyer les informations de connexion et stocker le token dans localStorage.
    updateUser action : Utilise axios.put pour envoyer les données mises à jour de l'utilisateur, avec le token inclus dans les en-têtes d'autorisation.
    Error handling : Utilise error.response?.data?.message pour obtenir le message d'erreur du serveur si disponible. */