import Head from "next/head";
import Layout from "../components/layout";
import { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Title from "../components/title";
import Input from "../components/input";
import Button from "../components/button";
import { getApiClient } from "../lib/api";
import { useRouter } from "next/router";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90vw;
  max-width: 960px;
`;

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterPage: FunctionComponent = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/login");
  }, []);

  const onSumbit = handleSubmit(async ({ username, email, password }) => {
    try {
      const res = await getApiClient().CreateUser({
        email,
        username,
        password,
      });

      router.push("/login");
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
        <Title style={{ marginBottom: "2rem" }}>Регистрация</Title>
        <Form onSubmit={onSumbit}>
          <Input
            label="Имя пользователя"
            type="text"
            name="username"
            ref={register({ required: true, minLength: 3 })}
            minLength={3}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
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
          <Button type="submit">Создать аккаунт</Button>
        </Form>
      </Layout>
    </>
  );
};

export default RegisterPage;
