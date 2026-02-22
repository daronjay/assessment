export const formatCurrency = (amount: number) => {
  //add commas to the amount and format to 2 decimal places and add a dollar sign in front
  return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
export const Capitalise = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
