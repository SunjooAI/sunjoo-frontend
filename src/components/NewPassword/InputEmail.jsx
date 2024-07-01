  import { useEffect, useState } from "react";
  import { useDispatch } from "react-redux";
  import { useNavigate, withRouter } from "react-router-dom";
  // import axios from "axios";
  import { Cookies } from "react-cookie";
  import S from "./styled";
  import logo from "../../image/logo2.png";
  import { GET_NAME } from "../../reducer/nameSlice";
  import {CustomApi} from "../../apis/CustomApi";
  import Input  from '@mui/material/Input';
  import Box from '@mui/material/Box';
  import Button from '@mui/material/Button';
  import SendIcon from '@mui/icons-material/Send';


  function InputEmail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const sendEmail = async() => {
      console.log("메일 전송 : " + email);
      const authToken = localStorage.getItem("user-token");

      try {
        
        const res = await CustomApi({
          method: "post",
          url: "/auth/reset-password/send-email",
          headers: {
            'Authorization': authToken
          },
          data: {
           email:email
          },
        });
        alert("메일 전송이 완료되었습니다. 메일함을 확인해 주세요!");
      }
      catch(err) {
          console.log("메일 전송 실패", err);
          alert("메일 전송에 실패했습니다. 다시 시도해주세요.");
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
            유효한 이메일 주소를 입력해 주세요! 비밀번호 재설정 링크가 포함된 안내 메일이 발송됩니다.
          </S.explainBox>
          <S.BtnList>
            <Box mb={3}><Input placeholder="e-mail" sx={{width: 300}} onChange={(e)=>{setEmail(e.target.value)}}/></Box>
            <Button 
                onClick={sendEmail}
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
  