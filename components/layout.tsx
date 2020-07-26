import { FunctionComponent, ReactNode } from "react";
import styled from "styled-components";

import Header from "./header";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.main`
  padding: 2rem 0 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface LayoutProps {
  headerTitle?: string;
  headerSubTitle?: string;
  headerChildren?: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({
  headerTitle,
  headerSubTitle,
  headerChildren,
  children,
}) => (
  <Container>
    <Header title={headerTitle} subTitle={headerSubTitle} children={headerChildren} />
    <Content>{children}</Content>
  </Container>
);

export default Layout;
