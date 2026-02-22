import Navbar from "../components/Navbar";
import AccountsList from "../components/AccountsList";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../contexts/accountContext";

function HomePage() {
  const navigate = useNavigate();
  const openAccount = () => {
    navigate("/add-account");
  };
  const { accounts } = useAccount();
  if (accounts === null) {
    return (
      <div className="home-page">
        <Navbar />
        <h2>Your Accounts</h2>
        <p>Loading accounts...</p>
      </div>
    );
  }

  //GENERAL:
  //I thought I'd go a wee step further and use the homepage to display the accounts as that's more like what might happen in a real project
  //I broke things out into components to make it look a bit nicer and be more maintainable and again more like a real project.
  //I also just couldn't bring myself NOT to style the project at all so I added some basic styles throughout

  //TODO: it would be nice to be able to edit and delete accounts but I ran out of time to implement those features
  //TODO: also it would be nice to have a success message toast or similar on the home page after creating an account

  return (
    <div className="home-page">
      <Navbar />
      <h2>Your Accounts</h2>
      {accounts && accounts.length > 0 && <AccountsList accounts={accounts} />}
      {accounts && accounts.length === 0 && (
        <div className="account-list">
          <ul>
            <li>No accounts found.</li>
          </ul>
        </div>
      )}
      {!accounts && <p>Loading accounts...</p>}
      <button onClick={openAccount}>Open a Bank Account</button>
    </div>
  );
}

export default HomePage;
