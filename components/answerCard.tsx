import { FunctionComponent } from "react";
import styled from "styled-components";
import Avatar, { AvatarSize } from "./avatar";

const AnswerContainer = styled.div`
  word-break: break-word;
  padding: 1.5rem 2rem;
  padding-bottom: 2rem;
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const AnswerTopBlock = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;
  grid-gap: 0.5rem;
  align-items: center;
`;

const AnswerBody = styled.div`
  padding-top: 1.5rem;
  padding-left: 2.5rem;
`;

const Username = styled.p`
  font-size: 0.8rem;
`;

interface AnswerProps {
  username?: string;
  body: string;
}

const AnswerCard: FunctionComponent<AnswerProps> = ({ username, body }) => (
  <AnswerContainer>
    <AnswerTopBlock>
      <Avatar avatarSize={AvatarSize.Small} />
      <Username>{username ? username : "Неизвестный"}</Username>
    </AnswerTopBlock>
    <AnswerBody>{body}</AnswerBody>
  </AnswerContainer>
);

export default AnswerCard;
