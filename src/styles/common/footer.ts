import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  font-weight: 500;
  font-size: 1rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(${({ theme }) => theme.foreground_variant}, 0.9);

  .navigation {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;

    nav {
      width: 90%;
      display: flex;
      flex-flow: row wrap;
      gap: 30px;
      justify-content: flex-start;
      margin: 0 auto;

      section {
        display: flex;
        flex-direction: column;
        gap: 15px;
        h3 {
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 1.1rem;
          svg {
            width: 20px;
            height: 20px;
          }
          span {
            padding-left: 5px;
          }
        }

        .elements {
          display: flex;
          flex-direction: column;
          gap: 8px;

          a {
            font-size: 0.96rem;
            span {
              line-height: 1.2rem;
              :hover {
                cursor: pointer;
                color: rgb(${({ theme }) => theme.primary_variant});
              }
            }
          }
        }
      }
    }
  }

  .social-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    align-self: center;
    width: 90%;
    border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.5);

    .logo {
      padding-top: 10px;
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
      padding-top: 10px;

      a {
        padding: 10px;
        background: rgba(${({ theme }) => theme.primary}, 0.5);
        border-radius: 5px;

        :hover {
          color: rgb(${({ theme }) => theme.accent});
        }

        svg {
          width: 20px;
          height: 20px;
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
    line-height: 1.4rem;
    color: rgb(${({ theme }) => theme.neutral});
    background: rgba(${({ theme }) => theme.accent}, 0.9);
    padding: 10px 0;

    @media screen and (max-width: 350px) {
      text-align: center;
      padding: 10px;
    }
  }
`;
