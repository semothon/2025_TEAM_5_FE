import { useEffect, useState } from "react"
import styled from "styled-components"
import { theme } from "../styles/themes";
import '../styles/fonts.css'
import Pickpage from "./Pickpage";
import ChatListPage from "./ChatListPage";
import ProfilePage from "./ProfilePage";
import { useSearchParams } from "react-router-dom";

const Mainpage = ()=>{

    // const [categorybtn,setcategorybtn] = useState([1,0,0]);
    const [token,settoken] = useState("");
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        if(searchParams.get('page') === null) {
            searchParams.append('page', 0);
            setSearchParams(searchParams);
        }

        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        settoken(token)
    },[])

    let page = searchParams.get('page') !== null ? parseInt(searchParams.get('page')) : 0;

    let categorybtn = [page==0 ? 1 : 0, page==1 ? 1 : 0, page==2 ? 1 : 0];

    const btnclick = (i)=>{
        // if(i == 0)setcategorybtn([1,0,0])
        // else if(i == 1)setcategorybtn([0,1,0])
        // else setcategorybtn([0,0,1])
        searchParams.set('page', i);
        setSearchParams(searchParams);
    }
    return <Container>
        <Container2>
            {categorybtn[0] === 1 && <Pickpage></Pickpage>} 
            {categorybtn[1] === 1 && <ChatListPage></ChatListPage>}
            {categorybtn[2] === 1 && <ProfilePage></ProfilePage>}
        </Container2>
        <Block></Block>
        <Navbar>
            <Btn style={{marginLeft:"10%"}} onClick={()=>{btnclick(0)}} clicked={categorybtn[0]}>Pick!</Btn>
            <Btn style={{marginLeft:"10%"}} onClick={()=>{btnclick(1)}} clicked={categorybtn[1]}>Chatting</Btn>
            <Btn style={{marginLeft:"10%"}} onClick={()=>{btnclick(2)}} clicked={categorybtn[2]}>Profile</Btn>
        </Navbar>
    </Container>
}

export default Mainpage

const Container = styled.div`
width:100%;
height:100%;
position:relative;
`
const Container2 = styled.div`
display: flex;
flex-direction: column;
width:100%;
height:90%;
position:relative;
`
const Block =styled.div`
width:100%;
height:10%;
position:relative;
`

const Navbar = styled.div`
bottom:0;
width:100%;
height:10%;
background-color:white;
position:absolute;
border-radius:20px 20px 0 0 ;
display:flex;
align-items:center;
box-shadow: 0px -2px 16px rgba(0, 0, 0, 0.1); 
`

const Btn = styled.button`
all:unset;
width:20%;
height:50%;
display:flex;
align-items:center;
justify-content:center;
color:${(props)=>(props.clicked ? theme.Sub1:theme.Sub2)};
font-family:Dela Gothic One;
outline: none;
box-shadow: none;
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
`