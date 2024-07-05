import React from "react";
import VideoRoomComponent from "../components/Cam/VideoRoomComponent";
import styled from "styled-components";
import registerServiceWorker from '../registerServiceWorker';

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 48.5px);
`;

const Content = styled.div``;

const CamPage = () => {
  return (
    <Main>
      <Content>
        <VideoRoomComponent />
      </Content>
    </Main>
  );
};

export default CamPage;
