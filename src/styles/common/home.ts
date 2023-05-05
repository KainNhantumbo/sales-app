import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.secondary}, 0.2);
      color: rgb(${({ theme }) => theme.primary});
    }
  }
`;
