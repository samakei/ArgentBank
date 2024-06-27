//SignIn.tsx
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status); // Récupère le statut de l'authentification
  const error = useAppSelector((state) => state.auth.error); // Récupère les erreurs d'authentification
  const token = useAppSelector((state) => state.auth.token); // Récupère le token d'authentification

  // États pour stocker l'email et le mot de passe saisis par l'utilisateur
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fonction pour gérer la soumission du formulaire de connexion
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page
    dispatch(login({ email, password })); // Déclenche l'action de connexion
  };

  //  useEffect pour stocker le token dans localStorage lorsque le token change
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); // Stocke le token dans localStorage
      
    }
  }, [token]); // Dépendance sur le token

  // Redirige vers la page utilisateur (profil) si l'authentification réussit
  if (status === "succeeded") {
    return <Navigate to="/user" />;
  }

  return (
    <div className="color-main-account">
     <main className="main bg-dark">
      
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Met à jour l'état de l'email
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe
              />
            </div>
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
            {/* Affiche un message d'erreur si l'authentification échoue */}
            {status === "failed" && <div className="error">{error}</div>}
          </form>
        </section>

    </main>
    </div>
  );
};

export default SignIn;
