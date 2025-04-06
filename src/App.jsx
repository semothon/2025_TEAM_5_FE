// App.jsx
import { useEffect, useState } from 'react';
import './App.css';
import GlobalStyles from './styles/GlobalStyles';
import { Route, Routes } from "react-router-dom";
import routes from './navigator/routing';
import socket from './components/socket'; // socket.js 파일에서 export한 socket 인스턴스
import Livemessage from './components/Livemessage';

function App() {

  const [isoverlay,setisoverlay]=useState(false);
  const [datas,setdatas] = useState()
  useEffect(() => {
    // 소켓 이벤트 수신
    socket.on('wantfriend', (data) => {
      console.log('📩 알림 수신:', data);
      setdatas(data)
      setisoverlay(true)
    });

    // 컴포넌트 언마운트 시 이벤트 해제
    return () => {
      socket.off('wantfriend');
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      {isoverlay && <Livemessage data={datas} setisoverlay={setisoverlay}/>}
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
