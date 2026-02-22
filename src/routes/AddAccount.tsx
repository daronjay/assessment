import Navbar from "../components/Navbar";
import TextInput from "../components/formWidgets/TextInput";
import SelectComponent from "../components/formWidgets/SelectComponent";
import NumericInput from "../components/formWidgets/NumericInput";
import { useAccount } from "../contexts/accountContext";
import { useNavigate } from "react-router-dom";

const AddAccount = () => {
  const navigate = useNavigate();
  const {
    nickname,
    updateNickname,
    accountType,
    updateAccountType,
    savingsGoal,
    updateSavingsGoal,
    validateAndSubmitAccount,
  } = useAccount();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateNickname(value);
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    //detect if accountType is savings otherwise remove savingsGoal from the account state
    if (value !== "savings") {
      updateSavingsGoal(undefined);
    }
    if (value === "savings") {
      updateSavingsGoal(1);
    }
    updateAccountType(value);
  };

  const handleSavingsGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateSavingsGoal(value ? parseFloat(value) : undefined);
  };

  const validateAndSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSaved = await validateAndSubmitAccount(nickname, accountType, savingsGoal);
    if (isSaved) {
      navigate("/");
    }
  };

  const options = [
    { label: "", value: "Select an account type" },
    { label: "savings", value: "Savings" },
    { label: "everyday", value: "Everyday" },
  ];

  //TODO: in practice I'd probably be using something like MUI or Shadcn UI for form components but I rolled my own here to meet the requirement
  //It also would have been nice to use a form library like react-hook-form etc
  return (
    <div className="add-account-page">
      <Navbar />
      <h2>Add Account</h2>
      <p>Here you can add a new bank account.</p>
      <form className="add-account-form" onSubmit={validateAndSubmit}>
        <TextInput text={nickname} handleTextChange={handleTextChange} />
        <SelectComponent select={accountType} handleAccountChange={handleAccountChange} options={options} />
        {accountType.value === "savings" && (
          <NumericInput number={savingsGoal} handleSavingsGoalChange={handleSavingsGoalChange} />
        )}
        <button type="submit">Add Account</button>
      </form>
    </div>
  );
};

export default AddAccount;
