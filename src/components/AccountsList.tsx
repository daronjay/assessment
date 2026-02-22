import { Capitalise, formatCurrency } from "../utilities/formatting";

const AccountsList = ({ accounts }: { accounts: any }) => {
  return (
    <div className="account-list">
      <ul>
        {accounts.map((account: any) => (
          <li key={account.id}>
            <span className="nickname">{account.nickname}</span>
            <span className="account-type">
              Type: <span className="value">{Capitalise(account.accountType)}</span>
            </span>
            <span className="savings-goal">
              Savings Goal:
              <span className="value">{account.savingsGoal ? formatCurrency(account.savingsGoal) : "N/A"}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountsList;
