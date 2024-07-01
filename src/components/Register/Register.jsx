/* 로그인, 회원가입의 로직
  1. [x]카카오 토큰을 받아온다
  2. [x]서버에게 GET 요청 (서버와 통신 될때 넣을 얘쩡)
  3. [x]JWT 토큰(access, refresh)을 RESPONSE로 받게 되고 localstorage나 cookie에 저장시킨다. => 현재 cookie 사용으로 setting 해놓음.
  4. */
  import { useEffect, useState } from "react";
  import { Link, useNavigate, withRouter } from "react-router-dom";
  import S from "./styled";
  import logo from "../../image/logo2.png";
  import { useDispatch } from "react-redux";
  import jwt_decode from "jwt-decode";
  import {CustomApi} from "../../apis/CustomApi";
  import { GET_NAME } from "../../reducer/nameSlice";
  import noAuthClient from "../../apis/noAuthClient";
  import authClient from "../../apis/authClient";
  import TextField  from '@mui/material/TextField';
  import Box from '@mui/material/Box';
  import { Button } from "@mui/material";
  
  const { Kakao } = window;
  
  function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleRegister = async() => {
      try {
        const res = await CustomApi({
          method: "post",
          url: "/auth/register",
          
          data: {
            id:id,
            password:password,
            name:name
          },
        });
        
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      }
      catch(err) {
          console.log("회원가입 실패", err);
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      }

    return (
      <S.Container>
        <S.Wrapper>
          <S.Title>BeJuRyu 서비스에 오신것을 환영합니다.</S.Title>
          <S.Form>
            <S.bejuryuImg src={logo} alt="logo"></S.bejuryuImg>
          </S.Form>
          <S.explainBox>
            많이 마시면 해롭지만, 즐겁게 마시면 활력소가 되어 줍니다. 오늘,
            BeJuRyu와 함께 술 한잔 어떤가요?
          </S.explainBox>
          <S.BtnList>
            <Box m={2}>
                <TextField
                    sx={{
                        width: 350
                    }}
                    required
                    size="small"
                    id="outlined-required"
                    label="아이디"
                    onChange={(e)=>{setId(e.target.value)}}
                />
            </Box>
            <Box m={2}>
                <TextField
                    sx={{
                        width: 350
                    }}
                    required
                    size="small"
                    id="outlined-required"
                    label="비밀번호"
                    type="password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
            </Box>
            <Box m={2}>
                <TextField
                    sx={{
                        width: 350
                    }}
                    required
                    size="small"
                    id="outlined-required"
                    label="이름"
                    onChange={(e)=>{setName(e.target.value)}}
                />
            </Box>
            <Button 
                onClick={handleRegister}
                variant="contained"
                style={{
                    backgroundColor: "#9932cc",
                    fontFamily: "BejuryuFont",
                    fontSize: "14px",
                }}  
            >회원 가입</Button>
          </S.BtnList>
        </S.Wrapper>
      </S.Container>
    );
  }
  
  export default Register;
  