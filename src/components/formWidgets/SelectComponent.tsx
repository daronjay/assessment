import type { SelectType } from "../../types/formWidgets";

const selectComponent = ({
  select,
  handleAccountChange,
  options,
}: {
  select: SelectType;
  handleAccountChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
}) => {
  return (
    <div className={`form-row account-type-label ${select.error !== "" ? "error" : ""}`}>
      <label htmlFor="accountType">{select.label}</label>
      <div className="input-wrapper">
        <select name="accountType" id="accountType" value={select.value} onChange={handleAccountChange}>
          {options.map((option) => (
            <option key={option.value} value={option.label}>
              {option.value}
            </option>
          ))}
        </select>
        {select.error !== "" && <div className="error">{select.error}</div>}
      </div>
    </div>
  );
};

export default selectComponent;
