  import { useEffect, useState } from "react";
  import { useNavigate, withRouter } from "react-router-dom";
  // import axios from "axios";
  import { Cookies } from "react-cookie";
  import S from "./styled";
  import logo from "../../image/logo2.png";
  import { useDispatch } from "react-redux";
  import {CustomApi} from "../../apis/CustomApi";
  import TextField  from '@mui/material/TextField';
  import Box from '@mui/material/Box';
  import Button from '@mui/material/Button';

  function InputNewPwd() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const sendNewPwd = async() => {
      try {
        
        const res = await CustomApi({
          method: "put",
          url: "/auth/new-password",
          data: {
            id:id,
            newPassword:newPassword
          },
        });
        alert("비밀번호가 성공적으로 변경되었습니다!");
      }
      catch(err) {
          console.log("비밀번호 변경 실패", err);
          alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
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
            새 비밀번호를 입력 후 비밀번호 재설정을 누르면 새로운 비밀번호가 설정되며 변경된 비밀번호로 로그인 할 수 있습니다.
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
                    label="새 비밀번호"
                    type="password"
                    onChange={(e)=>{setNewPassword(e.target.value)}}
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
                    label="비밀번호 확인"
                    type="password"
                />
            </Box>
            <Button 
              onClick={sendNewPwd}
                variant="contained" 
                style={{
                    backgroundColor: "#9932cc",
                    fontFamily: "BejuryuFont",
                    fontSize: "14px",
                }}    
            > 비밀번호 재설정 </Button>
          </S.BtnList>
        </S.Wrapper>
      </S.Container>
    );
  }
  
  export default InputNewPwd;
  