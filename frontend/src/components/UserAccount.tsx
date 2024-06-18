// UserItem.tsx
// Définir les types des props en utilisant une interface.
interface UserAccountProps {
    title: string;
    amount: string;
    description: string; 
};

const UserAccount: React.FC<UserAccountProps> = ({title, amount, description }) => {
    return(
      <div>
      
        <section className="account">
        <div className="account-content-wrapper">
            <h3 className="account-title">{title}</h3>
            <p className="account-amount">{amount}</p>
            <p className="account-amount-description">{description}</p>
            <div className="account-content-wrapper cta">
          <button type="button" className="transaction-button">
            View transactions
          </button>
        </div>
        </div>

        </section>
        </div>
    )
}
export default UserAccount ;