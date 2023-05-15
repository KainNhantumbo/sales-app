import styled from 'styled-components';
import { BaseButton, StyledInputs } from '../defaults';

export const HomeContainer = styled.div`
  margin-top: 90px;
  position: relative;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.background});

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_variant});
      color: rgb(${({ theme }) => theme.secondary});
    }
  }

  article {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
`;
