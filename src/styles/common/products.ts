import styled from 'styled-components';
import {
  BaseButton,
  BaseButtonOutline,
  Button_Mono_A,
  Button_Mono_B,
  StyledInputs,
  StyledLabels,
} from '../defaults';

export const ProductListContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.2);
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  .fetching-state {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5000;
    background: rgba(${({ theme }) => theme.foreground}, 0.5);
    backdrop-filter: blur(10px);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    p {
      color: rgb(${({ theme }) => theme.alert});
      padding: 0 20px;
      line-height: 1.6rem;
      text-align: center;
    }
    button {
      ${BaseButtonOutline}
    }
  }

  .search-container {
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
    }
  }

  article {
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    margin-top: 90px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .filters-container {
      width: 100%;
      display: flex;
      flex-flow: row wrap;

      .add-product {
        ${BaseButton}
      }
    }
  }
`;
