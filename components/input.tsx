import styled from "styled-components";
import { forwardRef, InputHTMLAttributes } from "react";
import Label from "./label";

const InputField = styled.input`
  border: none;
  font-size: 0.875rem;
  border-radius: 5px;
  padding: 0.5rem 1.25rem;
  background: #ffffff;
  overflow: auto;
  width: 100%;
  margin-bottom: 1rem;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => (
  <>
    {label && <Label htmlFor={props.name}>{label}</Label>}
    <InputField ref={ref} {...props} />
  </>
));

export default Input;
