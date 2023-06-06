import styled from 'styled-components';
import { Button_Mono_B, StyledInputs } from '../defaults';

export const SeachEngineContainer = styled.div`
  position: sticky;
  top: 90px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgb(${({ theme }) => theme.foreground});
  padding: 10px 20px;
  border-radius: 12px;

  * {
    ::selection {
      background: rgb(${({ theme }) => theme.background_variant});
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  .form-container {
    width: 100%;
    display: flex;
    flex-direction: row;

    form {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      .form-element {
        position: relative;
        width: 100%;
        ${StyledInputs}

        input {
          border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
          :focus {
            border: 1px solid rgba(${({ theme }) => theme.font}, 0.4);
          }
        }

        svg {
          position: absolute;
          top: calc(50% - 10px);
          left: 10px;
          width: 20px;
          height: 20px;
          color: rgba(${({ theme }) => theme.font}, 0.5);
        }
      }

      button {
        ${Button_Mono_B}
        width: 41px;
        height: 41px;
        border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
      }
    }
  }
`;
