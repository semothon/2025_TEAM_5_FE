import styled from "styled-components"
import { theme } from "../styles/themes"
import logoimg from "../assets/loginpageimg/logoimg.png"
import '../styles/fonts.css'
import { useNavigate } from "react-router-dom"
import banner from '../assets/pickimg/banner.svg'; 
import cup from '../assets/pickimg/cup.svg'; 
import pick from '../assets/pickimg/pick.svg'; 
import random from '../assets/pickimg/random.svg'; 


const Pickpage = ()=>{
    const img = logoimg
    const navigator = useNavigate();

    return <>
        <Topbar>
            <img src={img} style={{width:"15%",height:"auto"}}></img>
        </Topbar>
        <img src={banner} style={{ width: "100%", height: "20%",marginBottom: "16px" }} alt="logo" />

        <Container>
        <img
          src={cup}
          style={{ width: "80%", cursor: "pointer", marginBottom: "20px" }}
          onClick={()=>{navigator("/worldcup",{replace : false})}}
          alt="이상형 월드컵"
        />
        <img
          src={random}
          style={{ width: "80%", cursor: "pointer", marginBottom: "20px" }}
          onClick={()=>{navigator("/randomfriend",{replace : false})}}
          alt="랜덤 친구 찾기"
        />
        <img
          src={pick}
          style={{ width: "80%", cursor: "pointer" }}
          onClick={() => {}}
          alt="Pick & Pick"
        />
      </Container>

    </>
}

export default Pickpage

const Container = styled.div`
width:100%;
height:80%;
background-color:${theme.Main};
display:flex;
flex-direction:column;
align-items:center;
 overflow-y: auto;
scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`

const Block = styled.div`
width:80%;
height:150px;
background-color:${theme.Sub1};
margin-top:5%;
border-radius:20px 20px 20px 20px;
position:relative;
`

const Text = styled.div`
top:20%;
left:10%;
position:absolute;
font-family: HakgyoansimChilpanjiugaeTTF-B;
font-weight:600;
font-size:28px;
color:white;
`

const Topbar = styled.div`
width:100%;
height:15%;
background-color:${theme.Main};
display:flex;
align-items:center;
justify-content:center;
`
