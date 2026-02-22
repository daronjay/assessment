import type { NumericInputType } from "../../types/formWidgets";

const NumericInput = ({
  number,
  handleSavingsGoalChange,
}: {
  number: NumericInputType;
  handleSavingsGoalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={`form-row savings-goal-label ${number.error !== "" ? "error" : ""}`}>
      <label htmlFor="savingsGoal">{number.label}</label>
      <div className="input-wrapper">
        <span className="currency">$</span>
        <input
          type="number"
          name="savingsGoal"
          className="savings-goal"
          value={number.value !== undefined ? number.value : ""}
          onChange={handleSavingsGoalChange}
          step="1.00"
        />
        {number.error !== "" && <div className="error">{number.error}</div>}
      </div>
    </div>
  );
};
export default NumericInput;
