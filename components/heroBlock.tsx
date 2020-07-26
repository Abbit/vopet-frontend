import styled from "styled-components";

const HeroBlockContainer = styled.div`
  padding: 4rem 6rem;
`;

const HeroBlockTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 500;
  text-align: center;
  color: #fff;
`;

const HeroBlock = () => (
  <HeroBlockContainer>
    <HeroBlockTitle>
      Здесь найдется ответ на любой вопрос (из школьной программы)
    </HeroBlockTitle>
  </HeroBlockContainer>
);

export default HeroBlock;
