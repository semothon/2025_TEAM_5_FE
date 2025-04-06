import styled from "styled-components"
import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { theme } from "../styles/themes"
import '../styles/fonts.css'
import img1 from '../assets/loginpageimg/logoimg.png'
import img2 from '../assets/loginpageimg/mainimg.png'
import img3 from '../assets/loginpageimg/mainimg2.png'


const Loginpage = () => {
    const navigator = useNavigate();

    const logoimg = img1
    const mainimg = img2
    const mainimg2 = img3


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token')
        if (token != null) {
            localStorage.setItem("token",token);
            navigator(`/mainpage`, { replace: true })
        }
    }, [])

    const login = async () => {
        window.location.href = "http://localhost:3000/googlelogin"
    }

    return <Container>
        <Logosmall>마음에 드는 친구 찾기</Logosmall>
        <Logo>
        <img
  src={logoimg}
  alt="logo"
  style={{
    width: "300px",
    height: "auto"
  }}
/>
        </Logo>
        <img src={img3}  style={{position:"absolute",top:"55%",left:"41.5%",zIndex:"5"}}></img>
        <Imgcontainer>
            <img src={mainimg} style={{width:"100%",height:"100%"}}></img>
        </Imgcontainer>
        <Loginbtn onClick={() => {
            login();
        }}>구글아이디로 로그인 하기</Loginbtn>
    </Container>
}

export default Loginpage

const Container = styled.div`
height:100%;
display:flex;
justify-content:center;
position:relative;
`
const Logosmall = styled.div`
width:42%;
height:10%;
top:14%;
color:${theme.Sub1};

position:absolute;
font-family: HakgyoansimChilpanjiugaeTTF-B;
font-weight:600;
font-size:22px;
`
const Logo = styled.div`
  position: absolute;
  top: 19%;
  width: 100%;    // 전체 너비
  height: 170px;  // 원하는 만큼 키워줌
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

const Imgcontainer = styled.div`
position:absolute;
width:100%;
height:40%;
top:42%;
z-index:1;
`

const Loginbtn = styled.button`
position:absolute;
width:80%;
height:6%;
top:90%;
background-color:${theme.Sub1};
font-family:Pretendard-Regular;
font-weight:700;
font-size:16px;
outline: none;
box-shadow: none;
color:white;
&:focus {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }

  &:focus-visible {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }
&:hover{
transition :1s ease;
opacity:0.7;
}
`





