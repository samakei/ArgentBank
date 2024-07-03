// Pieds d'applications
// Importation de useEffect depuis React
import { useEffect } from 'react';
// Importation de BrowserRouter, Route et Routes depuis react-router-dom pour la gestion de la navigation
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Importation du hook personnalisé useAppDispatch pour utiliser le dispatch Redux
import { useAppDispatch } from './app/hooks';
// Importation de l'action setToken depuis le slice d'authentification
import { setToken } from './features/auth/authSlice';
// Importation des composants de l'application
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import UserPage from './pages/UserPage';
import Error404Page from './pages/Error404Page';
import Footer from './components/Footer';
// Importation du fichier CSS principal
import './styles/main.css';

const App = () => {
  const dispatch = useAppDispatch(); // Initialisation du hook dispatch pour déclencher des actions Redux

  // useEffect : Exécute une fonction au montage du composant
  useEffect(() => {
    const token = localStorage.getItem('token'); // Récupère le token depuis localStorage
    if (token) {
      console.log('Token from localStorage:', token); // Log pour vérifier la présence du token dans localStorage pour des fins de débogage
      dispatch(setToken(token)); // Dispatche l'action pour définir le token dans l'état global de l'application
    } else {
      console.warn('Token from localStorage is undefined or null'); // Avertissement si le token est absent ou invalide
    }
  }, [dispatch]); // useEffect dépendant du dispatch

  return (
    <Router> {/* Enveloppe l'application avec le Router pour gérer la navigation */}
      <div>
        <Navbar /> {/* Composant de la barre de navigation */}
        <main>
          <Routes> {/* Définit les routes de l'application */}
            <Route path="/" element={<HomePage />} /> {/* Route pour la page d'accueil */}
            <Route path="/sign-in" element={<SignInPage />} /> {/* Route pour la page de connexion */}
            <Route path="/user" element={<UserPage />} /> {/* Route pour la page utilisateur */}
            <Route path="*" element={<Error404Page />} /> {/* Route de secours pour les pages non trouvées */}
          </Routes>
        </main>
        <Footer /> {/* Composant du pied de page */}
      </div>
    </Router>
  );
};

export default App; // Exportation du composant App

/* Explications

useEffect : Exécute une fonction au montage du composant. Ici, il récupère le token depuis localStorage et le dispatche dans Redux.
    console.log : Log pour vérifier la présence du token dans localStorage pour des fins de débogage.
    dispatch(setToken(token)) : Dispatche l'action pour définir le token dans l'état global de l'application.
    console.warn : Avertissement si le token est absent ou invalide.
*/
