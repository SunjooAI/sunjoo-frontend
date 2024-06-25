import React from "react";
import InputEmail from "../components/NewPassword/InputEmail";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 48.5px);
`;

const Content = styled.div``;
const InputEmailPage = () => {
  return (
    <Main>
      <Content>
        <InputEmail />
      </Content>
    </Main>
  );
};

export default InputEmailPage;
