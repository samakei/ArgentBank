// Features.jsx
import iconChat from "../assets/icon-chat.webp";
import iconMoney from "../assets/icon-money.webp";
import iconSecurity from "../assets/icon-security.webp";
import FeatureItem from "../components/FeatureItem"  // Importation du composant `FeatureItem`


// Composant fonctionnel `Features` qui contient plusieurs `FeatureItem`
const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      
      {/* Utilisation du composant `FeatureItem` pour chaque fonctionnalité */}
      <FeatureItem icon={iconChat} title="You are our #1 priority">
        {/* Contenu de la première fonctionnalité */}
        Need to talk to a representative? You can get in touch through our
        24/7 chat or through a phone call in less than 5 minutes.
      </FeatureItem>
      
      <FeatureItem icon={iconMoney} title="More savings means higher rates">
        {/* Contenu de la deuxième fonctionnalité */}
        The more you save with us, the higher your interest rate will be!
      </FeatureItem>
      
      <FeatureItem icon={iconSecurity} title="Security you can trust">
        {/* Contenu de la troisième fonctionnalité */}
        We use top of the line encryption to make sure your data and money is
        always safe.
      </FeatureItem>
    </section>
  );
};
/* 2 Features Component:

Ce composant utilise plusieurs instances de FeatureItem pour afficher les différentes fonctionnalités de l'application.
Pour chaque FeatureItem, il passe les valeurs des icônes, des titres et des contenus appropriés en tant que props.*/

// Exportation du composant `Features` pour pouvoir l'utiliser dans d'autres fichiers
export default Features;
