//User.tsx
import { useEffect, useState } from 'react'; // Importation des hooks useEffect et useState de React
import { Navigate } from 'react-router-dom'; // Importation du composant Navigate de React Router pour la redirection
import { useAppDispatch, useAppSelector } from '../app/hooks'; // Importation des hooks personnalisés pour accéder au store Redux et dispatcher des actions
import { selectUser, selectToken, fetchUserProfile } from '../features/auth/authSlice'; // Importation des sélecteurs et actions depuis le slice d'authentification
import UserAccount from './UserAccount'; // Importation du composant UserAccount
import EditPseudo from './EditPseudo'; // Importation du composant EditPseudo pour l'édition du pseudo

const User = () => {
  const dispatch = useAppDispatch(); // Initialisation du hook useAppDispatch pour dispatcher des actions
  const user = useAppSelector(selectUser); // Utilisation du sélecteur pour récupérer les informations de l'utilisateur connecté depuis le store
  const token = useAppSelector(selectToken); // Utilisation du sélecteur pour récupérer le token d'authentification depuis le store
  const [editMode, setEditMode] = useState(false); // État local pour gérer le mode édition
  

  useEffect(() => {
    if (!user && token) { // Si l'utilisateur n'est pas connecté mais qu'un token existe
      dispatch(fetchUserProfile()); // Dispatcher l'action pour récupérer le profil utilisateur
    } 
  }, [user, token, dispatch]); // Dépendances du useEffect

  if (!token) { // Si shouldRedirect est true
    return <Navigate to="/sign-in" />; // Rediriger vers la page de connexion
  }

  const handleEdit = () => {
    setEditMode(true); // Activer le mode édition
  };

  const handleSaveSuccess = () => {
    setEditMode(false); // Désactiver le mode édition après une sauvegarde réussie
  };

  const handleCancel = () => {
    setEditMode(false); // Désactiver le mode édition après une annulation
  };

  return (
    <div className="color-main-account"> {/* Conteneur principal de la page utilisateur */}
      <main className="main bg-dark"> {/* Élément main avec fond sombre */}
        <div className="header"> {/* En-tête de la section */}
          {editMode ? ( // Si le mode édition est activé
            <EditPseudo
              initialPseudo={user?.userName || ""} // Passe le pseudo initial au composant EditPseudo
              onCancel={handleCancel} // Fonction à appeler lors de l'annulation
              onSaveSuccess={handleSaveSuccess} // Fonction à appeler lors d'une sauvegarde réussie
            />
          ) : ( // Si le mode édition n'est pas activé
            <div>
              <h2>
                Welcome back<br />
                {user?.userName || "User"}! {/* Affiche le pseudo de l'utilisateur */}
              </h2>
              <button type="button" className="edit-button" onClick={handleEdit}> {/* Bouton pour activer le mode édition */}
                Edit Pseudo
              </button>
            </div>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2> {/* Titre pour les lecteurs d'écran */}
        <UserAccount
          title="Argent Bank Checking (x8349)" // Titre du compte courant
          amount="$2,082.79" // Montant du solde disponible
          description="Available Balance" // Description du solde
        />
        <UserAccount
          title="Argent Bank Savings (x6712)" // Titre du compte d'épargne
          amount="$10,928.42" // Montant du solde disponible
          description="Available Balance" // Description du solde
        />
        <UserAccount
          title="Argent Bank Credit Card (x8349)" // Titre du compte de carte de crédit
          amount="$184.30" // Montant du solde actuel
          description="Current Balance" // Description du solde
        />
      </main>
    </div>
  );
};

export default User; // Exportation du composant User pour utilisation dans d'autres parties de l'application

/* Exportation parti editpseudo
    User.tsx: Ce composant utilise maintenant EditPseudo pour gérer le mode édition. Les fonctions handleEdit, handleSaveSuccess, et handleCancel sont responsables de la transition entre les modes d'affichage et d'édition.

En séparant le mode édition dans un composant distinct, vous rendez le code plus modulaire, plus facile à comprendre et à maintenir. */
