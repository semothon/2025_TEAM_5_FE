import styled from "styled-components"


const Livemessage = ({data,setisoverlay})=>{
    return <Overlay>
    <Toast>
      <h3>💌 친구 요청이 도착했어요!</h3>
      <p>{data.sender}님이 {data.receiver}님과 친구가 되고 싶어해요.</p>
      <ConfirmButton onClick={() => setisoverlay(false)}>확인</ConfirmButton>
    </Toast>
  </Overlay>
}

export default Livemessage

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Toast = styled.div`
  background-color: #fff;
  padding: 24px 32px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  max-width: 300px;

  h3 {
    margin-bottom: 12px;
  }

  p {
    margin-bottom: 16px;
  }
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;