import styled from 'styled-components';

export const _feed = styled.div`
  position: relative;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});
  padding-top: 90px;

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.2);
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  .searchbar-wrapper {
    position: fixed;
    top: 70px;
    left: 0;
    z-index: 20000;
    width: 100%;
    padding-bottom: 12px;
    backdrop-filter: blur(5px);
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
  }

  .wrapper-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    gap: 5px;
    max-width: 1280px;
    align-self: center;
    margin: 0 auto;
    padding: 60px 20px;
    gap: 20px;
    position: relative;

    @media screen and (max-width: 755px) {
      flex-direction: column-reverse;
      align-items: center;
    }

    @media screen and (max-width: 445px) {
      padding: 80px 0;
      gap: 0;
    }
  }


  aside {
    top: 150px;
  }

  article {
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media screen and (max-width: 445px) {
      border: none;
      border-radius: 0;
      padding-bottom: 40px;
    }
  }
`;
