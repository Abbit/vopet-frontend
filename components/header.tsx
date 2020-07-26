import styled from "styled-components";
import mediaSizes from "../utils/styleUtils";
import Logo from "./logo";
import Link from "next/link";
import A from "./a";
import AuthButtons from "./authButtons";
import { FunctionComponent } from "react";
import Title from "./title";
import SubTitle from "./subTitle";
import useSWR from "swr";
import { getApiClient } from "../lib/api";
import Button, { ButtonSize, ButtonType } from "./button";
import { localStorageTokenKey } from "../config";

const HeaderBlock = styled.header`
  background-color: #00a6ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 6rem 1rem;
  width: 100%;

  @media (max-width: ${mediaSizes.tablet}px) {
    padding: 0.5rem 0;
    justify-content: center;
  }
`;

const WaveContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

  & > svg {
    display: block;
  }
`;

const TitleContainer = styled.div`
  width: 100vw;
  text-align: center;
  padding: 2rem;
  padding-bottom: 0;
  background: #00a6ed;
  color: #fff;
`;

const ChildrenContainer = styled.div`
  background: #00a6ed;
  width: 100%;
`;

const Username = styled.span`
  margin-right: 2rem;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
`;

const HeaderWave = () => (
  <svg viewBox="0 0 1421 79" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M-19 0V0.0287763L61.4 6.03117C63.6328 6.20039 65.9304 6.37438 68.291 6.55313C149.665 12.7152 305.899 24.546 461 42.0456C487.175 44.9988 513.383 48.1136 539.612 51.2309C673.312 67.1209 807.575 83.0779 941 78.0599C1100.6 72.0575 1261.4 36.0432 1340.6 18.036L1421 0.0287763V0H-19Z"
      fill="#00A6ED"
    />
  </svg>
);

interface HeaderProps {
  title?: string;
  subTitle?: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title, subTitle, children }) => {
  const { data, mutate } = useSWR("getUserQuery", () => getApiClient().getUser(), {
    shouldRetryOnError: false,
  });

  const logout = () => {
    localStorage.removeItem(localStorageTokenKey);

    mutate(null);
  };

  return (
    <>
      <HeaderBlock>
        <Link href="/">
          <A>
            <Logo />
          </A>
        </Link>
        {data ? (
          <div>
            <A>
              <Link href="/profile">
                <Username>{data.user.username}</Username>
              </Link>
            </A>
            <Button
              buttonSize={ButtonSize.Small}
              buttonType={ButtonType.Transparent}
              style={{ marginRight: "1rem" }}
              onClick={logout}
            >
              Выйти
            </Button>
          </div>
        ) : (
          <AuthButtons />
        )}
      </HeaderBlock>
      {(title || subTitle) && (
        <TitleContainer>
          {title && <Title white>{title}</Title>}
          {subTitle && (
            <SubTitle white style={{ paddingTop: "1.5rem" }}>
              {subTitle}
            </SubTitle>
          )}
        </TitleContainer>
      )}
      {children && <ChildrenContainer>{children}</ChildrenContainer>}
      <WaveContainer>
        <HeaderWave />
      </WaveContainer>
    </>
  );
};

export default Header;
