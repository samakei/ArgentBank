import { useState } from 'react'; // Importation du hook useState de React pour gérer l'état local du composant
import { useAppDispatch, useAppSelector } from '../app/hooks'; // Importation des hooks personnalisés pour accéder au store Redux et dispatcher des actions
import { updateUser, selectUser } from '../features/auth/authSlice'; // Importation de l'action updateUser et du sélecteur selectUser depuis le slice d'authentification

interface EditPseudoProps {
  initialPseudo: string; // Propriété pour le pseudo initial
  onCancel: () => void; // Fonction à appeler lors de l'annulation
  onSaveSuccess: () => void; // Fonction à appeler lorsque la sauvegarde est réussie
}

const EditPseudo: React.FC<EditPseudoProps> = ({ initialPseudo, onCancel, onSaveSuccess }) => {
  const dispatch = useAppDispatch(); // Initialisation du hook useAppDispatch pour dispatcher des actions
  const user = useAppSelector(selectUser); // Utilisation du sélecteur pour récupérer les informations de l'utilisateur connecté depuis le store
  const [pseudo, setPseudo] = useState(initialPseudo); // État local pour stocker le pseudo édité, initialisé avec initialPseudo

  const handleSave = () => {
    if (user) { // Vérifie si l'utilisateur est connecté
      dispatch(updateUser({ userName: pseudo })) // Dispatch l'action updateUser avec le nouveau pseudo
        .unwrap() // Dépile la promesse pour gérer les résultats de manière asynchrone
        .then(() => {
          onSaveSuccess(); // Appelle la fonction onSaveSuccess en cas de réussite
        })
        .catch((error) => {
          console.error('Erreur de mise à jour du pseudo :', error); // Log une erreur en cas d'échec
        });
    }
  };

  return (
    <div className="edit_form"> {/* Conteneur principal du formulaire d'édition */}
      <h1>Edit username</h1> {/* Titre du formulaire */}
      <label htmlFor="edit-pseudo">Pseudo</label> {/* Étiquette pour le champ de saisie du pseudo */}
      <input
        type="text"
        id="edit-pseudo"
        placeholder="Enter your new pseudo" // Texte indicatif dans le champ de saisie
        value={pseudo} // Valeur actuelle du champ de saisie
        onChange={(e) => setPseudo(e.target.value)} // Met à jour l'état du pseudo à chaque changement
      />
      <div> {/* Conteneur pour le prénom */}
        <label htmlFor="firstName">First name :</label> {/* Étiquette pour le champ de prénom */}
        <input
          type="text"
          id="firstName"
          value={user?.firstName || ""} // Valeur du champ de prénom, désactivé si l'utilisateur n'est pas connecté
          disabled // Désactive le champ pour empêcher l'édition
          className="text_input" // Classe CSS pour le style du champ
        />
      </div>
      <div> {/* Conteneur pour le nom de famille */}
        <label htmlFor="lastName">Last name :</label> {/* Étiquette pour le champ de nom de famille */}
        <input
          type="text"
          id="lastName"
          value={user?.lastName || ""} // Valeur du champ de nom de famille, désactivé si l'utilisateur n'est pas connecté
          disabled // Désactive le champ pour empêcher l'édition
          className="text_input" // Classe CSS pour le style du champ
        />
      </div>
      <button type="button" className="save-button" onClick={handleSave}> {/* Bouton de sauvegarde */}
        Save
      </button>
      <button type="button" className="cancel-button" onClick={onCancel}> {/* Bouton d'annulation */}
        Cancel
      </button>
    </div>
  );
};

export default EditPseudo; // Exportation du composant EditPseudo pour utilisation dans d'autres parties de l'application

/*
Explications

    import : Importation des hooks et fonctions nécessaires.
    interface EditPseudoProps : Définition des propriétés attendues par le composant.
    const EditPseudo : Déclaration du composant fonctionnel avec les propriétés destructurées.
    useState : Initialisation de l'état local pour le pseudo édité.
    useAppDispatch : Récupération de la fonction de dispatch pour envoyer des actions Redux.
    useAppSelector : Récupération des informations utilisateur depuis le store Redux.
    handleSave : Fonction pour gérer la sauvegarde du pseudo édité.
    return : Rendu JSX du composant avec les champs de saisie et les boutons.
*/
