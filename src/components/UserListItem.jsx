import React from 'react';
import styled from 'styled-components';

const UserListItem = ({name, profile}) => {
    return <ItemDiv>
        <ProfileImage src={profile}/>
        <UserName>{name}</UserName>
    </ItemDiv>
}

const ItemDiv = styled.div`
    width: 100%; 
    display: flex;
    flex-direction: row;
    align-items: center;
    color: black;
    gap: 25px;
`;

const ProfileImage = styled.img`
    width: 18%;
    border-radius: 50%;
`;

const UserName = styled.div`
    font-size: 1.5rem;
    font-family: 'HakgyoansimChilpanjiugaeTTF-B'; 
`;

export default UserListItem;