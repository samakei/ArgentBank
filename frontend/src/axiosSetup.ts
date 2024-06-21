// src/axiosSetup.ts
//Ajout un intercepteur qui attache automatiquement le token JWT à chaque requête sortante,
import axios from "axios"
import { store } from "./app/store" // l'import app/store

axios.defaults.baseURL = "http://localhost:3001/api/v1" // l'URL de base

// Ajout un intercepteur pour attacher le token JWT à chaque requête
axios.interceptors.request.use(
  config => {
    const state = store.getState()
    const token = state.auth.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)
//axios.defaults.baseURL est utilisée pour définir l'URL de base pour toutes les requêtes axios dans votre application. Ensuite, lorsque vous faites des requêtes spécifiques, vous ajoutez simplement le chemin relatif du point de terminaison à cette base.
///En définissant l'URL de base, vous simplifiez vos requêtes en évitant de répéter l'URL de base à chaque fois. Vous n'avez besoin que des chemins relatifs pour vos différents points de terminaison. Cela rend votre code plus propre et plus facile à maintenir.