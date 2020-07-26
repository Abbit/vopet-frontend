import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { getApiClient } from "../lib/api";
import mediaSizes from "../utils/styleUtils";
import Layout from "../components/layout";
import SubjectCard from "../components/subjectCard";
import A from "../components/a";
import { FunctionComponent } from "react";
import { uniqueId } from "lodash";
import CreateQuestion from "../components/createQuestion";
import Title from "../components/title";
import HeroBlock from "../components/heroBlock";
import { ButtonType } from "../components/button";
import useSWR from "swr";
import AuthButtons from "../components/authButtons";

const Container = styled.section`
  padding: 0 0 2rem;
  border-radius: 3rem;
  width: 100%;
  max-width: 1190px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GridWrapper = styled.div`
  padding: 0 2rem;
  width: 100%;
  max-width: 1190px;

  @media (max-width: ${mediaSizes.mobile}px) {
    padding: 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-rows: auto;
  row-gap: 2rem;
  column-gap: 1.5rem;
  justify-items: center;
`;

const WaveContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-top: 3rem;

  & > svg {
    display: block;
  }
`;

const FooterContainer = styled.section`
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
  padding: 0 1rem 4rem;
  margin-bottom: -3rem;
  background-color: #3ae588;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterWave = () => (
  <svg viewBox="0 0 1440 71" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M60 53.0867L0 70.1785V71H1440V55.4326L1380 46.0489C1320 36.33 1200 16.8922 1080 16.8922C1026.87 16.8922 973.74 20.7025 920.611 24.5128C853.74 29.3086 786.87 34.1043 720 31.303C667.636 29.2556 615.273 22.6137 562.909 15.9717C495.273 7.39249 427.636 -1.18672 360 0.135538C241.25 2.45703 122.501 35.6281 61.8949 52.5574C61.2568 52.7356 60.6251 52.9121 60 53.0867Z"
      fill="#3AE588"
    />
  </svg>
);

interface HomeProps {
  subjects: string[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { subjects } = await getApiClient().getSubjects();

  return {
    props: { subjects: subjects.map((subj) => subj.title).sort() },
  };
};

const HomePage: FunctionComponent<HomeProps> = ({ subjects }) => {
  const { data } = useSWR("getUserQuery", () => getApiClient().getUser(), {
    shouldRetryOnError: false,
  });

  return (
    <>
      <Head>
        <title>Вопет</title>
      </Head>
      <Layout headerChildren={<HeroBlock />}>
        <Container>
          <Title style={{ marginBottom: "4rem" }}>Предметы</Title>
          <GridWrapper>
            <Grid>
              {subjects.map((title) => (
                <Link
                  href="subjects/[subjectTitle]"
                  as={`subjects/${title}`}
                  key={uniqueId()}
                >
                  <A>
                    <SubjectCard title={title} />
                  </A>
                </Link>
              ))}
            </Grid>
          </GridWrapper>
        </Container>
        <WaveContainer>
          <FooterWave />
        </WaveContainer>
        <FooterContainer>
          <Title white style={{ marginBottom: "2rem" }}>
            Задай свой вопрос
          </Title>
          {data ? (
            <CreateQuestion
              subjects={subjects}
              buttonType={ButtonType.PrimaryAlternative}
            />
          ) : (
            <AuthButtons />
          )}
        </FooterContainer>
      </Layout>
    </>
  );
};

export default HomePage;
