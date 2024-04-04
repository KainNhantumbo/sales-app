import styled from 'styled-components';

export const _pageLoader = styled.section`
  width: 100%;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 12000;

  .dialog-prompt {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    padding: 20px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    position: fixed;
    bottom: calc(40px);
    right: calc(20px);
    user-select: none;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.1);
    z-index: 10;

    ::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 1px;
      left: calc(50% - 10px);
      bottom: 30px;
      border-radius: 50%;
      z-index: -999;
      transform: rotate(180);
      backdrop-filter: blur(10px);
      box-shadow: 0 0 50px 20px rgba(${({ theme }) => theme.primary}, 0.8);
    }

    @media screen and (max-width: 430px) {
      gap: 5px;
    }

    .prompt-info {
      font-weight: 500;
      line-height: 1.6rem;
      font-size: 0.8rem;
      text-transform: uppercase;
    }
  }
`;
