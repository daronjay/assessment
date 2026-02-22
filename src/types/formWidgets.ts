export type TextInputType = {
  value: string;
  label: string;
  error: string;
  required: boolean;
  minLength: number;
  maxLength: number;
  pattern: RegExp;
};

export type SelectType = {
  value: string;
  label: string;
  error: string;
  required: boolean;
};

export type NumericInputType = {
  value: number | undefined;
  label: string;
  error: string;
  required: boolean;
  min: number;
  max: number;
};
