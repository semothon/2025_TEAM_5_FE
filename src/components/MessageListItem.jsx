import React from 'react';
import styled from 'styled-components';

const MessageListItem = ({name, profile, explain, onClick}) => {
    return <ItemDiv onClick={onClick}>
        <ProfileImage src={profile}/>
        <InnerDiv>
            <UserName>{name}</UserName>
            <ExplainBox>{explain}</ExplainBox>
        </InnerDiv>

        <TimeBox>12:34</TimeBox>
    </ItemDiv>
}

const ItemDiv = styled.div`
    width:100%;
    position: relative;

    display: flex;
    flex-direction: row;
    align-items: center;
    color: black;
    gap: 25px;
`;

const InnerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0px;
`;

const ProfileImage = styled.img`
    width: 18%;
    border-radius: 50%;
`;

const UserName = styled.div`
    font-size: 1.5rem;
    font-family: 'HakgyoansimChilpanjiugaeTTF-B';
`;

const ExplainBox = styled.div`
    font-size: 1rem;
    font-family: 'Pretendard-Regular'; 
    margin-bottom: 2px;
`;

const ColorButton = styled.button`
    background-color: #FF5A6D;
    color: #FFFFFF;
    font-size: 0.8rem;
    font-family: 'Pretendard-Regular';
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    margin-right: 4px;
`;

const WhiteButton = styled.button`
    background-color: #FFFFFF;
    color: #FF5A6D;
    font-size: 0.8rem;
    font-family: 'Pretendard-Regular';
    padding-left: 1.25rem;
    padding-right: 1.25rem;
`;

const TimeBox = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;

    color: #CCCCCC;
    font-size: 0.75rem;
`;

export default MessageListItem;