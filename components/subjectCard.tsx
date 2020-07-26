import { FunctionComponent } from "react";
import styled from "styled-components";

const blockHeight = 200;

const Wrapper = styled.div`
  text-align: center;
  width: 320px;
  max-width: calc(100vw - 2 * 1.5rem);
  height: ${blockHeight}px;
  background: linear-gradient(270deg, #48c983 16.3%, #1e8dbd 93.42%);
  border-radius: 10px;
`;

const SubjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  line-height: ${blockHeight}px;
`;

interface SubjectCardProps {
  title: string;
}

const SubjectCard: FunctionComponent<SubjectCardProps> = ({ title }) => (
  <Wrapper>
    <SubjectTitle>{title}</SubjectTitle>
  </Wrapper>
);

export default SubjectCard;
