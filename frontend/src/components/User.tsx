//User.tsx
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUser, updateUser, logout } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import UserAccount from "../components/UserAccount";

const User = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [editMode, setEditMode] = useState(false);
  const [pseudo, setPseudo] = useState(user?.pseudo || "");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Vérifier si l'utilisateur est connecté, sinon rediriger
  useEffect(() => {
    if (!user) {
      setShouldRedirect(true);
    }
  }, [user]);

  if (shouldRedirect) {
    return <Navigate to="/sign-in" />;
  }

  // Passer en mode édition
  const handleEdit = () => {
    setEditMode(true);
  };

  // Sauvegarder les changements de l'utilisateur
  const handleSave = () => {
    dispatch(updateUser({ pseudo }));
    setEditMode(false);
  };

  // Déconnecter l'utilisateur
  const handleLogout = () => {
    dispatch(logout());
    setShouldRedirect(true);
  };

  return (
    <main className="bg-dark">
      <div className="color-dark">
        <div className="header">
          {editMode ? (
            <>
              <label htmlFor="pseudo">Pseudo</label>
              <input
                type="text"
                id="pseudo"
                placeholder="Enter your pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
              <button type="button" className="save-button" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <>
              <h1>Welcome back<br/>
              {user?.pseudo}!</h1>
              <button type="button" className="edit-button" onClick={handleEdit}>
                Edit Pseudo
              </button>
            </>
          )}
          <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <UserAccount
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <UserAccount
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <UserAccount
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </div>
    </main>
  );
};

export default User;
