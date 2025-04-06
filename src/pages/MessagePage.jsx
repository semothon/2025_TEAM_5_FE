import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
//import TestImage from '../assets/testimage.png';
import TestImage from '../assets/initialimage.jpg';
import MessageTitleBox from '../components/MessageTitleBox';
import ChatBubble from '../components/ChatBubble';
import ChatBar from '../components/ChatBar';
import { IoEllipseSharp } from 'react-icons/io5';
import { theme } from "../styles/themes";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../components/socket';

const MessagePage = () => {
    const navigate = useNavigate();
    const params = useParams();
    console.log(params.roomId);

    const SAMPLE_MESSAGE = [
        { isMe: true, message: "달빛에 두 눈을 적셔, 내 손을 잡고 어디론가 뛰어줘." },
        { isMe: true, message: "거짓말같았던 그 밤을 지나 끝없이 헤맨다 해도" },
        { isMe: true, message: "Running Through The Night." },
        { isMe: false, message: "Wait for the night" },
        { isMe: false, message: "달이 선명해지면" },
        { isMe: false, message: "그 땐 널 담곤 해" },
        { isMe: false, message: "널 안곤 해" },
        { isMe: false, message: "뒤돌아보지 마" },
        { isMe: false, message: "끝없이 달리면" },
        { isMe: false, message: "모두가 잠들 때" },
        { isMe: false, message: "우리만 남을 때" },
    ];

    let [sampleMessage, setSampleMessage] = useState([]);
    const lastRef = useRef(null);

    const onChat = (message) => {
        // JWT 토큰에서 이메일 추출
        const token = localStorage.getItem("token");
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        const userEmail = decodedPayload.email;

        socket.emit("send_message", {
            "roomId": params.roomId,
            "sender": userEmail,
            "content": message,
        })

        console.log(sampleMessage);
        setSampleMessage([...sampleMessage, {
            isMe: true,
            message
        }]);
    };

    useEffect(() => {
        socket.on('new_message', ({roomId, message}) => {
            //alert(message);
            console.log(message.content);
            setSampleMessage(sampleMessage => [...sampleMessage, {
                isMe: false,
                message: message.content
            }]);
        });

        return () => {
            socket.off('new_message');
        }
    }, []);

    // 메시지가 업데이트될 때 아래로 스크롤
    useEffect(() => {
        lastRef.current.scrollIntoView();
    }, [sampleMessage]);

    let message = [...sampleMessage];
    for (let i = 0; i < message.length; i++) {
        if (i == message.length - 1 || message[i].isMe != message[i + 1].isMe)
            message[i].isLast = true;
        else
        message[i].isLast = false;
    }
    const clickback = () => {
        navigate(-1);
    }

    return <Container>


        <Topbar>
            <MdOutlineArrowBackIosNew onClick={() => { clickback() }} style={{ position: "absolute", left: "4%", color: `white` }} />
            Chatting
        </Topbar>

        <MessageTitleBox profile={TestImage} title={params.other} subtitle="활동 중" />

        <MessageBox>
            <div style={{ height: '25px' }} />

            {message.map(({ isMe, message, isLast }, idx) => <ChatBubble key={idx} isMe={isMe} profileImage={TestImage} message={message} isLast={isLast} />)}

            <div ref={lastRef} />

            {/* <ChatBubble isMe={true} message="달빛에 두 눈을 적셔, 내 손을 잡고 어디론가 뛰어줘." />
            <ChatBubble isMe={true} message="거짓말같았던 그 밤을 지나 끝없이 헤맨다 해도" />
            <ChatBubble isMe={true} message="Running Through The Night." isLast />

            <ChatBubble isMe={false} profileImage={TestImage} message="달이 선명해지면" />
            <ChatBubble isMe={false} profileImage={TestImage} message="그 땐 널 담곤 해" />
            <ChatBubble isMe={false} profileImage={TestImage} message="널 안곤 해" />
            <ChatBubble isMe={false} profileImage={TestImage} message="뒤돌아보지 마," />
            <ChatBubble isMe={false} profileImage={TestImage} message="끝없이 달리면" />
            <ChatBubble isMe={false} profileImage={TestImage} message="모두가 잠들 때" />
            <ChatBubble isMe={false} profileImage={TestImage} message="우리만 남을 때" isLast /> */}
        </MessageBox>

        <ChatBar onChat={onChat} />
    </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Pretendard-Regular';
    height: 100%;
`;

const MessageBox = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Pretendard-Regular';
    gap: 4px;

    flex-grow: 1;
    overflow-y: scroll;
`;

const Topbar = styled.div`

  width: 100%;
  height: 10%;
  font-family: 'Dela Gothic One', sans-serif;
  font-size: 15px;
  background-color: #FF5A6D;
  display: flex;
  align-items: center;
  position:relative;
  justify-content:center;
  margin-top: 33px;
  color:white;
`;

export default MessagePage;