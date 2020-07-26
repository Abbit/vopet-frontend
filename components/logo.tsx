import { FunctionComponent } from "react";
import styled from "styled-components";

import LogoSvg from "../public/assets/logo.svg";

const LogoContainer = styled.div`
  min-width: 140px;
`;

const Logo: FunctionComponent = () => (
  <LogoContainer>
    <LogoSvg />
  </LogoContainer>
);

export default Logo;
