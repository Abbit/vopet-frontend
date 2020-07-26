import styled from "styled-components";
import { uniqueId } from "lodash";
import Layout from "../../components/layout";
import { FunctionComponent } from "react";
import { GetServerSideProps } from "next";
import { getApiClient } from "../../lib/api";
import { GetQuestionQuery } from "../../generated/graphql";
import useSWR from "swr";
import AddAnswer from "../../components/addAnswer";
import Head from "next/head";
import AnswerCard from "../../components/answerCard";
import wordForm from "../../utils/wordForm";

const Container = styled.div`
  width: 90vw;
  max-width: 960px;
`;

const QuestionBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background: #fafafa;
  padding: 2rem 1.5rem;
`;

const QuestionBody = styled.p`
  word-break: break-word;
`;

const AnswersBlock = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr;
  grid-row-gap: 1.5rem;
`;

const NoAnswers = styled.p`
  margin-top: 2rem;
`;

const Line = styled.hr`
  height: 2px;
  margin: 2rem 0;
  background: #ebe9e9;
`;

interface QuestionProps {
  initialData: GetQuestionQuery;
}

export const getServerSideProps: GetServerSideProps<
  QuestionProps,
  { questionId: string }
> = async ({ params: { questionId } }) => {
  const initialData = await getApiClient().getQuestion({ id: questionId });

  return {
    props: {
      initialData,
    },
  };
};

const QuestionPage: FunctionComponent<QuestionProps> = ({ initialData }) => {
  const { data } = useSWR(
    ["getQuestionQuery", initialData.question.id],
    (_, id) => getApiClient().getQuestion({ id }),
    {
      initialData,
    }
  );

  const { data: userData } = useSWR("getUserQuery", () => getApiClient().getUser(), {
    shouldRetryOnError: false,
  });

  const { question } = data;

  const answersCount = question.answers.length;

  return (
    <>
      <Head>
        <title>{question.title}</title>
      </Head>
      <Layout
        headerTitle={question.title}
        headerSubTitle={`${answersCount} ${wordForm(answersCount, [
          "ответ",
          "ответа",
          "ответов",
        ])}`}
      >
        <Container>
          <QuestionBlock>
            <QuestionBody>{question.body}</QuestionBody>
          </QuestionBlock>
          <Line />
          {userData ? <AddAnswer questionId={question.id} /> : null}
          <AnswersBlock>
            {question.answers.length > 0 ? (
              question.answers.map((answer) => (
                <AnswerCard
                  key={uniqueId()}
                  body={answer.body}
                  username={answer.user?.username}
                />
              ))
            ) : (
              <NoAnswers>Ответов пока нет, будь первым!</NoAnswers>
            )}
          </AnswersBlock>
        </Container>
      </Layout>
    </>
  );
};

export default QuestionPage;
