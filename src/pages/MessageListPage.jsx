import React, { useEffect, useState } from 'react';
import MessageListItem from '../components/MessageListItem';
import styled from 'styled-components';
import TestImage from '../assets/initialimage.jpg';
//import TestImage from '../assets/testimage.png';
import socket from '../components/socket';
import { useNavigate } from 'react-router-dom';

const MessageListPage = () => {
    const navigate = useNavigate();
    const [chatRooms, setChatRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem("token");

        if (token) {
            try {
                // JWT 토큰에서 이메일 추출
                const payload = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                const userEmail = decodedPayload.email;

                // 채팅방 목록 요청
                socket.emit('get_chat_rooms', { userEmail });

                // 채팅방 목록 수신
                socket.on('chat_rooms_list', (rooms) => {
                    setChatRooms(rooms);
                    setLoading(false);
                });

                // 오류 처리
                socket.on('error', (err) => {
                    console.error('채팅방 목록 오류:', err);
                    setLoading(false);
                });
            } catch (error) {
                console.error('토큰 파싱 오류:', error);
                setLoading(false);
            }
        } else {
            // 토큰이 없을 경우 로그인 페이지로 리다이렉트
            navigate('/login');
        }

        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            socket.off('chat_rooms_list');
            socket.off('error');
        };
    }, [navigate]);

    if (loading) {
        return <LoadingMessage>채팅방 목록을 불러오는 중...</LoadingMessage>;
    }

    const onRoomClicked = (roomId, friendEmail) => {
        const token = localStorage.getItem("token");
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        const userEmail = decodedPayload.email;
        socket.emit('create_or_join_chat', {
            userEmail,
            friendEmail
        });

        navigate(`/message/${roomId}/${friendEmail}`);
    }

    console.log(chatRooms);

    return (
        <MessageListBox>
            {chatRooms.length > 0 ? (
                chatRooms.map((room, index) => (
                    <MessageListItem
                        key={room.roomId || index}
                        name={room.otherParticipant || "사용자"}
                        profile={TestImage}
                        explain={room.lastMessage ? room.lastMessage.content : "새 대화를 시작하세요"}
                        onClick={() => onRoomClicked(room.roomId, room.otherParticipant)}
                    />
                ))
            ) : (
                <EmptyMessage>대화 목록이 없습니다. 새로운 대화를 시작해보세요!</EmptyMessage>
            )}
        </MessageListBox>
    );
};


const MessageListBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 10px 30px;
    flex-grow: 1;

    overflow-y: scroll;
`;

const LoadingMessage = styled.div`
    padding: 20px;
    text-align: center;
    color: #666;
`;

const EmptyMessage = styled.div`
    padding: 20px;
    text-align: center;
    color: #999;
`;

export default MessageListPage;