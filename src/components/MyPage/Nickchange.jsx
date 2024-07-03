import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import S from "./styled";
import "../../utils/settingCookie";
import {CustomApi} from "../../apis/CustomApi";
import noAuthClient from "../../apis/noAuthClient";
import { GET_NAME } from "../../reducer/nameSlice";
import { useDispatch } from "react-redux";

function NickChange() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState("");
  const onNickHandler = (e) => {
    setNickname(e.currentTarget.value);
  };

  // api 명세서 업데이트 되면 수정 예정
  const onchangeNick = async () => {
    const authToken = localStorage.getItem("user-token");
    
    console.log(nickname);

    try {
      const res = await CustomApi({
        method: "put",
        url: "/auth/nickname",
        headers: {
          'Authorization': authToken
        },
        data: {
          newNickName: nickname,
        },
      });

      navigate("/");
      alert("변경이 완료되었습니다.");
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
  };
  localStorage.setItem("nickname", nickname);
  const NickChangeView = (
    <S.Container2>
      <S.Info>
        <S.NickCheck type="button" onClick={onchangeNick}>
          {" "}
          {/* 수정된 부분 */}
          닉네임 변경
        </S.NickCheck>
        <S.LogoutButton type="button" onClick={() => navigate("/MyPage")}>
          되돌아가기
        </S.LogoutButton>
      </S.Info>
      <S.Wrapper>
        {/* 전역 상태관리 기능 추가 */}

        <S.Input
          type="text"
          value={nickname}
          placeholder="변경할 닉네임을 입력하세요"
          onChange={onNickHandler}
        ></S.Input>
        {/* </S.Form> */}
      </S.Wrapper>
    </S.Container2>
  );

  return NickChangeView;
}

export default NickChange;
