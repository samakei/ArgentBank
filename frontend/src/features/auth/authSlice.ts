// src/features/auth/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // Importation des fonctions createAsyncThunk et createSlice de Redux Toolkit
import type { PayloadAction } from '@reduxjs/toolkit'; // Importation du type PayloadAction de Redux Toolkit
import axios from 'axios'; // Importation de la bibliothèque axios pour les requêtes HTTP
import type { RootState } from '../../app/store'; // Importation du type RootState pour le typage du store Redux

// Interface décrivant la structure des données utilisateur
interface UserProfile {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
  status: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

// Interface décrivant l'état d'authentification dans Redux
interface AuthState {
  user: UserProfile | null; // Utilisateur connecté ou null si non connecté
  token: string | null; // Token JWT ou null si non présent
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Statut de l'action asynchrone
  error: string | null; // Message d'erreur en cas d'échec
}

// État initial de l'authentification
const initialState: AuthState = {
  user: null, // Aucun utilisateur n'est connecté initialement
  token: localStorage.getItem('token'), // Récupération du token JWT depuis le localStorage. 
  status: 'idle', // Statut initial de l'état est "idle", indiquant aucune action en cours
  error: null, // Aucun message d'erreur initialement
};

// Action asynchrone pour se connecter à l'API avec email et mot de passe
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('/user/login', { email, password }); // Envoi des informations de connexion
      const data = response.data;
      const token = data.body?.token;

      if (!token) {
        throw new Error("Token non retourné par l'API"); // Erreur si le token n'est pas retourné
      }

      localStorage.setItem('token', token); // Stockage du token dans le localStorage
      return { token }; // Retourne les données utilisateur et le token
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); // Retourne le message d'erreur
    }
  }
);

// Action asynchrone pour récupérer le profil utilisateur avec le token JWT
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState; // Récupération de l'état actuel du store
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("Token manquant"); // Erreur si le token n'est pas présent
    }

    try {
      const response = await axios.post('/user/profile', {}, {
        headers: {
          'Authorization': `Bearer ${token}`, // Ajout du token dans les en-têtes de la requête
        },
      });

      if (response.status !== 200) {
        throw new Error("Échec de la récupération du profil utilisateur"); // Erreur si le statut de la réponse n'est pas 200
      }

      console.log("Réponse brute de l'API :", response.data);

      // Extraction correcte des données utilisateur de la réponse API
      const user = response.data.body;

      if (!user) {
        throw new Error("Les données utilisateur ne sont pas présentes dans la réponse de l'API"); // Erreur si les données utilisateur ne sont pas présentes
      }

     console.log("Profil utilisateur récupéré :", user);
      return user as UserProfile; // Retourne les données utilisateur
    } catch (error: any) {
      console.error("Erreur lors de la récupération du profil utilisateur :", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); // Retourne le message d'erreur
    }
  }
);

// Action asynchrone pour mettre à jour le profil utilisateur avec le token JWT
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData: { userName: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState; // Récupération de l'état actuel du store
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("Token manquant"); // Erreur si le token n'est pas présent
    }

    try {
      const response = await axios.put('/user/profile', userData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Ajout du token dans les en-têtes de la requête
        },
      });
    
      return response.data.body.user as UserProfile; // Retourne les données utilisateur mises à jour
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); // Retourne le message d'erreur
    }
  }
);

// Définition du slice Redux pour gérer l'état d'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action synchrone pour déconnecter l'utilisateur
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = null;
      localStorage.removeItem('token'); // Suppression du token du localStorage
    },
    // Action synchrone pour définir le token JWT dans l'état
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload; // Mise à jour du token dans l'état
    },
  },
  // Gestion des actions asynchrones avec `extraReducers`
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'; // Mise à jour du statut lors de la tentative de connexion
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Mise à jour du statut après une connexion réussie

        state.token = action.payload.token; // Mise à jour du token
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'; // Mise à jour du statut après un échec de connexion
        state.error = action.payload as string; // Mise à jour du message d'erreur
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading'; // Mise à jour du statut lors de la récupération du profil utilisateur
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Mise à jour du statut après une récupération réussie du profil utilisateur
        state.user = action.payload; // Mise à jour des informations utilisateur
        console.log("État utilisateur mis à jour :", state.user);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed'; // Mise à jour du statut après un échec de récupération du profil utilisateur
        state.error = action.payload as string; // Mise à jour du message d'erreur
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload; // Mise à jour des informations utilisateur après une mise à jour réussie
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed'; // Mise à jour du statut après un échec de mise à jour des informations utilisateur
        state.error = action.payload as string; // Mise à jour du message d'erreur
      });
  },
});

// Export des actions et des sélecteurs pour une utilisation dans d'autres parties de l'application
export const { logout, setToken } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user; // Sélecteur pour récupérer les informations utilisateur
export const selectToken = (state: RootState) => state.auth.token; // Sélecteur pour récupérer le token
export const selectAuthStatus = (state: RootState) => state.auth.status; // Sélecteur pour récupérer le statut d'authentification
export const selectAuthError = (state: RootState) => state.auth.error; // Sélecteur pour récupérer le message d'erreur

// Export du réducteur authSlice pour l'intégrer dans le store Redux
export default authSlice.reducer;

/* Explications des principales sections :
    - login action : Utilise axios.post pour envoyer les informations de connexion et stocker le token dans localStorage.
    - fetchUserProfile action : Utilise axios.post pour récupérer les informations de l'utilisateur connecté, avec le token inclus dans les en-têtes d'autorisation.
    - updateUser action : Utilise axios.put pour envoyer les données mises à jour de l'utilisateur, avec le token inclus dans les en-têtes d'autorisation.
    - authSlice : Définit le slice Redux pour gérer l'état d'authentification, y compris les actions de connexion, déconnexion, récupération et mise à jour des informations utilisateur.
*/
