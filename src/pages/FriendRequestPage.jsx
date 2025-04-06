import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import TestImage from '../assets/testimage.png';
import TestImage from '../assets/initialimage.jpg';
import EmailSearchBar from '../components/EmailSearchBar';
import UserRequestItem from '../components/UserRequestItem';
import axiosInstance from '../../api/axiosInstance';

const FriendRequestPage = ({ onAccept, onDecline }) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 데이터 가져오기
        axiosInstance.get('/getmailbox')
            .then(response => {
                console.log('친구 요청 데이터:', response.data);
                setFriendRequests(response.data.mails || []);

                setLoading(false);
            })
            .catch(error => {
                console.error('친구 요청 조회 오류:', error);
                setError('친구 요청을 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            });
    }, []);

    // 요청 수락 핸들러
    const handleAccept = (receiver, sender) => {
        if (onAccept) {
            onAccept(receiver, sender);
            // 옵션: 목록에서 해당 요청 제거 또는 상태 업데이트
            setFriendRequests(prev => prev.filter(request => request.sender.email !== sender.email));
        }
    };

    // 요청 거절 핸들러
    const handleDecline = (receiver, sender) => {
        if (onDecline) {
            onDecline(receiver, sender);
            // 목록에서 해당 요청 제거
            setFriendRequests(prev => prev.filter(request => request.sender.email !== sender.email));
        }
    };

    console.log(friendRequests);

    return (
        <>
            <div style={{ marginBottom: '16px' }}>
                <EmailSearchBar />
            </div>
            <Container>
                {loading ? (
                    <LoadingMessage>친구 요청을 불러오는 중...</LoadingMessage>
                ) : error ? (
                    <ErrorMessage>{error}</ErrorMessage>
                ) : friendRequests.length === 0 ? (
                    <EmptyMessage>받은 친구 요청이 없습니다.</EmptyMessage>
                ) : (
                    friendRequests.map((request, index) => (
                        <UserRequestItem
                            key={`${request.sender.email}-${index}`}
                            name={request.sender.name}
                            profile={TestImage} // 실제 프로필 이미지가 있다면 여기에 추가
                            explain={`${request.sender.email} 님이 요청했습니다.`}
                            onAccept={() => handleAccept(request.receiver, request.sender)}
                            onDecline={() => handleDecline(request.receiver, request.sender)}
                            email={request.sender.email} // email 정보 전달 (옵션)
                        />
                    ))
                )}
            </Container>
        </>
    );
};

const Container = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px 30px;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: #666;
`;

const ErrorMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: #e74c3c;
`;

const EmptyMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: #666;
`;

const ScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  padding: 10px 30px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default FriendRequestPage;