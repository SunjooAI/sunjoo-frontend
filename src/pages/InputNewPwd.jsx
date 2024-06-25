import React from "react";
import InputNewPwd from "../components/NewPassword/InputNewPwd";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 48.5px);
`;

const Content = styled.div``;
const InputNewPwdPage = () => {
  return (
    <Main>
      <Content>
        <InputNewPwd />
      </Content>
    </Main>
  );
};

export default InputNewPwdPage;
