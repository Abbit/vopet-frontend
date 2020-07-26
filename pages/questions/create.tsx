import Head from "next/head";
import Layout from "../../components/layout";
import { FunctionComponent } from "react";
import Title from "../../components/title";
import CreateQuestion from "../../components/createQuestion";
import { GetStaticProps } from "next";
import { getApiClient } from "../../lib/api";

interface CreateQuestionProps {
  subjects: string[];
}

export const getStaticProps: GetStaticProps<CreateQuestionProps> = async () => {
  const { subjects } = await getApiClient().getSubjects();

  return {
    props: { subjects: subjects.map((subj) => subj.title).sort() },
  };
};

const CreateQuestionPage: FunctionComponent<CreateQuestionProps> = ({ subjects }) => (
  <>
    <Head>
      <title>Вопет</title>
    </Head>
    <Layout>
      <Title style={{ marginBottom: "2rem" }}>Задай свой вопрос</Title>
      <CreateQuestion subjects={subjects} />
    </Layout>
  </>
);

export default CreateQuestionPage;
