import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/themes";
import axiosInstance from "../../api/axiosInstance";
import initialimg from "../assets/initialimage.jpg"

const ProfilePage = () => {

  const imgg = initialimg
  const [Name, setName] = useState("");
  const [Mbti, setMbti] = useState("");
  const [Schoolid, setSchoolid] = useState("");
  const [Region, setRegion] = useState("");
  const [Major, setMajor] = useState("");
  const [Email, setEmail] = useState("");
  const [Discription, setDiscription] = useState("");
  const [Profileimage, setProfileimage] = useState("");
  const [Joinworldcup, setJoinworldcup] = useState(false);
  const [Shortdiscription, setShortdiscription] = useState("");
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleToggle = () => setJoinworldcup(!Joinworldcup);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("파일 선택됨:", selectedFile);
    await uploadFile();
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosInstance.post("http://localhost:3000/uploadimg", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("이미지 URL:", response.data.imageUrl);
      setProfileimage(response.data.imageUrl);
      alert("이미지 변경 선공")
    } catch (err) {
      console.error("업로드 실패", err);
    }
  };

  const getdata = async () => {
    try {
      const result = await axiosInstance.get("http://localhost:3000/getmyinfo");
      const datas = result.data;
      setName(datas.name);
      setEmail(datas.email);
      setDiscription(datas.discription);
      setShortdiscription(datas.shortdiscription);
      setJoinworldcup(datas.joinworldcup);
      setMajor(datas.major);
      setRegion(datas.region);
      setProfileimage(datas.profileImage);
      setMbti(datas.mbti);
      setSchoolid(datas.schoolid);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const savedata = async () => {
    if (Name === "" || Major === "" || Schoolid === "") {
      alert("이름,학과,학번은 필수 기재 사항입니다.");
      return;
    }
    if (Discription.length > 500) {
      alert("자기소개글은 500자 이하로만 적어주세요.");
      return;
    }
    if (Shortdiscription.length > 30) {
      alert("짧은소개글은 30자 이하로만 적어주세요.");
      return;
    }
    const result = await axiosInstance.post("http://localhost:3000/updateinfo", {
      email: Email,
      name: Name,
      major: Major,
      mbti: Mbti,
      schoolid: Schoolid,
      region: Region,
      discription: Discription,
      joinworldcup: Joinworldcup,
    });
    alert("정보 변경 완료");
  };

  return (
    <Container>
      <TopBar>
        <Title>Profile</Title>
      </TopBar>

      <ProfileBox>
        <HiddenFileInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <CustomUploadButton onClick={() => fileInputRef.current.click()}>
          <img style={{ width: "100%", height: "100%", borderRadius: "8px" }} src={Profileimage}></img>
        </CustomUploadButton>
        <ProfileContainer>
          <Namecontainer placeholder="이름 입력" value={Name} onChange={(e) => setName(e.target.value)}></Namecontainer>
          <Shortcontainer placeholder="한줄소개 입력" value={Shortdiscription} onChange={(e) => setShortdiscription(e.target.value)}></Shortcontainer>
        </ProfileContainer>
      </ProfileBox>

      <Textarea_small style={{ top: "32%" }}>
        <Textarea_small_cate>학과</Textarea_small_cate>
        <Textarea_small_text placeholder="학과 입력" value={Major} onChange={(e) => setMajor(e.target.value)} />
      </Textarea_small>

      <Textarea_small style={{ top: "39%" }}>
        <Textarea_small_cate>학번</Textarea_small_cate>
        <Textarea_small_text placeholder="학번 입력" value={Schoolid} onChange={(e) => setSchoolid(e.target.value)} />
      </Textarea_small>

      <Textarea_small style={{ top: "46%" }}>
        <Textarea_small_cate>MBTI</Textarea_small_cate>
        <Textarea_small_text placeholder="MBTI 입력" value={Mbti} onChange={(e) => setMbti(e.target.value)} />
      </Textarea_small>

      <Textarea_small style={{ top: "53%" }}>
        <Textarea_small_cate>지역</Textarea_small_cate>
        <Textarea_small_text placeholder="지역 입력" value={Region} onChange={(e) => setRegion(e.target.value)} />
      </Textarea_small>

      <Textarea_small style={{ top: "60%" }}>
        <Textarea_small_cate>매칭 참가</Textarea_small_cate>
        <SwitchContainer onClick={handleToggle} isOn={Joinworldcup}>
          <SwitchBall isOn={Joinworldcup}>
            <Label>{Joinworldcup ? "ON" : "OFF"}</Label>
          </SwitchBall>
        </SwitchContainer>
      </Textarea_small>

      <Textarea_Large style={{ top: "67%" }}>
        <Textarea_Large_title>
          <span style={{ marginLeft: "4%" }}>자기 소개</span>
        </Textarea_Large_title>
        <Textarea_Large_text
          placeholder="자기소개 입력"
          value={Discription}
          onChange={(e) => setDiscription(e.target.value)}
        />
      </Textarea_Large>

      <Savebtn onClick={savedata}>저장하기</Savebtn>
    </Container>
  );
};

const HiddenFileInput = styled.input`
  display: none;
`;

const CustomUploadButton = styled.button`
  width:35%;
  height:80%;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  background:none;
`;

const ProfileContainer = styled.div`
width:55%;
height:80%;
margin-left:5%;
`

const Namecontainer = styled.textarea`
width:100%;
height:50%;
box-sizing: border-box;
border:none;
  resize: none;
  overflow-y: auto; /* ✅ 수직 스크롤 자동 */
  text-overflow: ellipsis;
  word-wrap: break-word;
  font-size: 30px;
  font-family: 'Pretendard', sans-serif;
  letter-spacing: -1px;
  font-weight: 700;
  color: ${theme.Sub1};
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE, Edge */
  background-color: transparent;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  &:focus {
    border: none;
    outline: none;
  }
    &::placeholder {
    color: ${theme.Sub1};
    font-style: italic;
    opacity: 0.2;
  }
`

const Shortcontainer = styled.textarea`
width:100%;
height:50%;
box-sizing: border-box;
border:none;
  resize: none;
  overflow-y: auto; /* ✅ 수직 스크롤 자동 */
  text-overflow: ellipsis;
  word-wrap: break-word;
  font-size: 14px;
  font-family: 'Pretendard', sans-serif;
  letter-spacing: -.4px;
  font-weight: 700;
  color: ${theme.Sub1};
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE, Edge */
  background-color: transparent;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  &:focus {
    border: none;
    outline: none;
  }
     &::placeholder {
    color: ${theme.Sub1};
    font-style: italic;
    opacity: 0.2;
  }
`

const ProfileBox = styled.div`
  width: 80%; /* 최대 너비 설정 */
  height: 18%;
  background-color: white;
  display: flex;
  border-radius: 8px;
  top:6%;
  flex-direction:row;
  display:flex;
  align-items:center;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  letter-spacing: -.4px;
`;

// 스타일링
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Savebtn = styled.div`
position:absolute;
width:80%;
height:5%;
top:93.5%;
border-radius:30px;
display: flex;
justify-content:center;
align-items: center;
background-color:${theme.Sub1};
font-size: 14px; /* 글자 크기 조정 */
font-family: 'Pretendard', sans-serif;
font-weight:700;
color:white;
&:hover{
cursor:pointer;
transition :0.3s ease;
opacity:0.7;
}
`

const Textarea_Large = styled.div`
display:flex;
flex-direction:column;
border-radius: 8px;
position:absolute;
width:80%;
height:25%;
line-height: 1.5;
letter-spacing: -0.5px;
resize: none; /* 크기 조정 방지 */
overflow: hidden; /* 넘칠 경우 스크롤 숨기기 */
text-overflow: ellipsis; /* 넘친 텍스트 잘리게 처리 */
word-wrap: break-word; /* 단어가 넘칠 때 자동으로 줄바꿈 처리 */
background-color:white;
box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
`

const Textarea_Large_title = styled.div`
width: 100%;
height: 20%;
display:flex;
align-items:center;
font-size: 18px; /* 글자 크기 조정 */
font-family: HakgyoansimChilpanjiugaeTTF-B;
font-weight:400;
color:${theme.Sub1};
`
const Textarea_Large_text = styled.textarea`
  width: 92%;
  height: 80%;
  border: none;
  margin-left: 4%;
  box-sizing: border-box;
  line-height: 1.5;
  letter-spacing: -0.5px;
  resize: none;
  overflow-y: auto; /* ✅ 수직 스크롤 자동 */
  text-overflow: ellipsis;
  word-wrap: break-word;
  font-size: 14px;
  font-family: 'Pretendard variable';
  font-weight: 700;
  color: ${theme.Sub1};
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE, Edge */
  background-color: transparent;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  &:focus {
    border: none;
    outline: none;
  }
    &::placeholder {
    color: ${theme.Sub1};
    font-style: italic;
    opacity: 0.2;
  }
`;

const Textarea_small = styled.div`
display:flex;
align-items:center;
border-radius: 8px;
position:absolute;
width:80%;
height:5%;
background-color:white;
box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
`

const Textarea_small_cate = styled.text`
text-align:left;
margin-left:4%;
color:${theme.Sub1};
width:20%;
font-size: 18px; /* 글자 크기 조정 */
font-family: HakgyoansimChilpanjiugaeTTF-B;
font-weight:400;
background-color: transparent;
`
const SwitchContainer = styled.div`
  margin-left:59%;
  width: 13%;
  height: 76%;
  background-color: ${props => (props.isOn ? `${theme.Sub1}` : '#dcdde1')};
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  transition: background-color 0.3s ease;
`;

const SwitchBall = styled.div`
  width: 22px;
  height: 22px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  left: ${props => (props.isOn ? 'calc(100% - 26px)' : '4px')};
  transition: left 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.text`
  position:absoulte;
  width:100%;
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  color: #2f3640;
`;

const Textarea_small_text = styled.textarea`
margin-left:50%;
border: none;
  border-radius: 8px;
  box-sizing: border-box;
  line-height: 1.5;
  letter-spacing: -.4px;
  resize: none; /* 크기 조정 방지 */
  overflow: hidden; /* 넘칠 경우 스크롤 숨기기 */
  text-overflow: ellipsis; /* 넘친 텍스트 잘리게 처리 */
  word-wrap: break-word; /* 단어가 넘칠 때 자동으로 줄바꿈 처리 */
  height:80%;
  font-size: 14px; /* 글자 크기 조정 */
  font-family: 'Pretendard', sans-serif;
  font-weight:700;
  color:${theme.Sub1};
  background-color: transparent;
  &:focus {
  border: none; /* 원하는 색상으로 바꿔줘요 */
  outline: none;
}
  &::placeholder {
    color: ${theme.Sub1};
    font-style: italic;
    opacity: 0.2;
  }
`

const TopBar = styled.div`
  width: 100%;
  height: 52px;
  background-color: #FF5a6d;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  top: 34px;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  font-family:Dela Gothic One;
  font-weight: 400;
  font-size: 12.4px;
`;


const LeftRightBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
`;

const TextArea = styled.textarea`
  width: 50%;
  height: 100%;
  font-size: 14px; /* 글자 크기 조정 */
  font-family: 'Pretendard', sans-serif;
  background-color: #fff;
  color: #FF5a6d;
  padding: 8px;
  border: none;
  border-radius: 8px;
  margin-left: auto;
  box-sizing: border-box;
  line-height: 1.5;
  letter-spacing: -0.5px;
  resize: none; /* 크기 조정 방지 */
  overflow: hidden; /* 넘칠 경우 스크롤 숨기기 */
  text-overflow: ellipsis; /* 넘친 텍스트 잘리게 처리 */
  word-wrap: break-word; /* 단어가 넘칠 때 자동으로 줄바꿈 처리 */
  background-color: transparent;
`;


const ProfileDetails = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export default ProfilePage;
