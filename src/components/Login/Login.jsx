/* 로그인, 회원가입의 로직
  1. [x]카카오 토큰을 받아온다
  2. [x]서버에게 GET 요청 (서버와 통신 될때 넣을 얘쩡)
  3. [x]JWT 토큰(access, refresh)을 RESPONSE로 받게 되고 localstorage나 cookie에 저장시킨다. => 현재 cookie 사용으로 setting 해놓음.
  4. */
import { useEffect, useState } from "react";
import { Link, useNavigate, withRouter } from "react-router-dom";
// import axios from "axios";
import { Cookies } from "react-cookie";
import S from "./styled";
import logo from "../../image/logo2.png";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { GET_NAME } from "../../reducer/nameSlice";
import noAuthClient from "../../apis/noAuthClient";
import {CustomApiLogin} from "../../apis/CustomApi";
import authClient from "../../apis/authClient";
import TextField  from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import axios from "axios";

const { Kakao } = window;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // snsLogin
  const snsLogin = async (kakaoToken) => {
    try {
      const res = await noAuthClient({
        method: "get",
        url: `/auth/login/kakao?token=${kakaoToken}`,
      });
      
      const authToken = res.headers['authorization'];
      localStorage.setItem("user-token", authToken);
      dispatch(GET_NAME(authToken));
      // const cookie = new Cookies();
      // cookie.set("accessToken", res.data.token.access);
      // cookie.set("refreshToken", res.data.token.refresh);

      // const decode = jwt_decode(res.data.token.access);

      // redux에 nickname 저장
      //dispatch(GET_NAME(res.data.memberResponse.nickname));

      // localStorage.setItem("user-id", res.data.memberResponse.id);
      // localStorage.setItem("nickname", res.data.memberResponse.nickname);

      await sendTestRequest();
    } catch (error) {}
  };

  // test 용
  // 테스트용 GET 요청
  const sendTestRequest = async () => {
    try {
      const res = await authClient({
        method: "get",
        url: "/test",
      });
    } catch (error) {
      console.error("Test Error:", error);
    }
  };

  // 카카오 로그인
  const login = async (e) => {
    e.preventDefault();
    try {
      return new Promise((resolve, reject) => {
        if (!Kakao) {
          reject("Kakao 인스턴스가 존재하지 않습니다.");
        }
        Kakao.Auth.login({
          success: async (res) => {
            // 서버에 GET 요청을 보내는 작업
            const { access_token } = res;

            // snsLogin 함수 호출
            await snsLogin(access_token);
            navigate("/");

            // test 요청 보내기
            // await sendTestRequest();

            // setIsLogin(true);
            //console.log(res);
          },
          fail: (err) => {
            console.error(err);
          },
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 자체 로그인
  const handleLogin = async() => {
    console.log(id);
    console.log(password);

    try {
      const res = await CustomApiLogin({
        method: "post",
        url: "/auth/login",
        
        data: {
          id:id,
          password:password
        },
      });

      
    
      const authToken = res.headers['authorization'];
      localStorage.setItem("user-token", authToken);
      dispatch(GET_NAME(authToken));
      navigate("/");
    }
    catch(err) {
        console.log("로그인 실패", err);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }

  useEffect(() => {
    if (Kakao.Auth.getAccessToken()) {
      setIsLogin(true);
    }
  }, []);

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
          <div>
            <div>
              <TextField 
                sx={{ width: 350}} 
                size="small" 
                id="outlined-basic" 
                label="아이디" 
                variant="outlined" 
                margin="dense" 
                fullWidth 
                onChange={(e)=>{setId(e.target.value)}}/>
            </div>
            <div>
              <TextField 
                sx={{ width: 350}} 
                size="small" 
                id="outlined-basic" 
                label="비밀번호" 
                variant="outlined" 
                margin="dense" 
                type="password" 
                fullWidth 
                onChange={(e)=>{setPassword(e.target.value)}}
                />
            </div>
            <Box mb={2} mt={1}>
              <Link to="/Register"> <Button>회원가입</Button></Link>
              <Link to="/InputEmail"> <Button>비밀번호 찾기</Button></Link>
            </Box>
            <Button 
                onClick={handleLogin}
                variant="contained"
                style={{
                    backgroundColor: "#9932cc",
                    fontFamily: "BejuryuFont",
                    fontSize: "18px",
                    width: "222px",
                    height: "53px",
                    marginBottom: "5px"
                }}  
            >로그인
            </Button>
            <div
              id="kakao-login-btn"
              onClick={login}
              style={{ cursor: "pointer" }}
            >
              <img
                src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                width="222"
                alt="카카오 로그인 버튼"
              />
            </div>
          </div>
        </S.BtnList>
      </S.Wrapper>
    </S.Container>
  );
}

export default Login;
