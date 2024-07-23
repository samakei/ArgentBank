// Composant/Navbar.tsx
import { NavLink } from "react-router-dom"; // Importation de NavLink pour naviguer entre les pages
import { useAppSelector, useAppDispatch } from "../app/hooks"; // Importation des hooks personnalisés pour accéder au store Redux et dispatcher des actions
import { selectUser, logout } from "../features/auth/authSlice"; // Importation des sélecteurs et actions depuis le slice d'authentification
import logo from "../assets/argentBankLogo.webp"; // Importation du logo de la banque


const Navbar = () => {
  const dispatch = useAppDispatch(); // Initialisation du hook useAppDispatch pour dispatcher des actions
  const user = useAppSelector(selectUser); // Utilisation du sélecteur pour récupérer les informations de l'utilisateur connecté depuis le store

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    dispatch(logout()); // Dispatcher l'action de déconnexion
  };

  return (
    <nav className="main-nav"> {/* Élément de navigation principal */}
      <NavLink className="main-nav-logo" to="/"> {/* Lien vers la page d'accueil */}
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo" 
        />
        <h1 className="sr-only">Argent Bank</h1> {/* Titre visible uniquement par les lecteurs d'écran */}
      </NavLink>
      <div>
        {user? ( // Si l'utilisateur est connecté
          <>
            <NavLink className="main-nav-item" to="/user"> {/* Lien vers la page de profil utilisateur */}
              <i className="fa fa-user-circle"></i> {/* Icône de l'utilisateur */}
              {user.userName} {/* Affichage du prénom de l'utilisateur */}
            </NavLink>


            <NavLink to='/' className="main-nav-item" onClick={handleLogout}> {/* Lien pour se déconnecter */}
              <i className="fa fa-sign-out"></i> {/* Icône de déconnexion */}
              Sign  Out {/* Texte pour la déconnexion */}
            </NavLink>
          </>
        ) :
         ( // Si l'utilisateur n'est pas connecté
          <NavLink className="main-nav-item" to="/sign-in"> {/* Lien vers la page de connexion */}
            <i className="fa fa-user-circle"></i> {/* Icône de l'utilisateur */}
            Sign  In {/* Texte pour la connexion */}
          </NavLink>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar; // Exportation du composant Navbar pour utilisation dans d'autres parties de l'application
