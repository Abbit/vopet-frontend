import styled from "styled-components";

interface TitleProps {
  white?: boolean;
}

const Title = styled.h2<TitleProps>`
  font-weight: bold;
  font-size: 3rem;
  color: ${({ white }) => (white ? "#fff" : "initial")};
`;

export default Title;
