import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/themes";
import logoimg from "../assets/loginpageimg/logoimg.png";
import loadingimg from "../assets/loadingimg/loadingimg.png";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const Worldcuppage = () => {
  const navigator = useNavigate();
  const controllerRef = useRef(null);


  const img = logoimg;
  const img2 = loadingimg;

  const [overlayinfo,setoverlayinfo] = useState(false)
  const [isloading, setisloading] = useState(true);
  const [isSecond, setIsSecond] = useState(false);
  const [worldcupdata, setworldcupdata] = useState([]);
  const [worldcupdata2, setworldcupdata2] = useState([]);
  const [currentinfo, setcurrentinfo] = useState([{}, {}]);
  const [curoverlayinfo,setcuroverlayinfo] = useState({})
  const [tournement, settournement] = useState(32);
  const [curtournement, setcurtournement] = useState(0);
  const [isoverlay, setisoverlay] = useState(false)

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
      const result = await axiosInstance.post("/getworldcup", {
        signal: controller.signal,
        size:32
      });
      setworldcupdata(result.data);
      setcurrentinfo([result.data[0], result.data[1]]);
      setisloading(false);
    } catch (err) {
      if (axios.isCancel(err) || err.name === "CanceledError" || err.name === "AbortError") {
        console.log("요청이 취소됨");
        return;
      }
      console.error(err);
      navigator("/mainpage", { replace: true })
      setisloading(false);
      if (err.response?.data?.error) alert(err.response.data.error);
    }
  };

  const variants = {
    initial: {
      x: 100, // 들어올 때 오른쪽에서
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: -100, // 나갈 때 왼쪽으로
      opacity: 0,
    },
  };

  const togglePage = () => {
    setIsSecond((prev) => !prev);
  };

  const selectbtn = (i) => {
    console.log(tournement)
    if (tournement === 32) {
      if (curtournement + 2 != 32)
        setcurrentinfo([worldcupdata[curtournement + 2], worldcupdata[curtournement + 3]]);
      const newdata = worldcupdata2;
      newdata.push(worldcupdata[curtournement + i]);
      setworldcupdata2(newdata);
      if (curtournement + 2 === 32) {
        console.log(worldcupdata2)
        settournement(16);
        setcurtournement(0);
        setworldcupdata([]);
        setcurrentinfo([worldcupdata2[0], worldcupdata2[1]]);
      } else setcurtournement(curtournement + 2);
    }
    else if (tournement === 16) {
      if (curtournement + 2 != 16)
        setcurrentinfo([worldcupdata2[curtournement + 2], worldcupdata2[curtournement + 3]]);
      const newdata = worldcupdata;
      newdata.push(worldcupdata2[curtournement + i]);
      setworldcupdata(newdata);
      if (curtournement + 2 === 16) {
        settournement(8);
        setcurtournement(0);
        setworldcupdata2([]);
        setcurrentinfo([worldcupdata[0], worldcupdata[1]]);
      } else setcurtournement(curtournement + 2);
    }
    else if (tournement === 8) {
      if (curtournement + 2 != 8)
        setcurrentinfo([worldcupdata[curtournement + 2], worldcupdata[curtournement + 3]]);
      const newdata = worldcupdata2;
      newdata.push(worldcupdata[curtournement + i]);
      setworldcupdata2(newdata);
      if (curtournement + 2 === 8) {
        settournement(4);
        setcurtournement(0);
        setworldcupdata([]);
        setcurrentinfo([worldcupdata2[0], worldcupdata2[1]]);
      } else setcurtournement(curtournement + 2);
    }
    else if (tournement === 4) {
      if (curtournement + 2 != 4)
        setcurrentinfo([worldcupdata2[curtournement + 2], worldcupdata2[curtournement + 3]]);
      const newdata = worldcupdata;
      newdata.push(worldcupdata2[curtournement + i]);
      setworldcupdata(newdata);
      if (curtournement + 2 === 4) {
        settournement(2);
        setcurtournement(0);
        setworldcupdata2([]);
        setcurrentinfo([worldcupdata[0], worldcupdata[1]]);
      } else setcurtournement(curtournement + 2);
    }
    else if (tournement === 2) {
      console.log("게임완료")
      navigator(`/myfavorite?email=${currentinfo[i].email}`, { replace: true });
    }
    togglePage();
  };

  const clickback = () => {
    setisoverlay(true)
  }

  return (
    <Container>
      {isoverlay &&
        <Overlay>
          {!overlayinfo &&
            <Overlay_container>
            <div style={{ color: 'black', fontSize: '1.1rem', width: "100%", height: "70%", display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center", borderBottom: "1px solid grey" }}>
              이상형 월드컵을 그만하시겠습니까? <br/>
              <div style={{fontSize: '0.75rem'}}>해당 이상형 월드컵 기록은 저장되지 않습니다.</div>
            </div>
            <div style={{ color: 'black', width: "100%", height: "30%", display: "flex", flexDirection: "row" }}>
              <div style={{ width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => { setisoverlay(false) }}>계속하기</div>
              <div style={{ color: `${theme.Sub1}`, width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid grey" }} onClick={(() => {
                navigator("/mainpage", { replace: true });
              })}>그만하기</div>
            </div>
          </Overlay_container>
          }
          {overlayinfo && 
            <Overlay_container2>
              <Overlay_img src={curoverlayinfo.profileImage}></Overlay_img>
              <Overlay_title>
                <div style={{width:"100%",height:"55%",display:"flex",alignItems:"center",
                  fontFamily:"HakgyoansimChilpanjiugaeTTF-B",
                  fontSize:"28px",
                  fontWeight:"600"}}>{curoverlayinfo.name}</div>
                <div style={{width:"100%",height:"45%",textAlign:"left"}}>{curoverlayinfo.shortdiscription}</div>
              </Overlay_title>
              <Overlay_text style={{top:"27%"}}>
                <div style={{width:"25%",height:"100%",display:"flex",alignItems:"center"}}>학과</div>
                <div style={{width:"75%",height:"100%",display:"flex",alignItems:"center"}}>{curoverlayinfo.major}</div>
                </Overlay_text>
              <Overlay_text style={{top:"35%"}}>
              <div style={{width:"25%",height:"100%",display:"flex",alignItems:"center"}}>학번</div>
              <div style={{width:"75%",height:"100%",display:"flex",alignItems:"center"}}>{curoverlayinfo.schoolid}</div>
              </Overlay_text>
              <Overlay_text style={{top:"43%"}}>
              <div style={{width:"25%",height:"100%",display:"flex",alignItems:"center"}}>MBTI</div>
              <div style={{width:"75%",height:"100%",display:"flex",alignItems:"center"}}>{curoverlayinfo.mbti}</div>
                </Overlay_text>
              <Overlay_text style={{top:"51%"}}>
              <div style={{width:"25%",height:"100%",display:"flex",alignItems:"center"}}>지역</div>
              <div style={{width:"75%",height:"100%",display:"flex",alignItems:"center"}}>{curoverlayinfo.region}</div>
                </Overlay_text>
              <Overlay_text_large>
                <div style={{width:"25%",height:"100%", textAlign:"left"}}>자기소개</div>
                <div style={{width:"75%",height:"100%",textAlign:"left"}}>{curoverlayinfo.discription}</div>
                <div></div>
              </Overlay_text_large>
              <Closebtn onClick={()=>{setoverlayinfo(false); setisoverlay(false);}}>닫기</Closebtn>
              
            </Overlay_container2>
          }
        </Overlay>
      }
      <Topbar>
        <MdOutlineArrowBackIosNew onClick={() => { clickback() }} style={{ position: "absolute", left: "4%", color: `${theme.Sub1}` }} />
        <img src={img} style={{ width: "15%", height: "auto", position: "absolute", left: "42%" }} />
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
        <Worldcupview>
          <Container>
            <AnimatePresence mode="wait">
              {isSecond ? (
                <motion.div
                  key="second"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                  style={{ width: "100%", height: "100%", backgroundColor: theme.Sub1, position: "relative" }}
                >
                  <CurTournement>{tournement}강</CurTournement>
                  <WorldcupContainer style={{ left: "15%" }} onClick={() => {setcuroverlayinfo(currentinfo[0]);setoverlayinfo(true); setisoverlay(true) }}>
                    <Smallcontainer_img src={currentinfo[0].profileImage}></Smallcontainer_img>
                    <Smallcontainer_name>{currentinfo[0].name}</Smallcontainer_name>
                  </WorldcupContainer>
                  <WorldcupContainer style={{ left: "55%" }} onClick={() => {setcuroverlayinfo(currentinfo[1]);setoverlayinfo(true); setisoverlay(true) }}>
                    <Smallcontainer_img src={currentinfo[1].profileImage}></Smallcontainer_img>
                    <Smallcontainer_name>{currentinfo[1].name}</Smallcontainer_name>
                  </WorldcupContainer>
                  <WorldcupButton style={{ left: "15%" }} onClick={() => { selectbtn(0) }}>A</WorldcupButton>
                  <WorldcupButton style={{ left: "55%" }} onClick={() => { selectbtn(1) }}>B</WorldcupButton>



                </motion.div>
              ) : (
                <motion.div
                  key="first"
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="absolute w-full h-full top-0 left-0 p-4 bg-blue-200 rounded-xl"
                  style={{ width: "100%", height: "100%", backgroundColor: theme.Sub1, position: "relative" }}
                >
                  <CurTournement>{tournement}강</CurTournement>
                  <WorldcupContainer style={{ left: "15%" }} onClick={() => {setcuroverlayinfo(currentinfo[0]); setoverlayinfo(true); setisoverlay(true)}}>
                    <Smallcontainer_img src={currentinfo[0].profileImage}></Smallcontainer_img>
                    <Smallcontainer_name>{currentinfo[0].name}</Smallcontainer_name>
                  </WorldcupContainer>
                  <WorldcupContainer style={{ left: "55%" }} onClick={() => {setcuroverlayinfo(currentinfo[1]); setoverlayinfo(true); setisoverlay(true) }}>
                    <Smallcontainer_img src={currentinfo[1].profileImage}></Smallcontainer_img>
                    <Smallcontainer_name>{currentinfo[1].name}</Smallcontainer_name>
                  </WorldcupContainer>
                  <WorldcupButton style={{ left: "15%" }} onClick={() => { selectbtn(0) }}>A</WorldcupButton>
                  <WorldcupButton style={{ left: "55%" }} onClick={() => { selectbtn(1) }}>B</WorldcupButton>

                </motion.div>
              )}
            </AnimatePresence>

          </Container>
        </Worldcupview>
      )}
    </Container>
  );
};

