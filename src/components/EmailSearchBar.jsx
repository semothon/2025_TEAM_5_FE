import React, {useState} from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import axios from 'axios';

const EmailSearchBar = ({ onSearch }) => {
  const [email, setEmail] = useState('');

  const handleSearch = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        'http://localhost:3000/addfriend',
        { friendemail: trimmedEmail }, // ✅ 백엔드와 맞춘 key
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert('친구가 성공적으로 추가되었습니다!');
      
        const friendListRes = await axios.get('http://localhost:3000/friendlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      
        onSearch?.(friendListRes.data.data);  
      
      
      } else {
        console.log('친구 추가 응답:', res.data);
        switch (res.data.message) {
          case '자기자신':
            alert('자기 자신은 친구로 추가할 수 없습니다.');
            break;
          case '존재하지않는사용자':
            alert('해당 이메일의 사용자가 존재하지 않습니다.');
            break;
          case '이미친구':
            alert('이미 친구로 등록된 사용자입니다.');
            break;
          default:
            alert(`친구 추가 실패: ${res.data.message}`);
        }
      }
    } catch (error) {
      console.error('친구 추가 중 오류:', error);
      alert('친구 추가 요청 중 오류가 발생했습니다.');
    }

    setEmail('');
  };

  return (
    <SearchBarWrapper>
      <StyledInput
        placeholder="이메일로 친구 추가하기"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />
      <SearchButton onClick={handleSearch}>
        <Search color="white" size={24} />
      </SearchButton>
    </SearchBarWrapper>
  );
};

export default EmailSearchBar;

// 스타일 컴포넌트
const SearchBarWrapper = styled.div`
  margin-left: 20px;
  margin-right: 20px;

  display: flex;
  align-items: center;
  gap: 3px;
  padding: 0px 10px 0px 20px;

  background-color: #ffffff;
  height: 52px;
  border-radius: calc(52px / 2);
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;

  font-family: 'Pretendard-Regular'; 
  font-size: 16px;
  font-weight: bold;
  color: #f4a9a9;

  &::placeholder {
    font-family: 'Pretendard-Regular'; 
    font-size: 16px;
    color: #f4a9a9;
    opacity: 1;
  }
`;

const SearchButton = styled.button`
  background-color: #ff5a6d;
  border: none;
  border-radius: 50%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
