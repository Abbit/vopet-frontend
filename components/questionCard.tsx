import { FunctionComponent } from "react";
import styled from "styled-components";

import wordForm from "../utils/wordForm";
import mediaSizes from "../utils/styleUtils";
import A from "./a";
import Link from "next/link";
import { Question } from "../generated/graphql";
import SubTitle from "./subTitle";

const QuestionCardContainer = styled.div<{ isAnswered: boolean }>`
  background: ${(props) => (props.isAnswered ? "#A5F3C8" : "#ffffff")};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  width: 900px;
  height: 150px;

  @media (max-width: ${mediaSizes.mobile}px) {
    grid-template-columns: 100%;
  }
`;

const QuestionContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
`;

const AnswerCount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 3px solid rgba(0, 0, 0, 0.1);
  min-width: 150px;

  @media (max-width: ${mediaSizes.mobile}px) {
    margin-top: 1em;
    padding: 1em 1em 0;
    border-left: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

interface QuestionCardProps {
  question: Pick<Question, "title" | "id" | "body" | "answersCount">;
  isAnswered?: boolean;
}

const QuestionCard: FunctionComponent<QuestionCardProps> = ({ question, isAnswered }) => (
  <Link href="/questions/[questionId]" as={`/questions/${question.id}`}>
    <A>
      <QuestionCardContainer isAnswered={isAnswered}>
        <QuestionContainer>
          <SubTitle style={{ marginBottom: "1rem" }}>{question.title}</SubTitle>
          <p style={{ overflow: "hidden" }}>{question.body}</p>
        </QuestionContainer>
        <AnswerCount>
          <p>{question.answersCount}</p>
          <p>{wordForm(question.answersCount, ["ответ", "ответа", "ответов"])}</p>
        </AnswerCount>
      </QuestionCardContainer>
    </A>
  </Link>
);

export default QuestionCard;
