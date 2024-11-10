import { Input } from "antd";

export interface TextFieldProps {
  placeholder: string;
  label?: string;
  helperText?: string;
}

/** Primary UI component for user interaction */
export const TextField = ({ ...props }: TextFieldProps) => {
  return <Input type="input" {...props}></Input>;
};
