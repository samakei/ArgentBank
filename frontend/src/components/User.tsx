//User.tsx
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchUserProfile, selectUser, updateUser, selectToken } from "../features/auth/authSlice";
import UserAccount from "../components/UserAccount";
import { Navigate } from "react-router-dom";

const User = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken) || localStorage.getItem("token");

  const [editMode, setEditMode] = useState(false);
  const [pseudo, setPseudo] = useState(user?.userName || "");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // useEffect pour récupérer le profil utilisateur si le token est présent
  useEffect(() => {
    if (!user && token) {
      dispatch(fetchUserProfile())
        .unwrap()
        .then((fetchedUser) => {
          console.log("Utilisateur récupéré :", fetchedUser);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données utilisateur :', error);
          setShouldRedirect(true);
        });
    } else if (!token) {
      setShouldRedirect(true);
    }
  }, [user, token, dispatch]);

  // Redirection vers la page de connexion si l'utilisateur n'est pas authentifié
  if (shouldRedirect) {
    return <Navigate to="/sign-in" />;
  }

  // Gestion du passage en mode édition
  const handleEdit = () => {
    setEditMode(true);
  };

  // Gestion de la sauvegarde des modifications
  const handleSave = () => {
    if (user) {
      dispatch(updateUser({ userName: pseudo }))
        .unwrap()
        .then(() => setEditMode(false))
        .catch((error) => {
          console.error('Erreur de mise à jour du pseudo :', error);
        });
    }
  };

  // Gestion de l'annulation des modifications
  const handleCancel = () => {
    setEditMode(false);
    setPseudo(user?.userName || "");
  };

  return (
    <div className="color-main-account">
      <main className="main bg-dark">
        <div className="header">
          {editMode ? (
            <div className="edit_form">
              <h1>Edit username</h1>
              <label htmlFor="edit-pseudo">Pseudo</label>
              <input
                type="text"
                id="edit-pseudo"
                placeholder="Enter your new pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
              <div>
                <label htmlFor="firstName">First name :</label>
                <input
                  type="text"
                  id="firstName"
                  value={user?.firstName || ""}
                  disabled
                  className="text_input"
                />
              </div>
              <div>
                <label htmlFor="lastName">Last name :</label>
                <input
                  type="text"
                  id="lastName"
                  value={user?.lastName || ""}
                  disabled
                  className="text_input"
                />
              </div>
              <button type="button" className="save-button" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <h2>
                Welcome back<br />
                {user?.userName || "User"}!
              </h2>
              <button type="button" className="edit-button" onClick={handleEdit}>
                Edit Pseudo
              </button>
            </div>
          )}
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
      </main>
    </div>
  );
};

export default User;
