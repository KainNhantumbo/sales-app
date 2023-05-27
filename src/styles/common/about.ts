import styled from 'styled-components';

export const AboutContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgb(${({ theme }) => theme.foreground});

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.1);
      color: rgb(${({ theme }) => theme.primary_variant});
    }
  }

  h2,
  h3 {
    font-weight: 500;
  }

  a {
    color: rgb(${({ theme }) => theme.secondary_variant});
    font-weight: 500;
  }

  h3 {
    position: relative;
    padding-left: 20px;

    svg {
      color: rgb(${({ theme }) => theme.font});
      position: absolute;
      width: 18px;
      height: 18px;
      top: 3px;
      left: 0;
    }
  }

  h1 {
    line-height: 2.6rem;
    font-size: 2rem;
    strong {
      font-weight: 500;
    }
    @media screen and (max-width: 420px) {
      font-size: 1.8rem;
      line-height: 2.4rem;
    }
  }

  article {
    padding: 30px 40px;
    margin: 0 auto;
    width: 100%;
    max-width: 1280px;
    margin-top: 50px;
  }
`;
