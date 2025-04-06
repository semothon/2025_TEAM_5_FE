import React, { useState } from 'react';
import styled from 'styled-components';
import PlusButton from '../assets/plusbutton.svg';
import SendButton from '../assets/chat_send_bt.svg';
import ActiveSendButton from '../assets/chat_sent_bt.svg';

const ChatBar = ({onChat}) => {
    const [text, setText] = useState('');
    const onChange = (e) => {
        setText(e.target.value);
    }

    const onSendButtonClicked = () => {
        if (text !== '')
            onChat(text);

        setText('');
    }

    const onKeyPressed = (e) => {
        if(e.key === "Enter") {
            onSendButtonClicked();
        }
    }

    return <Container>
        <ImageButton src={PlusButton} />

        <InputBox type="text" onChange={onChange} value={text} onKeyDown={onKeyPressed} />

        <ImageButton src={text === '' ? SendButton : ActiveSendButton} onClick={onSendButtonClicked} />
    </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    background-color: white;
    color: black;
    border-radius: 30px;
    margin: 10px;
    padding: 7px;
    gap: 8px;
`;

const InputBox = styled.input`
    all: unset;
    text-align: left;
    flex-grow: 1;
`;

const ImageButton = styled.img`
    height: 36px;
    cursor: pointer;
`;

export default ChatBar;