import styled from 'styled-components';
import { BaseButton, StyledInputs } from '../defaults';

export const HomeContainer = styled.div`
  position: relative;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_variant});
      color: rgb(${({ theme }) => theme.secondary});
    }
  }

  article {
    width: 100%;
    margin-top: 90px;

    .introduction {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      background: rgb(${({ theme }) => theme.foreground});

      img {
        max-width: 500px;
        max-height: 500px;
      }
      
      div {
        display: flex;
        flex-direction: column;
        gap: 20px;
        h2 {
          font-size: 2.8rem;
          font-weight: 500;
          line-height: 3.2rem;
        }
        p {
          font-size: 1.4rem;
          line-height: 2rem;
        }

        a {
          ${BaseButton}
        }
        
      }
    }
  }
`;
