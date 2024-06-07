// FeatureItem.jsx
// Définir les types des props en utilisant une interface
interface FeatureItemProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

// Composant fonctionnel `FeatureItem` qui accepte des props : `icon`, `title`, et `children`
const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, children }) => {
  return (
    <div className="feature-item">
      {/* Affichage de l'icône */}
      <img src={icon} alt={`${title} Icon`} className="feature-icon" />
      
      {/* Affichage du titre */}
      <h3 className="feature-item-title">{title}</h3>
      
      {/* Affichage du contenu passé en tant que children */}
      <p>{children}</p>
    </div>
  );
};
/* 1 FeatureItem Component:

Ce composant est conçu pour être réutilisable.
Il prend trois props : icon pour l'image, title pour le titre, et children pour le contenu textuel.
Le children prop permet d'insérer du contenu arbitraire entre les balises d'ouverture et de fermeture du composant. */


// Exportation du composant `FeatureItem` pour pouvoir l'utiliser dans d'autres fichiers
export default FeatureItem;


