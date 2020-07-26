import styled from "styled-components";

interface SubTitleProps {
  white?: boolean;
}

const SubTitle = styled.h3<SubTitleProps>`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ white }) => (white ? "#fff" : "initial")};
`;

export default SubTitle;
