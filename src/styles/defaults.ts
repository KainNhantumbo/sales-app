import { css } from 'styled-components';

export const BaseButtonOutline = css`
  border: none;
  background: none;
  border-radius: 10px;
  position: relative;
  padding: 10px;
  color: rgb(${({ theme }) => theme.font});
  width: fit-content;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;
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
  color: rgb(${({ theme }) => theme.text});
  border: 1px solid transparent;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;
  :hover {
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.accent}, 0.09);
  }
  :disabled {
    box-shadow: none;
    background: rgba(${({ theme }) => theme.primary}, 0.4);
    span,
    svg {
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
  background: rgb(${({ theme }) => theme.primary});
  color: rgb(${({ theme }) => theme.text});
  padding: 10px;
  width: fit-content;
  cursor: pointer;
  outline: none;

  :hover {
    background: rgb(${({ theme }) => theme.secondary});
  }
  svg {
    pointer-events: none;
    width: 20px;
    height: 20px;
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
  }
`;

export const Button_Mono_B = css`
  border: none;
  border-radius: 8px;
  background: none;
  color: rgb(${({ theme }) => theme.font});
  border: 1px solid rgba(${({ theme }) => theme.accent}, 0.07);
  position: relative;
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;
  outline: none;

  :hover {
    color: rgb(${({ theme }) => theme.primary_variant});
  }

  svg {
    pointer-events: none;
    width: 20px;
    height: 20px;
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
  }
`;

export const StyledCornerButton = css`
  border-radius: 8px;
  background: rgba(${({ theme }) => theme.primary}, 0.4);
  color: rgb(${({ theme }) => theme.accent});
  border: none;
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;
  padding: 5px;
  outline: none;

  :hover {
    background: rgb(${({ theme }) => theme.alert});
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
    background: rgba(${({ theme }) => theme.background}, 0.7);
    border: 1px solid rgba(${({ theme }) => theme.accent}, 0.05);
    color: rgb(${({ theme }) => theme.font});
    :focus {
      border: 1px solid rgba(${({ theme }) => theme.accent}, 0.15);
      box-shadow: 0 0 20px rgba(${({ theme }) => theme.accent}, 0.06);
    }
    ::placeholder {
      color: rgba(${({ theme }) => theme.font}, 0.8);
      font-size: 0.9rem;
    }
    :disabled {
      background: rgb(${({ theme }) => theme.foreground});
      border: none;
      ::placeholder {
        color: transparent;
      }
    }
  }

  textarea {
    resize: vertical;
  }
`;

export const statsContainerStyles = css`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  place-items: center;
  margin: 0 auto;
  margin-top: 12px;

  .fetch-error-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin: 20px 0;
    color: rgb(${({ theme }) => theme.alert});
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.4rem;
    align-self: flex-end;
    padding-top: 3500px;

    button {
      ${BaseButton}
    }
  }
  p {
    margin-top: 10px;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
    color: rgb(${({ theme }) => theme.primary_variant});
  }

  .loading {
    width: 100%;
    height: 100%;
    align-self: flex-end;
    display: flex;

    flex-direction: row;
    align-items: center;
    font-weight: 500;
    font-size: 1.1rem;
    gap: 10px;
    padding: 20px;
    margin: 0 auto;

    color: rgb(${({ theme }) => theme.primary_variant});
  }
`;
