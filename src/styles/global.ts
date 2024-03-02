import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {    
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    max-width: 100%;
  }
  
  label {
    user-select: none;
  }
  
  body {
    width: 100%;
    position: relative;
    color: rgb(${({ theme }) => theme.font});
    background: rgb(${({ theme }) => theme.foreground});
    font-family: CentraNube, Inter, 'Open Sans', Roboto, 'Helvetica Neue', -apple-system, sans-serif;
  }

  html {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar {
    width: 8px;
    background: rgba(${({ theme }) => theme.background}, .3);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background: rgb(${({ theme }) => theme.font});
  }
`;
