/* 로그인, 회원가입의 로직
  1. [x]카카오 토큰을 받아온다
  2. [x]서버에게 GET 요청 (서버와 통신 될때 넣을 얘쩡)
  3. [x]JWT 토큰(access, refresh)을 RESPONSE로 받게 되고 localstorage나 cookie에 저장시킨다. => 현재 cookie 사용으로 setting 해놓음.
  4. */
  import { useEffect, useState } from "react";
  import { useNavigate, withRouter } from "react-router-dom";
  // import axios from "axios";
  import { Cookies } from "react-cookie";
  import S from "./styled";
  import logo from "../../image/logo2.png";
  import { useDispatch } from "react-redux";
  import jwt_decode from "jwt-decode";
  import { GET_NAME } from "../../reducer/nameSlice";
  import noAuthClient from "../../apis/noAuthClient";
  import authClient from "../../apis/authClient";
  import Input  from '@mui/material/Input';
  import Box from '@mui/material/Box';
  import Button from '@mui/material/Button';
  import SendIcon from '@mui/icons-material/Send';

  function InputEmail() {
  
    return (
      <S.Container>
        <S.Wrapper>
          <S.Title>BeJuRyu 서비스에 오신것을 환영합니다.</S.Title>
          <S.Form>
            <S.bejuryuImg src={logo} alt="logo"></S.bejuryuImg>
          </S.Form>
          <S.explainBox>
            유효한 이메일 주소를 입력해 주세요! 비밀번호 재설정 링크가 포함된 안내 메일이 발송됩니다.
          </S.explainBox>
          <S.BtnList>
            <Box mb={3}><Input placeholder="e-mail" sx={{width: 300}}/></Box>
            <Button 
                variant="contained" 
                endIcon={<SendIcon />} 
                style={{
                    backgroundColor: "#9932cc",
                    fontFamily: "BejuryuFont",
                    fontSize: "14px",
                }}    
            > SEND </Button>
          </S.BtnList>
        </S.Wrapper>
      </S.Container>
    );
  }
  
  export default InputEmail;
  