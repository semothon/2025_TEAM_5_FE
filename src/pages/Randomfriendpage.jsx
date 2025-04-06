import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/themes";
import logoimg from "../assets/loginpageimg/logoimg.png";
import loadingimg from "../assets/loadingimg/loadingimg.png";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Randomfriendpage = () => {
  const navigator = useNavigate();
  const controllerRef = useRef(null);


  const img = logoimg;
  const img2 = loadingimg;

  const [isloading, setisloading] = useState(true);
  const [curoverlayinfo,setcuroverlayinfo] = useState({})


  useEffect(() => {
    getdata();

    return () => {
      controllerRef.current?.abort(); // 언마운트 시 요청 중단
    };
  }, []);

  const getdata = async () => {
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const result = await axiosInstance.post(`http://localhost:3000/getworldcup`, {
        signal: controller.signal,
        size:1
      });
      console.log(result.data)
      setcuroverlayinfo(result.data)
      setisloading(false);
    } catch (err) {
      if (axios.isCancel(err) || err.name === "CanceledError" || err.name === "AbortError") {
        console.log("요청이 취소됨");
        return;
      }
      console.error(err);
      navigator("/mainpage", { replace: true });
      if (err.response?.data?.error) alert(err.response.data.error);
    }
  };

  const sendmessage = async () => {
    try {
        const datas = await axiosInstance.post("http://localhost:3000/addfriend",{
            friendemail:curoverlayinfo.email
        })
        console.log(datas)
        alert("친구요청완료")

        navigator("/mainpage", { replace: true });
    }
    catch(err){
        console.error(err)
        alert("친구요청실패")
    }
}

  

  return (
    <Container>
      <Topbar>
        <img src={img} style={{ width: "10%", height: "50%" }} />
      </Topbar>
      {isloading ? (
        <Loadingview>
          <Textcontainer>랜덤 친구 찾는중....</Textcontainer>
          <Imgcontainer src={img2} />
          <CancelBtn
            onClick={() => {
              controllerRef.current?.abort(); // 요청 취소
              navigator("/mainpage", { replace: true });
            }}
          >
            취소
          </CancelBtn>
        </Loadingview>
      ) : (
        <>
            <Titlebar>나의 이상형은</Titlebar>
                    <Overlay_container2>
                        <Overlay_img src={curoverlayinfo.profileImage}></Overlay_img>
                        <Overlay_title>
                            <div style={{
                                width: "100%", height: "55%", display: "flex", alignItems: "center",
                                fontFamily: "HakgyoansimChilpanjiugaeTTF-B",
                                fontSize: "28px",
                                fontWeight: "600"
                            }}>{curoverlayinfo.name}</div>
                            <div style={{ width: "100%", height: "45%", textAlign: "left" }}>{curoverlayinfo.shortdiscription}</div>
                        </Overlay_title>
                        <Overlay_text style={{ top: "27%" }}>
                            <div style={{ width: "25%", height: "100%", display: "flex", alignItems: "center" }}>학과</div>
                            <div style={{ width: "75%", height: "100%", display: "flex", alignItems: "center" }}>{curoverlayinfo.major}</div>
                        </Overlay_text>
                        <Overlay_text style={{ top: "35%" }}>
                            <div style={{ width: "25%", height: "100%", display: "flex", alignItems: "center" }}>학번</div>
                            <div style={{ width: "75%", height: "100%", display: "flex", alignItems: "center" }}>{curoverlayinfo.schoolid}</div>
                        </Overlay_text>
                        <Overlay_text style={{ top: "43%" }}>
                            <div style={{ width: "25%", height: "100%", display: "flex", alignItems: "center" }}>MBTI</div>
                            <div style={{ width: "75%", height: "100%", display: "flex", alignItems: "center" }}>{curoverlayinfo.mbti}</div>
                        </Overlay_text>
                        <Overlay_text style={{ top: "51%" }}>
                            <div style={{ width: "25%", height: "100%", display: "flex", alignItems: "center" }}>지역</div>
                            <div style={{ width: "75%", height: "100%", display: "flex", alignItems: "center" }}>{curoverlayinfo.region}</div>
                        </Overlay_text>
                        <Overlay_text_large>
                            <div style={{ width: "25%", height: "100%", textAlign: "left" }}>자기소개</div>
                            <div style={{ width: "75%", height: "100%", textAlign: "left" }}>{curoverlayinfo.discription}</div>
                            <div></div>
                        </Overlay_text_large>
            
                    </Overlay_container2>
                    <Btn style={{ marginLeft: "24%" }} onClick={() => { sendmessage() }}>친구추가</Btn>
                    <Btn style={{ marginLeft: "54%", backgroundColor: theme.Sub3, color: "white" }} onClick={() => { navigator("/mainpage", { replace: true }) }}>그만하기</Btn>
       </>
      )}
    </Container>
  );
};

