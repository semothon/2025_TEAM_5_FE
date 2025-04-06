import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { theme } from "../styles/themes";

export default function WorldcupProcess({selectbtn ,currentinfo}) {

useEffect(()=>{
    console.log(selectbtn,currentinfo)
},[])
  const [isSecond, setIsSecond] = useState(false);

  const variants = {
    initial: {
      x: 100, // 들어올 때 오른쪽에서
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: -100, // 나갈 때 왼쪽으로
      opacity: 0,
    },
  };

  const togglePage = () => {
    setIsSecond((prev) => !prev);
  };

  return (
    <Container>
        <AnimatePresence mode="wait">
        {isSecond ? (
          <motion.div
            key="second"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="w-full h-full"
            style={{width:"100%",height:"100%",backgroundColor:theme.Sub1,position:"relative"}}
          >
            
            <button onClick={()=>{return togglePage();}} className="mt-4 px-4 py-2 bg-gray-300 rounded">
              다시 첫 번째로
            </button>
            
            
            
          </motion.div>
        ) : (
          <motion.div
            key="first"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute w-full h-full top-0 left-0 p-4 bg-blue-200 rounded-xl"
            style={{width:"100%",height:"100%",backgroundColor:theme.Sub1,position:"relative"}}
          >
            <button onClick={togglePage} className="mt-4 px-4 py-2 bg-gray-300 rounded">
              두 번째로 이동
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </Container>
    
  );
}


const Container = styled.div`
width:100%;
height:100%;
`
