import React from 'react';
import styled from 'styled-components';
import tailMe from '../assets/tail.svg';
import tailOther from '../assets/tail-other.svg';

/* 
isLast 가 true일 경우 현재 상태에서 자신/상대의 마지막 메시지이다
이때 자신/상대 메시지 모두 말풍선에 꼬리를 붙이고, 상대 메시지는 프로필 이미지도 붙여준다.
*/
const ChatBubble = ({isMe, message, profileImage, isLast}) => {
    return <OuterDiv>
        {isMe && <>
            <Placeholder />
            <MeDiv>
                {message}
            </MeDiv>
            {isLast && <TailMe src={tailMe} />}
        </>}
        {isMe || <>
            {isLast && <ProfileImage src={profileImage} />}
            {isLast || <div style={{width: '40px'}}/>}
            
            <OtherDiv>
                {message}
            </OtherDiv>
            <Placeholder />
            {isLast && <TailOther src={tailOther} />}
        </>}
    </OuterDiv>
}

const OuterDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding-left: 20px;
    padding-right: 20px;
    gap: 15px;

    position: relative;
`

const MeDiv = styled.div`
    color: #FFFFFF;
    font-size: 1.05rem;
    padding: 8px 13px 8px 13px;

    background-color: #FF5A6D;
    border-radius: 20px;
    text-align: right;

    position: relative;
    z-index: 5;
`;

const OtherDiv = styled.div`
    color: #000000;
    font-size: 1.05rem;
    padding: 8px 13px 8px 13px;

    background-color: #FFFFFF;
    border-radius: 20px;
    text-align: left;

    position: relative;
    z-index: 5;
`

const Placeholder = styled.div`
    width: 30px;
    flex-grow: 1;
`

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const TailMe = styled.img`
    position: absolute;
    right: 10px;
    bottom: -2px;
    width: 30px;
    height: 30px;
    z-index: 0;
`
const TailOther = styled.img`
    position: absolute;
    left: calc(40px + 15px + 8px); /* 프로필 width + flex gap */
    bottom: -2px;
    width: 30px;
    height: 30px;
    z-index: 0;
`

export default ChatBubble;