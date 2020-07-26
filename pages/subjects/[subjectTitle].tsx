import Head from "next/head";
import styled from "styled-components";
import { FunctionComponent } from "react";
import Layout from "../../components/layout";
import QuestionCard from "../../components/questionCard";
import { GetServerSideProps } from "next";
import { getApiClient } from "../../lib/api";
import { GetSubjectQuestionsQuery } from "../../generated/graphql";
import useSWR from "swr";
import { uniqueId } from "lodash";

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  margin: 1.5rem 0;
`;

interface SubjectProps {
  initialData: GetSubjectQuestionsQuery;
}

export const getServerSideProps: GetServerSideProps<
  SubjectProps,
  { subjectTitle: string }
> = async ({ params: { subjectTitle } }) => {
  const initialData = await getApiClient().getSubjectQuestions({ title: subjectTitle });

  return {
    props: { initialData },
  };
};

const SubjectPage: FunctionComponent<SubjectProps> = ({ initialData }) => {
  const { data, error } = useSWR(
    ["getSubjectQuestionsQuery", initialData.subject.title],
    (_, title) => getApiClient().getSubjectQuestions({ title }),
    {
      initialData,
    }
  );

  const {
    subject: { title, questions },
  } = data;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout headerTitle={title}>
        <List>
          {questions
            .sort((a, b) => {
              if (!a || !b) {
                return 0;
              }

              return b.answersCount - a.answersCount;
            })
            .map((question) => {
              if (!question) {
                return <p>No question</p>;
              }

              return (
                <ListItem key={uniqueId()}>
                  <QuestionCard question={question} />
                </ListItem>
              );
            })}
        </List>
      </Layout>
    </>
  );
};

export default SubjectPage;
