import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUser, updateUser, logout } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import UserAccount from "../components/UserAccount";

const User = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [shouldRedirect, setShouldRedirect] = useState(false); // Fixed initial state

  useEffect(() => {
    if (!user) {
      console.log("L'utilisateur n'est pas connecté, redirigé vers la connexion");
      setShouldRedirect(false);
    }
  }, [user]);

  if (shouldRedirect) {
    return <Navigate to="/sign-in" />;
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    dispatch(updateUser({ firstName, lastName }));
    setEditMode(false); // Corrigé pour désactiver le mode édition après la sauvegarde
  };

  const handleLogout = () => {
    dispatch(logout());
    setShouldRedirect(true); // Redirection vers la connexion après la déconnexion
  };

  return (
    <main className="bg-dark">
      <div className="color-dark">
        <div className="header">
          {editMode ? (
            <>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <button type="button" className="save-button" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <>
              <h1>Welcome back<br />{user?.firstName} {user?.lastName}!</h1>
              <button type="button" className="edit-button" onClick={handleEdit}>
                Edit Name
              </button>
            </>
          )}
          <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
            <div>
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
       </div>
    </main>
  );
};

export default User;
