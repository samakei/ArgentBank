// user/UserPage.tsx
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice"; // Assurez-vous d'importer correctement le sélecteur
import { Navigate } from "react-router-dom";

const User = () => {
  const user = useAppSelector(selectUser);

  // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {/* Ajoutez ici le contenu des comptes de l'utilisateur */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default User;