export default Randomfriendpage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position:relative;
  background-color: ${theme.Sub1};
`;

const Loadingview = styled.div`
  width: 100%;
  height: 90%;
  background-color: ${theme.Sub1};
  position: relative;
  display: flex;
  justify-content: center;
`;

const Worldcupview = styled.div`
  width: 100%;
  height: 90%;
  background-color: ${theme.Sub1};
`;

const Topbar = styled.div`
  width: 100%;
  height: 10%;
  background-color: ${theme.Main};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CancelBtn = styled.div`
  border-radius: 20px;
  position: absolute;
  top: 85%;
  width: 80%;
  height: 10%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.Sub1};
  font-family: Pretendard-Regular;
  font-weight: 600;
  font-size: 20px;
`;

const Imgcontainer = styled.img`
  position: absolute;
  top: 40%;
  left: 32%;
`;

const Textcontainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: HakgyoansimChilpanjiugaeTTF-B;
  font-weight: 600;
  font-size: 28px;
  width: 80%;
  height: 10%;
  color: white;
  top: 30%;
`;

const Navbar = styled.div`
align-items:center;
display:flex;
justify-content:center;
width:100%;
height:13%;
background-color:${theme.Main};
`
const Overlay_container2 = styled.div`
  width:70%;
  height:60%;
  margin-top:18%;
  margin-left:15%;
  background-color:white;
  font-family: Pretendard-Regular;
  font-weight: 400;
  font-size: 16px;
  position:relative;
  border-radius:8px;
`

const Overlay_img = styled.img`
width:30%;
height:18%;
top:5%;
left:60%;
position:absolute;
border-radius:8px;
`

const Overlay_title = styled.div`
width:45%;
height:15%;
top:5%;
left:10%;
position:absolute;
font-family: HakgyoansimChilpanjiugaeTTF-B;
font-weight: 400;
font-size: 16px;
color:${theme.Sub1};
`

const Overlay_text = styled.div`
width:80%;
height:6%;
left:10%;
position:absolute;
display:flex;
flex-direction:row;
align-items:center;
font-family: Pretendard-Regular;
font-weight: 400;
font-size: 16px;
color:${theme.Sub1};
`

const Overlay_text_large = styled.div`
width:80%;
height:25%;
left:10%;
display:flex;
flex-direction:row;
position:absolute;
top:60%;
font-family: Pretendard-Regular;
  font-weight: 400;
  font-size: 16px;
color:${theme.Sub1};
 overflow-y: auto;
scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`

const Btn = styled.div`
width:22%;
height:10%;
background-color:white;
position:absolute;
top:87%;
border-radius:8px;
display: flex;
align-items: center;
justify-content:center;
color:${theme.Sub1};
font-family: Pretendard-Regular;
  font-weight: 700;
  font-size: 16px;
&:hover{
cursor:pointer;
}
`

const Titlebar = styled.div`
position:absolute;
top:15%;
width:70%;
margin-left:15%;
height:7%;
display: flex;
align-items: center;
justify-content:center;
font-family: HakgyoansimChilpanjiugaeTTF-B;
font-weight: 400;
font-size: 30px;
color:white;
`
