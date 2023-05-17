import { css } from 'styled-components';

export const BaseButtonOutline  = css`
  border: none;
  background: none;
  border-radius: 10px;
  position: relative;
  padding: 10px;
  color: rgb(${({ theme }) => theme.font});
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
  width: fit-content;
  cursor: pointer;
  :hover {
    color: rgb(${({ theme }) => theme.primary_variant});
  }
  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    top: calc(50% - 10px);
    left: 7px;
    pointer-events: none;
  }
  span {
    padding-left: 20px;
    font-weight: 500;
    pointer-events: none;
  }
`;

export const BaseButton = css`
  border: none;
  border-radius: 10px;
  position: relative;
  padding: 10px;
  width: fit-content;
  cursor: pointer;
  background: rgb(${({ theme }) => theme.primary});
  color: rgb(${({ theme }) => theme.font});
  border: 1px solid transparent;
  :hover {
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.09);
  }
  :disabled{
    box-shadow: none;
    background: rgba(${({ theme }) => theme.primary}, .4);
    span {
      color: rgb(${({ theme }) => theme.foreground});
    }
  }

  svg {
    color: inherit;
    width: 20px;
    height: 20px;
    position: absolute;
    top: calc(50% - 10px);
    left: 7px;
    pointer-events: none;
  }

  span {
    padding-left: 20px;
    font-weight: 500;
    pointer-events: none;
  }
`;

export const Button_Mono_A = css`
  border: none;
  border-radius: 8px;
  background: rgba(${({ theme }) => theme.primary});
  color: rgb(255, 255, 255);
  position: relative;
  padding: 7px 10px;
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;

  :hover {
    background: rgb(${({ theme }) => theme.secondary});
  }
  svg {
    pointer-events: none;
    min-width: 20px;
    min-height: 20px;
  }
`;

export const Button_Mono_B = css`
  border: none;
  border-radius: 8px;
  background: none;
  color: rgb(${({ theme }) => theme.font});
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);
  position: relative;
  padding: 7px 10px;
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;

  :hover {
    color: rgb(${({ theme }) => theme.primary_variant});
  }

  svg {
    pointer-events: none;
    min-width: 20px;
    min-height: 20px;
  }
`;

export const StyledCornerButton = css`
  border-radius: 50%;
  background: rgba(${({ theme }) => theme.primary}, 0.4);
  color: rgb(${({ theme }) => theme.primary});
  border: none;
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;
  padding: 5px;

  :hover {
    background: rgb(${({ theme }) => theme.secondary});
    transition: all 200ms ease;
    svg {
      color: #fff;
    }
  }
  svg {
    pointer-events: none;
  }
`;

export const StyledLabels = css`
  font-weight: 500;
  position: relative;
  line-height: 1.4rem;

  svg {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 2px;
    left: 0;
    color: rgb(${({ theme }) => theme.font});
  }
  span {
    padding-left: 25px;
    font-weight: 500;
  }
`;

export const StyledInputs = css`
  input,
  textarea,
  select {
    width: 100%;
    height: fit-content;
    border: none;
    padding: 10px 18px;
    line-height: 1.2rem;
    font-weight: 400;
    outline: none;
    border-radius: 10px;
    background: rgb(${({ theme }) => theme.background});
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.2);

    :focus {
      border: 1px solid rgba(${({ theme }) => theme.accent}, 0.5);
    }
    ::placeholder {
      color: rgba(${({ theme }) => theme.font}, 0.8);
      font-size: 0.9rem;
    }
    :disabled {
      background: none;
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
      ::placeholder {
        color: transparent;
      }
    }
  }

  textarea {
    resize: none;
  }
`;
