import { css } from 'styled-components';

export const BaseButtonOutline = css`
  all: unset;
  border-radius: 10px;
  position: relative;
  padding: 10px;
  color: rgb(${({ theme }) => theme.font});
  width: fit-content;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;

  :hover {
    color: rgb(${({ theme }) => theme.primary_shade});
  }
  svg {
    width: 20px;
    height: auto;
    pointer-events: none;
  }
  span {
    font-weight: 500;
    pointer-events: none;
    text-align: center;
  }
`;

export const BaseButton = css`
  all: unset;
  width: 100%;
  border-radius: 5px;
  position: relative;
  padding: 10px;
  width: fit-content;
  cursor: pointer;
  background: rgb(${({ theme }) => theme.primary});
  color: rgb(${({ theme }) => theme.font});
  border: 1px solid transparent;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  /* display: flex;
  align-items: center;
  gap: 8px; */

  :hover {
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.09);
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
    height: auto;
    pointer-events: none;
  }

  span {
    font-weight: 500;
    pointer-events: none;
  }
`;

export const ButtonMono = css`
  border: none;
  border-radius: 8px;
  background: rgb(${({ theme }) => theme.primary});
  color: rgb(${({ theme }) => theme.font_dimmed});
  padding: 10px;
  width: fit-content;
  cursor: pointer;

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

export const ButtonMonoOutline = css`
  border: none;
  border-radius: 8px;
  background: none;
  color: rgb(${({ theme }) => theme.font});
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
  position: relative;
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;

  :hover {
    color: rgb(${({ theme }) => theme.primary_shade});
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
  border-radius: 5px;
  background: none;
  color: rgb(${({ theme }) => theme.font});
  border: 1px solid rgba(${({ theme }) => theme.black}, 0.07);
  width: fit-content;
  cursor: pointer;
  display: grid;
  place-content: center;
  padding: 5px;

  :hover {
    color: rgb(${({ theme }) => theme.primary_shade});
  }

  svg {
    pointer-events: none;
    width: 20px;
    height: 20px;
  }
`;

export const StyledLabels = css`
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
    border-radius: 5px;
    background: rgba(${({ theme }) => theme.background}, 0.7);
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    color: rgb(${({ theme }) => theme.font});
    :focus {
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
      box-shadow: 0 0 20px rgba(${({ theme }) => theme.black}, 0.06);
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
  max-height: 800px;
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
    color: rgb(${({ theme }) => theme.primary_shade});
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.4rem;
    align-self: flex-end;

    button {
      ${BaseButton}
    }
  }
  p {
    margin-top: 10px;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
    color: rgb(${({ theme }) => theme.primary});
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
    color: rgb(${({ theme }) => theme.primary});
  }
`;

export const _endMarkStyles = css`
  width: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  background: rgb(${({ theme }) => theme.foreground});
  color: rgb(${({ theme }) => theme.primary});
  border-radius: 8px;
  margin-top: 5px;
  svg {
    width: 25px;
    height: 25px;
  }

  @media screen and (max-width: 1000px) {
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const _defaultErrorMessage = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12000;
  width: 100vw;
  height: 70vh;
  display: grid;
  place-items: center center;
  place-content: center center;
  background: rgba(${({ theme }) => theme.background}, 0.2);
  backdrop-filter: blur(5px);

  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    gap: 10px;
    .icon {
      width: 70px;
      height: 70px;
    }

    p {
      text-align: center;
      line-height: 2rem;
      font-size: 1.4rem;
      max-width: 600px;
    }

    button {
      ${BaseButton}
    }
  }
`;

export const _emptyDataContainer = css`
  width: 100%;
  height: 100%;
  background: rgb(${({ theme }) => theme.background});
  top: 95px;
  left: 0;
  display: grid;
  place-content: center;
  user-select: none;
  position: fixed;

  .content {
    position: relative;
    top: -100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    line-height: 1.6rem;
    margin: 0 10px;

    svg {
      width: 70px;
      height: 70px;
      color: rgb(${({ theme }) => theme.primary});
    }

    h3 {
      text-align: center;
      font-size: 1.2rem;
      font-weight: 500;
      margin-top: 20px;
    }
  }
`;
