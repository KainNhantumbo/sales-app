import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px 30px;
  font-weight: 500;
  font-size: 1rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(${({ theme }) => theme.font}, 0.1);
  border-radius: 18px 18px 0 0;

  .navigation {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;

    h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      text-transform: uppercase;

      svg {
        width: 20px;
        height: 20px;
      }
      span {
        padding-left: 5px;
      }
    }

    nav {
      width: 100%;
      max-width: 700px;
      display: flex;
      flex-flow: column wrap;
      gap: 15px;
      justify-content: center;
      margin: 0 auto;
      section {
        display: flex;
        justify-content: center;
        gap: 15px;
        flex-flow: row wrap;
        font-size: 0.98rem;
        span {
          line-height: 1.2rem;
          :hover {
            cursor: pointer;
            color: rgb(${({ theme }) => theme.secondary});
          }
        }
      }

      .fund-url {
        ${BaseButton}
        :hover {
          color: rgb(${({ theme }) => theme.secondary});
        }
      }
    }
  }

  .social-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    align-self: center;

    .logo {
      text-align: center;
      span {
        font-size: 1.4rem;
        font-weight: 500;
        color: rgb(${({ theme }) => theme.font});
        font-family: 'Roboto Slab', 'Roboto';
        i {
          color: rgb(${({ theme }) => theme.secondary});
        }
      }
    }

    .social-media {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;

      a {
        padding: 10px;
        background: rgba(${({ theme }) => theme.secondary}, 0.1);
        border-radius: 3px;

        :hover {
          color: rgb(${({ theme }) => theme.secondary});
        }
      }
    }
  }

  .copyright {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    flex-direction: column;
    font-size: 0.9rem;
    align-items: center;
    line-height: 1.2rem;
  }
`;
