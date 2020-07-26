import { FunctionComponent } from "react";
import styled from "styled-components";
import Button, { ButtonSize } from "./button";
import TextArea from "./textArea";
import { getApiClient } from "../lib/api";
import useSWR from "swr";
import { useForm } from "react-hook-form";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const ErrorText = styled.p`
  margin-bottom: 1rem;
`;

interface AddAnswerProps {
  questionId: string;
}

interface FormData {
  answerBody: string;
}

const AddAnswer: FunctionComponent<AddAnswerProps> = ({ questionId }) => {
  const { mutate } = useSWR(["getQuestionQuery", questionId]);
  const { register, handleSubmit, reset, errors } = useForm<FormData>();

  const onSumbit = handleSubmit(async ({ answerBody }) => {
    await getApiClient().AddAnswer({
      questionId,
      body: answerBody,
    });

    reset();
    mutate();
  });

  return (
    <Container>
      <Form onSubmit={onSumbit}>
        <TextArea
          rows={4}
          name="answerBody"
          placeholder="Напишите свой ответ здесь..."
          ref={register({ required: true })}
          required
        />
        {errors.answerBody && <ErrorText>Answer can't be empty</ErrorText>}
        <Button buttonSize={ButtonSize.Small} type="submit">
          Добавить ответ
        </Button>
      </Form>
    </Container>
  );
};

export default AddAnswer;
