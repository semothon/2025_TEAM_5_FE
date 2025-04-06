
import React, {useState, useEffect} from 'react';
import { useNavigate, useSearchParams } from "react-router-dom"

import ToggleBar from '../components/ToggleBar';
import TestImage from '../assets/testimage.png';
import UserListItem from '../components/UserListItem';
import UserRequestItem from '../components/UserRequestItem';
import '../ChatListPage.css'
import styled from "styled-components"
import { theme } from "../styles/themes"
import '../styles/fonts.css'
import EmailSearchBar from '../components/EmailSearchBar';
import MessageListItem from '../components/MessageListItem';
import FriendPage from './FriendPage';
import MessageListPage from './MessageListPage';
import FriendRequestPage from './FriendRequestPage';
import socket from '../components/socket';

const ChatListPage = () => {
    //const [toggleIdx, setToggleIdx] = useState(0);
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('toggle') === null) {
            searchParams.append('toggle', 0);
            setSearchParams(searchParams);
        }
    }, [])

    const toggleIdx = parseInt(searchParams.get('toggle'));

    const onclick = (idx) => {
        console.log(`${idx} clicked`);
        //setToggleIdx(idx);
        searchParams.set('toggle', idx);
        setSearchParams(searchParams);
    }

    const onAccept = (receiver, sender) => {
        console.log('친구 요청 수락!');
        console.log(sender);
        console.log(receiver);
        socket.emit('acceptFriend', {
            receiveremail: receiver.email,
            senderemail: sender.email,
            sender: sender.name,
            receiver: receiver.name,
        });
    }
    const onDecline = (receiver, sender) => {
        console.log('친구 요청 거절!');
        socket.emit('rejectFriend', {
            receiveremail: receiver.email,
            senderemail: sender.email,
            sender: sender.name,
            receiver: receiver.name,
        });
    }

    return <>

        <Bannerbar>Chatting</Bannerbar>


        <div style={{ marginBottom: '16px' }}>
            <ToggleBar
                list={['친구', '메세지', '요청']}
                selectedIdx={toggleIdx}
                onclick={onclick}
            />
        </div>

        {toggleIdx === 0 && (
            <FriendPage />
        )}

        {toggleIdx === 1 && (
            <MessageListPage />
        )}

        {toggleIdx === 2 && (
            <FriendRequestPage onAccept={onAccept} onDecline={onDecline} />
        )}


    </>
}

const Bannerbar = styled.div`
font-family: 'Dela Gothic One', sans-serif;
font-size: 15px;
width:100%;
height:52px;
background-color:${theme.Sub1};
display:flex;
align-items:center;
justify-content:center;
color:white;
margin-bottom: 16px; 
margin-top: 33px;
flex-shrink: 0;
`

export default ChatListPage;
