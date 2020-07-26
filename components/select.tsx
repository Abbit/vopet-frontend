import { forwardRef, SelectHTMLAttributes } from "react";
import styled from "styled-components";
import { uniqueId } from "lodash";
import Label from "./label";

const SelectWrapper = styled.div`
  position: relative;

  &::after {
    content: "";
    color: #9b9b9b;
    position: absolute;
    top: 1rem;
    right: 1rem;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2218%22%20height%3D%2217%22%20viewBox%3D%220%200%2018%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2%207.07104L9.07107%2014.1421L16.1421%207.07104%22%20stroke%3D%22%239B9B9B%22%20stroke-width%3D%223%22%2F%3E%0A%3C%2Fsvg%3E%0A");
    background-repeat: no-repeat;
    background-position: center;
    min-height: 1rem;
    min-width: 1.5rem;
  }
`;

const SelectField = styled.select`
  appearance: none;
  font-size: 0.875rem;
  background: #ffffff;
  border: none;
  border-radius: 5px;
  color: #000000;
  padding: 1rem 1.5rem;
  padding-right: 3.5rem;
  margin-bottom: 1rem;

  &:invalid {
    color: #777777;
  }
`;

const Option = styled.option``;

export interface SelectOption {
  value: string | number;
  label: string;
  selected?: boolean;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, ...props }, ref) => (
    <>
      {label && <Label htmlFor={props.name}>{label}</Label>}

      <SelectWrapper>
        <SelectField
          ref={ref}
          {...props}
          defaultValue={
            options.find((option) => {
              if (option.selected) return option;
            })?.value
          }
        >
          {options.map(({ label: optionLabel, selected, ...optionProps }) => (
            <Option key={uniqueId()} {...optionProps}>
              {optionLabel}
            </Option>
          ))}
        </SelectField>
      </SelectWrapper>
    </>
  )
);

export default Select;
