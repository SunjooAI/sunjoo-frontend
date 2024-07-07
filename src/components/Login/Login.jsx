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
import { useGoogleLogin } from "@react-oauth/google";

const { Kakao } = window;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [googleName, setGoogleName] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");

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


    // 구글 로그인
    const handlGoogleLogin = async(response) => {
      console.log(response);
      try {
        const res = await CustomApiLogin({
          method: "post",
          url: "/auth/login/google",
          
          data: {
            name:response.name,
            email:response.email
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

    const googleLogin = useGoogleLogin({
        onSuccess: async(res) => {
          const ACCESS = res.access_token;

          try {
            const response = await CustomApiLogin({
              method: "post",
              url: "/auth/login/google-token",
              data: {
               token:ACCESS
              },
            });
      
            console.log(response);
            handlGoogleLogin(response.data);
          }
          catch(err) {
            console.log("실패", err);
          }
        }
    })


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
          </div>
        </S.BtnList>
        <S.socialSignIn>
          <S.socialLine/>
          <S.socialTitle>간편 로그인</S.socialTitle>
          <S.socialButtonList>
            <S.socialButtonWrapper>
              <S.socialButton data-link="https://kauth.kakao.com/oauth/authorize?response_type=code&amp;client_id=0de1184063abadc9cef9dbf417c567a5&amp;redirect_uri=https%3A%2F%2Fwww.inflearn.com%2Fauth%2Fkakao&amp;scope=profile%20account_email%20birthday%20birthyear%20phone_number%20age_range%20gender&amp;state=%7B%22prev_url%22%3A%22https%3A%2F%2Fwww.inflearn.com%2Fsignin%3FreferUrl%3Dhttps%253A%252F%252Fwww.inflearn.com%252F%253Futm_source%253Dgoogle%2526utm_medium%253Dcpc%2526utm_campaign%253Dbrand%2526gclid%253DEAIaIQobChMImcaRvdu58QIV1SMrCh0dBAxREAAYASAAEgLovfD_BwE%2523%22%7D"  style={{ backgroundColor: '#fae500' }} onClick={login}>
                <svg width="18px" xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 0 18 17"><g transform="translate(0.000000,17.000000) scale(0.100000,-0.100000)" stroke="none"><path fill="#212529" d="M38 154 c-15 -8 -30 -25 -34 -38 -6 -26 10 -66 27 -66 7 0 9 -10 5 -26 -7 -25 -6 -25 16 -10 12 9 31 16 41 16 29 0 75 28 82 50 10 31 -3 59 -35 75 -36 19 -67 18 -102 -1z"></path></g></svg>
              </S.socialButton>
            </S.socialButtonWrapper>
            <S.socialButtonWrapper>
            <S.socialButtonWrapper>
              <S.socialButton id="Google-로그인-버튼" class="social__button social__button--Google e-o-auth" data-provider="Google" data-link="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&amp;prompt=consent&amp;scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&amp;response_type=code&amp;client_id=887875630717-ror9t8ig4obhvokdij07eoochpqbu5kf.apps.googleusercontent.com&amp;redirect_uri=https%3A%2F%2Fwww.inflearn.com%2Fauth%2Fgoogle&amp;state=%7B%22prev_url%22%3A%22https%3A%2F%2Fwww.inflearn.com%2Fsignin%3FreferUrl%3Dhttps%253A%252F%252Fwww.inflearn.com%252F%253Futm_source%253Dgoogle%2526utm_medium%253Dcpc%2526utm_campaign%253Dbrand%2526gclid%253DEAIaIQobChMImcaRvdu58QIV1SMrCh0dBAxREAAYASAAEgLovfD_BwE%2523%22%7D" style={{ backgroundColor: '#f8f8f8' }} onClick={googleLogin}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.785 9.169c0-.738-.06-1.276-.189-1.834h-8.42v3.328h4.942c-.1.828-.638 2.073-1.834 2.91l-.016.112 2.662 2.063.185.018c1.694-1.565 2.67-3.867 2.67-6.597z"></path><path fill="#34A853" d="M9.175 17.938c2.422 0 4.455-.797 5.94-2.172l-2.83-2.193c-.758.528-1.774.897-3.11.897-2.372 0-4.385-1.564-5.102-3.727l-.105.01-2.769 2.142-.036.1c1.475 2.93 4.504 4.943 8.012 4.943z"></path><path fill="#FBBC05" d="M4.073 10.743c-.19-.558-.3-1.156-.3-1.774 0-.618.11-1.216.29-1.774l-.005-.119L1.254 4.9l-.091.044C.555 6.159.206 7.524.206 8.969c0 1.445.349 2.81.957 4.026l2.91-2.252z"></path><path fill="#EB4335" d="M9.175 3.468c1.684 0 2.82.728 3.468 1.335l2.531-2.471C13.62.887 11.598 0 9.175 0 5.667 0 2.638 2.013 1.163 4.943l2.9 2.252c.727-2.162 2.74-3.727 5.112-3.727z"></path></svg>
              </S.socialButton>
            </S.socialButtonWrapper>
            </S.socialButtonWrapper>
          </S.socialButtonList>
      </S.socialSignIn>
      </S.Wrapper>
    </S.Container>
  );
}

export default Login;
