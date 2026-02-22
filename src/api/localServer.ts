export const fetchAccounts = async () => {
  try {
    const response = await fetch("/api/accounts");
    if (!response.ok) {
      throw new Error("Failed to fetch accounts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return [];
  }
};

export const createAccount = async (accountData: { nickname: string; accountType: string; savingsGoal?: number }) => {
  try {
    const response = await fetch("/api/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountData),
    });

    if (!response.ok) {
      throw new Error("Failed to create account");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};
