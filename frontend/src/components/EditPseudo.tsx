import  { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateUser, selectUser } from '../features/auth/authSlice';

interface EditPseudoProps {
  initialPseudo: string;
  onCancel: () => void;
  onSaveSuccess: () => void;
}

const EditPseudo: React.FC<EditPseudoProps> = ({ initialPseudo, onCancel, onSaveSuccess }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [pseudo, setPseudo] = useState(initialPseudo);

  const handleSave = () => {
    if (user) {
      dispatch(updateUser({ userName: pseudo }))
        .unwrap()
        .then(() => {
          onSaveSuccess();
        })
        .catch((error) => {
          console.error('Erreur de mise à jour du pseudo :', error);
        });
    }
  };

  return (
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
      <button type="button" className="cancel-button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default EditPseudo;

/*
Explications

    EditPseudo.tsx: Ce nouveau composant est responsable de la gestion de l'édition du pseudo de l'utilisateur. Il reçoit les props initialPseudo, onCancel, et onSaveSuccess pour gérer les interactions.
        initialPseudo : Valeur initiale du pseudo à éditer.
        onCancel : Fonction à appeler lorsque l'utilisateur annule l'édition.
        onSaveSuccess : Fonction à appeler lorsque l'édition est réussie.*/