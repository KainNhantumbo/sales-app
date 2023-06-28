import styled from 'styled-components';

export const PushNotificationContainer = styled.section`
  position: fixed;
  z-index: 15000;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  position: fixed;
  right: 0;
  bottom: 0;
  background: rgba(${({ theme }) => theme.background}, 0.1);
  backdrop-filter: blur(2px);

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
    top: calc(50% - 20px);
    right: calc(50% - 120px);
    user-select: none;
    background: rgba(${({ theme }) => theme.foreground}, 0.8);
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.1);
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
