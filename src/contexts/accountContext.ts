import { createContext, useContext, useEffect, useState } from "react";
import type { TextInputType, SelectType, NumericInputType } from "../types/formWidgets";
import type { Account } from "../types/account";
import { fetchAccounts, createAccount } from "../api/localServer";

export const AccountState = () => {
  //Since I was showing the accounts on the home page I thought it would be better to set all the shared state in context

  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [nickname, setNickname] = useState<TextInputType>({
    value: "",
    label: "Account Nickname",
    error: "",
    required: true,
    minLength: 5,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9\s]+$/,
  });

  const [accountType, setAccountType] = useState<SelectType>({
    value: "",
    label: "Account Type",
    error: "",
    required: true,
  });

  const [savingsGoal, setSavingsGoal] = useState<NumericInputType>({
    value: undefined,
    label: "Savings Goal",
    error: "",
    required: true,
    min: 1,
    max: 10000000,
  });

  const updateNickname = (value: string) => {
    setNickname((prev) => ({
      ...prev,
      value,
      error: "",
    }));
  };

  const updateAccountType = (value: string) => {
    setAccountType((prev) => ({
      ...prev,
      value,
      error: "",
    }));
  };

  const updateSavingsGoal = (value: number | undefined) => {
    setSavingsGoal((prev) => ({
      ...prev,
      value,
      error: "",
    }));
  };

  const setAccountErrors = (nicknameError: string, accountTypeError: string, savingsGoalError: string) => {
    setNickname((prev) => ({
      ...prev,
      error: nicknameError,
    }));
    setAccountType((prev) => ({
      ...prev,
      error: accountTypeError,
    }));
    setSavingsGoal((prev) => ({
      ...prev,
      error: savingsGoalError,
    }));
  };

  //TODO: probably needs to move to a validation file if we had more forms but for now it's fine here
  //also, no way I'd roll my own valdiation logic if I could use a library like zod or yup but that was the requirement so here we are

  const validateAndSubmitAccount = async (
    nickname: TextInputType,
    accountType: SelectType,
    savingsGoal: NumericInputType,
  ) => {
    let savingsGoalError = "";
    let accountTypeError = "";
    let nicknameError = "";

    // Validate nickname
    if (nickname.required && !nickname.value.trim()) {
      nicknameError = "Nickname is required";
    } else if (nickname.value.length < nickname.minLength) {
      nicknameError = `Nickname must be at least ${nickname.minLength} characters`;
    } else if (nickname.value.length > nickname.maxLength) {
      nicknameError = `Nickname must be less than ${nickname.maxLength} characters`;
    } else if (!nickname.pattern.test(nickname.value)) {
      nicknameError = "Nickname can only contain letters, numbers, and spaces";
    }

    // Validate account type
    if (accountType.required && !accountType.value) {
      accountTypeError = "Account type is required";
    }
    // Validate savings goal if account type is savings
    if (accountType.value === "savings" && savingsGoal.value !== undefined) {
      if (savingsGoal.required && !savingsGoal.value) {
        savingsGoalError = "Savings goal is required";
      }
      if (savingsGoal.value < savingsGoal.min) {
        savingsGoalError = `Savings goal cannot be less than $${savingsGoal.min}`;
      } else if (savingsGoal.value > savingsGoal.max) {
        savingsGoalError = `Savings goal cannot exceed $${savingsGoal.max}`;
      }
    }
    setAccountErrors(nicknameError, accountTypeError, savingsGoalError);

    if (!accountTypeError && !nicknameError && !savingsGoalError) {
      // Submit the form (e.g., send data to the server)
      console.log("Form submitted:", { nickname, accountType, savingsGoal });

      const result = await createAccount({
        nickname: nickname.value,
        accountType: accountType.value,
        savingsGoal: savingsGoal.value,
      });

      if (result) {
        setAccounts((prev) => (prev ? [...prev, result] : [result]));
        // Reset form fields
        setNickname((prev) => ({ ...prev, value: "", error: "" }));
        setAccountType((prev) => ({ ...prev, value: "", error: "" }));
        setSavingsGoal((prev) => ({ ...prev, value: undefined, error: "" }));
        return true;
      } else {
        console.error("Error submitting account");
        return false;
      }
    }
  };

  useEffect(() => {
    const fetchAccountData = async () => {
      setIsLoading(true);
      const data = await fetchAccounts();
      if (data) {
        setAccounts(data);
      } else {
        setAccounts([]);
      }
      setIsLoading(false);
    };
    fetchAccountData();
  }, []);

  return {
    isLoading,
    accounts,
    nickname,
    updateNickname,
    accountType,
    updateAccountType,
    savingsGoal,
    updateSavingsGoal,
    validateAndSubmitAccount,
  };
};

export const AccountContext = createContext<ReturnType<typeof AccountState>>({} as ReturnType<typeof AccountState>);

export const useAccount = () => useContext(AccountContext);
