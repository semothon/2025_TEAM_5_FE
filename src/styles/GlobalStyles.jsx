import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
a {
  text-decoration: none;
  color: inherit;
}
*{
  box-sizing: border-box;
}
body{
  background-color: #d0d0d0;
}
body, html, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Pretendard variable";
  }
  #root {
    overflow:hidden;
    width:100%;
    max-width: 500px;
    margin: 0 auto;
    background-color:#FFFBF8;
  }
`;
export default GlobalStyles;