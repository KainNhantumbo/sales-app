import {
  BaseButton,
  BaseButtonOutline,
  StyledCornerButton,
  StyledInputs,
} from '../defaults';
import styled from 'styled-components';

export const PurchaseContainer = styled.div`
  position: relative;
  background: rgb(${({ theme }) => theme.background});
  width: 100%;
  height: 100%;
  min-height: 70vh;

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  .wrapper-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    justify-items: center;
    max-width: 980px;
    align-self: center;
    margin: 0 auto;
    padding-top: 110px;

    @media screen and (max-width: 445px) {
      padding-top: 90px;
    }
  }

  aside {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 30px;


  }

  article {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 20px;



  }
`;
