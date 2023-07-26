import styled from 'styled-components';
import { StyledInputs, Button_Mono_B } from '../defaults';

export const _search = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 980px;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  padding: 0 40px;

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
        border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
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
    }

    .clear-btn {
      color: rgb(${({ theme }) => theme.alert});
    }
  }
`;
