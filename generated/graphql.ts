import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  answers: Array<Maybe<Answer>>;
  questions: Array<Maybe<Question>>;
  question?: Maybe<Question>;
  subjects: Array<Subject>;
  subject?: Maybe<Subject>;
};


export type QueryQuestionArgs = {
  id: Scalars['ID'];
};


export type QuerySubjectArgs = {
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  email: Scalars['String'];
  answers: Array<Answer>;
  answersCount: Scalars['Int'];
};

export type Answer = {
  __typename?: 'Answer';
  id: Scalars['ID'];
  body: Scalars['String'];
  question: Question;
  user?: Maybe<User>;
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  subject: Subject;
  answers: Array<Answer>;
  answersCount: Scalars['Int'];
};

export type Subject = {
  __typename?: 'Subject';
  id: Scalars['ID'];
  title: Scalars['String'];
  questions: Array<Question>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<CreateUserMutationPayload>;
  login?: Maybe<LoginMutationPayload>;
  addAnswer?: Maybe<AddAnswerMutationPayload>;
  createQuestion?: Maybe<CreateQuestionMutationPayload>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationAddAnswerArgs = {
  body: Scalars['String'];
  questionId: Scalars['ID'];
};


export type MutationCreateQuestionArgs = {
  body: Scalars['String'];
  subjectTitle: Scalars['String'];
  title: Scalars['String'];
};

export type CreateUserMutationPayload = {
  __typename?: 'CreateUserMutationPayload';
  user?: Maybe<User>;
};

export type LoginMutationPayload = {
  __typename?: 'LoginMutationPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type AddAnswerMutationPayload = {
  __typename?: 'AddAnswerMutationPayload';
  answer?: Maybe<Answer>;
};

export type CreateQuestionMutationPayload = {
  __typename?: 'CreateQuestionMutationPayload';
  question?: Maybe<Question>;
};

export type CreateQuestionMutationVariables = Exact<{
  subjectTitle: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreateQuestionMutation = (
  { __typename?: 'Mutation' }
  & { createQuestion?: Maybe<(
    { __typename?: 'CreateQuestionMutationPayload' }
    & { question?: Maybe<(
      { __typename?: 'Question' }
      & Pick<Question, 'id' | 'title' | 'body'>
    )> }
  )> }
);

export type AddAnswerMutationVariables = Exact<{
  questionId: Scalars['ID'];
  body: Scalars['String'];
}>;


export type AddAnswerMutation = (
  { __typename?: 'Mutation' }
  & { addAnswer?: Maybe<(
    { __typename?: 'AddAnswerMutationPayload' }
    & { answer?: Maybe<(
      { __typename?: 'Answer' }
      & Pick<Answer, 'body'>
    )> }
  )> }
);

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<{ __typename: 'CreateUserMutationPayload' }> }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginMutationPayload' }
    & Pick<LoginMutationPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  )> }
);

export type GetSubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubjectsQuery = (
  { __typename?: 'Query' }
  & { subjects: Array<(
    { __typename?: 'Subject' }
    & Pick<Subject, 'title'>
  )> }
);

export type GetSubjectQuestionsQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type GetSubjectQuestionsQuery = (
  { __typename?: 'Query' }
  & { subject?: Maybe<(
    { __typename?: 'Subject' }
    & Pick<Subject, 'title'>
    & { questions: Array<(
      { __typename?: 'Question' }
      & Pick<Question, 'id' | 'title' | 'body' | 'answersCount'>
    )> }
  )> }
);

export type GetQuestionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetQuestionQuery = (
  { __typename?: 'Query' }
  & { question?: Maybe<(
    { __typename?: 'Question' }
    & Pick<Question, 'id' | 'title' | 'body'>
    & { answers: Array<(
      { __typename?: 'Answer' }
      & Pick<Answer, 'body'>
      & { user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'username'>
      )> }
    )>, subject: (
      { __typename?: 'Subject' }
      & Pick<Subject, 'title'>
    ) }
  )> }
);

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )> }
);

export type GetFullUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFullUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'username' | 'answersCount'>
  )> }
);


export const CreateQuestionDocument = gql`
    mutation CreateQuestion($subjectTitle: String!, $title: String!, $body: String!) {
  createQuestion(subjectTitle: $subjectTitle, title: $title, body: $body) {
    question {
      id
      title
      body
    }
  }
}
    `;
export const AddAnswerDocument = gql`
    mutation AddAnswer($questionId: ID!, $body: String!) {
  addAnswer(questionId: $questionId, body: $body) {
    answer {
      body
    }
  }
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    __typename
  }
}
    `;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      username
    }
  }
}
    `;
export const GetSubjectsDocument = gql`
    query getSubjects {
  subjects {
    title
  }
}
    `;
export const GetSubjectQuestionsDocument = gql`
    query getSubjectQuestions($title: String!) {
  subject(title: $title) {
    title
    questions {
      id
      title
      body
      answersCount
    }
  }
}
    `;
export const GetQuestionDocument = gql`
    query getQuestion($id: ID!) {
  question(id: $id) {
    id
    title
    body
    answers {
      body
      user {
        username
      }
    }
    subject {
      title
    }
  }
}
    `;
export const GetUserDocument = gql`
    query getUser {
  user {
    username
  }
}
    `;
export const GetFullUserDocument = gql`
    query getFullUser {
  user {
    email
    username
    answersCount
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateQuestion(variables: CreateQuestionMutationVariables): Promise<CreateQuestionMutation> {
      return withWrapper(() => client.request<CreateQuestionMutation>(print(CreateQuestionDocument), variables));
    },
    AddAnswer(variables: AddAnswerMutationVariables): Promise<AddAnswerMutation> {
      return withWrapper(() => client.request<AddAnswerMutation>(print(AddAnswerDocument), variables));
    },
    CreateUser(variables: CreateUserMutationVariables): Promise<CreateUserMutation> {
      return withWrapper(() => client.request<CreateUserMutation>(print(CreateUserDocument), variables));
    },
    Login(variables: LoginMutationVariables): Promise<LoginMutation> {
      return withWrapper(() => client.request<LoginMutation>(print(LoginDocument), variables));
    },
    getSubjects(variables?: GetSubjectsQueryVariables): Promise<GetSubjectsQuery> {
      return withWrapper(() => client.request<GetSubjectsQuery>(print(GetSubjectsDocument), variables));
    },
    getSubjectQuestions(variables: GetSubjectQuestionsQueryVariables): Promise<GetSubjectQuestionsQuery> {
      return withWrapper(() => client.request<GetSubjectQuestionsQuery>(print(GetSubjectQuestionsDocument), variables));
    },
    getQuestion(variables: GetQuestionQueryVariables): Promise<GetQuestionQuery> {
      return withWrapper(() => client.request<GetQuestionQuery>(print(GetQuestionDocument), variables));
    },
    getUser(variables?: GetUserQueryVariables): Promise<GetUserQuery> {
      return withWrapper(() => client.request<GetUserQuery>(print(GetUserDocument), variables));
    },
    getFullUser(variables?: GetFullUserQueryVariables): Promise<GetFullUserQuery> {
      return withWrapper(() => client.request<GetFullUserQuery>(print(GetFullUserDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;