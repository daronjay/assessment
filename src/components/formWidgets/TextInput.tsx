import type { TextInputType } from "../../types/formWidgets";

const TextInput = ({
  text,
  handleTextChange,
}: {
  text: TextInputType;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={`form-row nickname-label ${text.error !== "" ? "error" : ""}`}>
      <label htmlFor="nickname">{text.label}</label>
      <div className="input-wrapper">
        <input type="text" name="nickname" id="nickname" value={text.value} onChange={handleTextChange} />
        {text.error !== "" && <div className="error">{text.error}</div>}
      </div>
    </div>
  );
};

export default TextInput;
