import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  font-weight: 500;
  font-size: 1rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(${({ theme }) => theme.foreground_variant}, 0.5);
  backdrop-filter: blur(10px);
  position: relative;

  ::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 1px;
    right: 50%;
    bottom: 110px;
    border-radius: 50%;
    z-index: -999;
    transform: rotate(180);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 100px 60px rgba(${({ theme }) => theme.primary}, 0.8);
  }

  .featured-container {
    display: flex;
    flex-flow: row wrap;
    gap: 40px;
    justify-content: space-evenly;
    border-bottom: 1px solid rgba(${({ theme }) => theme.font}, 0.3);
    padding: 20px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;

    h3 {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 1.1rem;
      svg {
        width: 20px;
        height: 20px;
        color: rgb(${({ theme }) => theme.primary_variant});
      }
      span {
        padding-left: 5px;
      }
    }
  }

  .navigation {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;

    nav {
      width: 100%;
      max-width: 1280px;
      display: flex;
      flex-flow: row wrap;
      gap: 40px;
      justify-content: flex-start;
      margin: 0 auto;

      section {
        display: flex;
        flex-direction: column;
        gap: 15px;
        h3 {
          display: flex;
          align-items: center;
          font-weight: 500;
          font-size: 1.1rem;
          svg {
            width: 20px;
            height: 20px;
            color: rgb(${({ theme }) => theme.primary_variant});
          }
          span {
            padding-left: 5px;
          }
        }

        .elements {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;

          a {
            font-size: 0.98rem;
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
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.3);

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
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        background: rgba(${({ theme }) => theme.primary}, 0.2);
        border-radius: 10px;

        :hover {
          color: rgb(${({ theme }) => theme.primary_variant});
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }

    .theme-switcher {
      position: absolute;
      top: calc(50% - 15px);
      right: 20px;
      padding: 10px;
      border: none;
      cursor: pointer;
      color: rgb(${({ theme }) => theme.font});
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      background: rgba(${({ theme }) => theme.primary}, 0.2);
      border-radius: 10px;

      :hover {
        color: rgb(${({ theme }) => theme.primary_variant});
      }

      svg {
        width: 20px;
        height: 20px;
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
    background: rgba(${({ theme }) => theme.accent}, 0.3);
    backdrop-filter: blur(10px);
    padding: 10px 0;

    @media screen and (max-width: 350px) {
      text-align: center;
      padding: 10px;
    }
  }
`;
