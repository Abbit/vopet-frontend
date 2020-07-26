import styled from "styled-components";

export enum ButtonType {
  Primary = "primary",
  PrimaryAlternative = "primaryAlternative",
  Transparent = "transparent",
  White = "white",
}

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

interface ButtonProps {
  buttonType?: ButtonType;
  buttonSize?: ButtonSize;
}

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  border-radius: 24px;
  font-weight: 500;
  font-size: 16px;

  padding: ${(props) =>
    props.buttonSize === ButtonSize.Small ? "0.65rem 1.2rem" : "1rem 2rem"};

  border: ${(props) =>
    props.buttonType === ButtonType.Transparent ? "1px solid #FFFFFF" : "none"};

  background: ${(props) => {
    switch (props.buttonType) {
      case ButtonType.Primary:
        return "#1bd16e";
      case ButtonType.PrimaryAlternative:
        return "#008FCC";
      case ButtonType.Transparent:
        return "transparent";
      case ButtonType.White:
        return "#ffffff";
    }
  }};

  color: ${(props) => (props.buttonType === ButtonType.White ? "#1F1C1C" : "#ffffff")};
`;

Button.defaultProps = {
  buttonSize: ButtonSize.Medium,
  buttonType: ButtonType.Primary,
  type: "button",
  role: "button",
};

export default Button;
