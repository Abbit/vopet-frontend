import { FunctionComponent } from "react";
import styled from "styled-components";
import Button, { ButtonType } from "./button";
import TextArea from "./textArea";
import { getApiClient } from "../lib/api";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import Input from "./input";
import Select, { SelectOption } from "./select";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90vw;
  max-width: 960px;
`;

interface CreateQuestionProps {
  subjects: string[];
  buttonType?: ButtonType;
}

interface FormData {
  subject: string;
  questionTitle: string;
  questionBody: string;
}

const CreateQuestion: FunctionComponent<CreateQuestionProps> = ({
  subjects,
  buttonType,
}) => {
  const { mutate } = useSWR("getSubjectQuestionsQuery");
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSumbit = handleSubmit(async ({ subject, questionTitle, questionBody }) => {
    await getApiClient().CreateQuestion({
      subjectTitle: subject,
      title: questionTitle,
      body: questionBody,
    });

    reset();
    mutate();
  });

  const selectOptions: SelectOption[] = [
    {
      label: "Выберите предмет",
      value: "",
      selected: true,
      disabled: true,
    },
  ];

  subjects.forEach((subject) => {
    selectOptions.push({ label: subject, value: subject });
  });

  return (
    <Form onSubmit={onSumbit}>
      <Select
        label="Предмет"
        name="subject"
        ref={register({ required: true })}
        options={selectOptions}
        required
      />
      <Input
        label="Заголовок вопроса"
        name="questionTitle"
        placeholder="Написать заголовок вопроса ..."
        ref={register({ required: true, maxLength: 64 })}
        required
        maxLength={64}
      />
      <TextArea
        label="Текст вопроса"
        rows={8}
        name="questionBody"
        placeholder="Подробно опишите свой вопрос ..."
        ref={register({ required: true })}
        required
      />
      <Button type="submit" buttonType={buttonType}>
        Создать вопрос
      </Button>
    </Form>
  );
};

export default CreateQuestion;