export default Worldcuppage;

const Overlay_container2 = styled.div`
  width:75%;
  height:85%;
  background-color:white;
  font-family: Pretendard-Regular;
  font-weight: 400;
  font-size: 16px;
  position:relative;
`

const Overlay_img = styled.img`
width:30%;
aspect-ratio: 1;
top:7%;
left:60%;
position:absolute;
border-radius:8px;
`

const Overlay_title = styled.div`
width:45%;
height:15%;
top:10%;
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

const Closebtn = styled.div`
width:80%;
height:10%;
left:10%;
background-color:${theme.Sub1};
position:absolute;
top:87%;
border-radius:8px;
display: flex;
align-items: center;
justify-content:center;
color:white;
`



const Smallcontainer_img = styled.img`
width:80%;
position: absolute;
margin-top:10%;
`

const Smallcontainer_name = styled.div`
width:80%;
height:10%;
position: absolute;
margin-top:95%;
font-family: HakgyoansimChilpanjiugaeTTF-B;
  font-weight: 600;
  font-size: 35px;
color:${theme.Sub1};
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  position:relative;
  font-family: HakgyoansimChilpanjiugaeTTF-B;
`;

const CurTournement = styled.div`
position: absolute;
top:5%;
width:60%;
height:10%;
left:20%;
display: flex;
align-items: center;
justify-content:center;
font-size:40px;
color:white;
` 

const WorldcupContainer = styled.div`
position: absolute;
top:30%;
background-color:white;
width:30%;
height:30%;
border-radius:8px;
display: flex;
align-items: center;
flex-direction:column;
&:hover{
cursor:pointer;
}
`

const WorldcupButton = styled.div`
position: absolute;
top:70%;
background-color:white;
border-radius:8px;
width:30%;
height:10%;
display: flex;
align-items: center;
justify-content: center;
font-family: Pretendard-Regular;
font-weight: 600;
font-size: 20px;
color:${theme.Sub1};
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index:9000;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay_container = styled.div`
  width:75%;
  height:20%;
  background-color:white;
  font-family: Pretendard-Regular;
  font-weight: 400;
  font-size: 16px;
`

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
  position:relative;
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
