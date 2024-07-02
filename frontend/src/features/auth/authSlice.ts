// src/features/auth/authSlice.ts
// src/features/auth/authSlice.ts
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';

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
  user: UserProfile | null; // Utilisateur connecté
  token: string | null; // Token JWT
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Statut de l'action asynchrone
  error: string | null; // Message d'erreur en cas d'échec
}

// État initial de l'authentification
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  status: 'idle',
  error: null,
};

// Action asynchrone pour se connecter à l'API avec email et mot de passe
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('/user/login', { email, password });
      const data = response.data;
      const token = data.body?.token;

      if (!token) {
        throw new Error("Token non retourné par l'API");
      }

      localStorage.setItem('token', token);
      return { user: data.body.user as UserProfile, token };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Action asynchrone pour récupérer le profil utilisateur avec le token JWT
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("Token manquant");
    }

    try {
      const response = await axios.post('/user/profile', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Échec de la récupération du profil utilisateur");
      }

      console.log("Réponse brute de l'API :", response.data);

      // Extraction correcte des données utilisateur de la réponse API
      const user = response.data.body;

      if (!user) {
        throw new Error("Les données utilisateur ne sont pas présentes dans la réponse de l'API");
      }

      console.log("Profil utilisateur récupéré :", user);

      return user as UserProfile;
    } catch (error: any) {
      console.error("Erreur lors de la récupération du profil utilisateur :", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Action asynchrone pour mettre à jour le profil utilisateur avec le token JWT
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData: { userName: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("Token manquant");
    }

    try {
      const response = await axios.put('/user/profile', userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data.body.user as UserProfile;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
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
      localStorage.removeItem('token');
    },
    // Action synchrone pour définir le token JWT dans l'état
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  // Gestion des actions asynchrones avec `extraReducers`
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        console.log("État utilisateur mis à jour :", state.user);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export des actions et des sélecteurs pour une utilisation dans d'autres parties de l'application
export const { logout, setToken } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

// Export du réducteur authSlice pour l'intégrer dans le store Redux
export default authSlice.reducer;


/* Explications des principales sections :
    - login action : Utilise axios.post pour envoyer les informations de connexion et stocker le token dans localStorage.
    - signup action : Utilise axios.post pour envoyer les informations d'inscription et stocker le token dans localStorage.
    - fetchUser action : Utilise axios.post pour récupérer les informations de l'utilisateur connecté, avec le token inclus dans les en-têtes d'autorisation.
    - updateUser action : Utilise axios.put pour envoyer les données mises à jour de l'utilisateur, avec le token inclus dans les en-têtes d'autorisation.
    - authSlice : Définit le slice Redux pour gérer l'état d'authentification, y compris les actions de connexion, déconnexion, récupération et mise à jour des informations utilisateur.
*/
