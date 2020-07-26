import Head from "next/head";
import Layout from "../components/layout";
import { FunctionComponent } from "react";
import styled from "styled-components";
import Title from "../components/title";
import Input from "../components/input";
import useSWR from "swr";
import { getApiClient } from "../lib/api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90vw;
  max-width: 960px;
`;

const ProfileField = styled.div`
  margin-bottom: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
`;

const ProfileFieldSpan = styled.span`
  font-size: 1.2rem;
  font-weight: normal;
  margin-left: 0.5rem;
`;

const ProfilePage: FunctionComponent = () => {
  const { data } = useSWR("getFullUserQuery", () => getApiClient().getFullUser(), {
    shouldRetryOnError: false,
  });

  const username = data?.user?.username;
  const email = data?.user?.email;
  const answersCount = data?.user?.answersCount;

  return (
    <>
      <Head>
        <title>Вопет</title>
      </Head>
      <Layout>
        <Title style={{ marginBottom: "2rem" }}>Профиль</Title>
        <Container>
          <ProfileField>
            Имя пользователя:
            <ProfileFieldSpan>{username}</ProfileFieldSpan>
          </ProfileField>
          <ProfileField>
            Email:
            <ProfileFieldSpan>{email}</ProfileFieldSpan>
          </ProfileField>
          <ProfileField>
            Количество ответов:
            <ProfileFieldSpan>{answersCount}</ProfileFieldSpan>
          </ProfileField>
        </Container>
      </Layout>
    </>
  );
};

export default ProfilePage;
