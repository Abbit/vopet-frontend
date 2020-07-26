import Head from "next/head";
import Layout from "../components/layout";
import { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Title from "../components/title";
import Input from "../components/input";
import Button from "../components/button";
import { useRouter } from "next/router";
import { getApiClient } from "../lib/api";
import { localStorageTokenKey } from "../config";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90vw;
  max-width: 960px;
`;

interface FormData {
  username: string;
  password: string;
}

const LoginPage: FunctionComponent = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, []);

  const onSumbit = handleSubmit(async ({ username, password }) => {
    try {
      const {
        login: { token },
      } = await getApiClient().Login({
        username,
        password,
      });

      localStorage.setItem(localStorageTokenKey, token);

      router.push("/");
    } catch (error) {
      console.error(JSON.stringify(error, undefined, 2));
    }
  });

  return (
    <>
      <Head>
        <title>Вопет</title>
      </Head>
      <Layout>
        <Title style={{ marginBottom: "2rem" }}>Вход</Title>
        <Form onSubmit={onSumbit}>
          <Input
            label="Имя пользователя"
            type="text"
            name="username"
            ref={register({ required: true })}
            required
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            ref={register({ required: true })}
            required
          />
          <Button type="submit">Войти в аккаунт</Button>
        </Form>
      </Layout>
    </>
  );
};

export default LoginPage;
