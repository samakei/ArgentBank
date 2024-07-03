//SignIn.tsx
// Importation des hooks useState et useEffect de React
import { useState, useEffect } from "react";
// Importation de Navigate pour la redirection de React Router
import { Navigate } from "react-router-dom";
// Importation de l'action de connexion depuis le slice d'authentification
import { login } from "../features/auth/authSlice";
// Importation des hooks personnalisés pour utiliser le dispatch et sélectionner l'état de l'application
import { useAppSelector, useAppDispatch } from "../app/hooks";

const SignIn = () => {
  const dispatch = useAppDispatch(); // Initialisation du hook dispatch pour déclencher des actions Redux
  const status = useAppSelector((state) => state.auth.status); // Récupération du statut d'authentification depuis l'état global
  const error = useAppSelector((state) => state.auth.error); // Récupération des erreurs d'authentification depuis l'état global
  const token = useAppSelector((state) => state.auth.token); // Récupération du token d'authentification depuis l'état global

  // États pour stocker l'email et le mot de passe saisis par l'utilisateur
  const [email, setEmail] = useState(""); // État pour l'email
  const [password, setPassword] = useState(""); // État pour le mot de passe

  // Fonction pour gérer la soumission du formulaire de connexion
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page
    dispatch(login({ email, password})); // Déclenche l'action de connexion avec l'email et le mot de passe
  };

  // useEffect pour stocker le token dans localStorage lorsque le token change
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); // Stocke le token dans localStorage si le token est défini
    }
  }, [token]); // useEffect dépendant du token

  // Redirige vers la page utilisateur (profil) si l'authentification réussit
  if (status === "succeeded") {
    return <Navigate to="/user" />; // Redirection vers la page /user
  } 

  return (
    <div className="color-main-account">
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i> {/* Icône de l'utilisateur */}
          <h1>Sign In</h1> {/* Titre de la section */}
          <form onSubmit={handleSubmit}> {/* Formulaire de connexion */}
            <div className="input-wrapper">
              <label htmlFor="email">Email</label> {/* Étiquette pour l'email */}
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Met à jour l'état de l'email
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Mot de passe</label> {/* Étiquette pour le mot de passe */}
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe
              />
            </div>
            <button className="sign-in-button" type="submit">
              Sign In
            </button> {/* Bouton de soumission */}
            {/* Affiche un message d'erreur si l'authentification échoue */}
            {status === "failed" && <div className="error">{error}</div>} {/* Affichage des erreurs */}
          </form>
        </section>
      </main>
    </div>
  );
};

export default SignIn; // Exportation du composant SignIn

/*Explications supplémentaires :

    Hooks de React :
        useState permet de créer des états locaux dans le composant.
        useEffect permet d'exécuter des effets secondaires, comme stocker le token dans localStorage chaque fois qu'il change.

    Hooks personnalisés :
        useAppSelector est utilisé pour sélectionner des parties de l'état global de l'application.
        useAppDispatch est utilisé pour obtenir le dispatch pour déclencher des actions Redux.

    Gestion de la soumission du formulaire :
        Lors de la soumission du formulaire, la fonction handleSubmit empêche le rechargement de la page et déclenche l'action de connexion avec l'email et le mot de passe saisis.

    Stockage du token :
        useEffect surveille les changements du token et le stocke dans localStorage lorsque le token est mis à jour.

    Redirection :
        Si l'authentification réussit (status === "succeeded"), l'utilisateur est redirigé vers la page /user.*/