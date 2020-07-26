import { FunctionComponent } from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Loader = styled.img`
  height: 5rem;
`;

const Loading: FunctionComponent = () => (
  <LoadingWrapper>
    <Loader src="/assets/loader.gif" alt="loading..." />
  </LoadingWrapper>
);

export default Loading;
