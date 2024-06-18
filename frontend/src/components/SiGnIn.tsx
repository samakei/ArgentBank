//SignIn.tsx
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const error = useAppSelector((state) => state.auth.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch l'action login avec username et password
    dispatch(login({ email, password }));

    // Réinitialiser les champs après la soumission
    setEmail("");
    setPassword("");
  };

  if (status === "succeeded") {
    // Redirection vers la page de l'utilisateur après la connexion réussie
    return <Navigate to="/user" />;
  }

  return (
    <main className="bg-dark">
      <div className="color-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Se souvenir de moi</label>
            </div>
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
            {status === "failed" && <div className="error">{error}</div>}
          </form>
        </section>
      </div>
    </main>
  );
};

export default SignIn;
