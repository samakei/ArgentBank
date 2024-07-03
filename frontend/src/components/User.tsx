//User.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser, selectToken, fetchUserProfile } from '../features/auth/authSlice';
import UserAccount from './UserAccount';
import EditPseudo from './EditPseudo'; //  le chemin editpseudo

const User = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const [editMode, setEditMode] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!user && token) {
      dispatch(fetchUserProfile());
    } else if (!token) {
      setShouldRedirect(true);
    }
  }, [user, token, dispatch]);

  if (shouldRedirect) {
    return <Navigate to="/sign-in" />;
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveSuccess = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div className="color-main-account">
      <main className="main bg-dark">
        <div className="header">
          {editMode ? (
            <EditPseudo
              initialPseudo={user?.userName || ""}
              onCancel={handleCancel}
              onSaveSuccess={handleSaveSuccess}
            />
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

/* Exportation parti editpseudo
    User.tsx: Ce composant utilise maintenant EditPseudo pour gérer le mode édition. Les fonctions handleEdit, handleSaveSuccess, et handleCancel sont responsables de la transition entre les modes d'affichage et d'édition.

En séparant le mode édition dans un composant distinct, vous rendez le code plus modulaire, plus facile à comprendre et à maintenir. */