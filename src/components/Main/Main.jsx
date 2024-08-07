import S from "./styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import settingCookie from "../../utils/settingCookie";
import { useDispatch } from "react-redux";
import authClient from "../../apis/authClient";
import noAuthClient from "../../apis/noAuthClient";
import CircularProgress from "@mui/material/CircularProgress";
import { CustomApi } from "../../apis/CustomApi";

import { useSelector } from "react-redux";

function MainPage() {
  // 리뷰순 랭킹
  const [reviewRank, setReviewRank] = useState([]);
  // 평점순 랭킹
  const [scoreRank, setScoreRank] = useState([]);
  // 로딩 상태를 관리하는 변수
  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const [userNickname, setUserNickname] = useState(true);

  // 새로고침 관리
  const [hasRefreshed, setHasRefreshed] = useState(false);

  const navigate = useNavigate();


  // 이미지 디코딩 함수
  // const decodeBase64 = (base64) => {
  //   const binaryString = window.atob(base64);
  //   const bytes = new Uint8Array(binaryString.length);
  //   for (let i = 0; i < binaryString.length; i++) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }
  //   return URL.createObjectURL(new Blob([bytes.buffer], { type: "image/png" }));
  // };

  //console.log(typeof userId);

  // 주류 랭킹 보여주기 위해 api 요청
  useEffect(() => {
    const getReviewRanking = async () => {
      const authToken = localStorage.getItem("user-token");
      try {
        const response = await CustomApi({
          method: "get",
          url: `/drinks/rankings/review`,
          headers: {
            'Authorization': authToken
          },
        });
        if (response) {
          setReviewRank(response.data.ranking);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getScoreRanking = async () => {
      const authToken = localStorage.getItem("user-token");
      try {
        const response = await CustomApi({
          method: "get",
          url: `/drinks/rankings/rating`,
          headers: {
            'Authorization': authToken
          },
        });
        if (response) {
          setScoreRank(response.data.ranking);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getUserInfo = async() => {
      const authToken = localStorage.getItem("user-token");

      try {
        const res = await CustomApi({
          method: "get",
          url: "/auth/userinfo",
          headers: {
            'Authorization': authToken
          },
        });
        if(res) {
          setUserNickname(res.data.result.name);
          
        }
      }
      catch(err) {
          console.log("유저 정보 조회 실패", err);
        }
      }

    // API 요청 함수 호출
    getReviewRanking();
    getScoreRanking();
    getUserInfo();
    //window.location.reload();
  }, []);

  // 각 주류 상세 페이지로 이동
  const checkJuryuInfo = async (e, juryuId) => {
    e.preventDefault();
    navigate("/juryuInfo", { state: { juryuId } });
    const authToken = localStorage.getItem("user-token");
    try {
      const res = await CustomApi({
        method: "get",
        url: `/drinks/${juryuId}`,
        headers: {
          'Authorization': authToken
        },
      });
    } catch (error) {
      if (error.response) {
        const err = error.response.data;
        console.log(err);
      }
    }
  };

  const checkHistory = async (e) => {
    e.preventDefault();
    navigate("/history");
    const authToken = localStorage.getItem("user-token");

    try {
      const res = await CustomApi({
        method: "get",
        url: "/analyze",
        headers: {
          'Authorization': authToken
        },
      });
      console.log(res);
    } catch (error) {
      if (error.response) {
        const err = error.response.data;
        console.log(err);
      }
    }

    
    // 닉네임 조회
    try {
      const response = await CustomApi({
        method: "get",
        url: `/auth/userinfo`,
        headers: {
          'Authorization': authToken
        },
      });
    } catch (error) {
      if (error.response) {
        const err = error.response.data;
        console.log(err);
      }
    }
  };

  const userName = localStorage.getItem("nickname");

  const handleReviewData = () => {
    setSelectedData(reviewRank);
  };

  const handleScoreData = () => {
    setSelectedData(scoreRank);
  };
  const MainPageView = (
    <S.Container>
      <S.Wrapper>
        <S.Form>
          {userNickname} 님 오늘의 기분은 어떠신가요? Be주류 TOP10을 확인할 수
          있어요!
          {isLoading ? (
            <S.juruBox
              style={{
                paddingTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </S.juruBox>
          ) : (
            <>
              <S.ButtonContainer>
                <S.SubmitButton onClick={handleReviewData}>
                  리뷰많은순
                </S.SubmitButton>
                <S.SubmitButton onClick={handleScoreData}>
                  평점순
                </S.SubmitButton>
              </S.ButtonContainer>
              <S.juruBox>
                <S.JuruBoxContainer>
                  {selectedData &&
                    selectedData.map((drink, index) => (
                      <S.ReviewBox
                        key={index}
                        onClick={(e) => checkJuryuInfo(e, drink.id)}
                      >
                        <S.Image
                          src={drink.image}
                          alt="주류이미지"
                        />
                        <h5 style={{ width: "100%", height: "30px" }}>
                          {drink.name}
                        </h5>
                        <p style={{ width: "100%", height: "20px" }}>
                          ⭐{drink.rating.toFixed(1)} ({drink.reviewCount})
                        </p>
                      </S.ReviewBox>
                    ))}
                </S.JuruBoxContainer>
              </S.juruBox>
            </>
          )}
        </S.Form>
      </S.Wrapper>
    </S.Container>
  );

  return MainPageView;
}

export default MainPage;
