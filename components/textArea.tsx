import styled from "styled-components";
import { forwardRef, TextareaHTMLAttributes } from "react";
import Label from "./label";

const TextAreaField = styled.textarea`
  resize: vertical;
  font-size: 0.875rem;
  border: none;
  border-radius: 5px;
  padding: 1rem 1.5rem;
  background: #ffffff;
  overflow: auto;
  width: 100%;
  margin-bottom: 1rem;
`;

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, ...props }, ref) => (
    <>
      {label && <Label htmlFor={props.name}>{label}</Label>}
      <TextAreaField ref={ref} {...props} />
    </>
  )
);

export default TextArea;
