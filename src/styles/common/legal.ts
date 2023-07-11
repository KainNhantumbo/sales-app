import styled from 'styled-components';

export const LegalContainer = styled.div`
  margin-top: 50px;
  display: grid;
  align-items: center;
  justify-items: center;
  background: rgb(${({ theme }) => theme.background});

  .code-of-conduct-container {
    text-align: start;
  }

  .faq-container {
    text-align: start;

    .introdution-container {
      padding: 20px;
      border-radius: 12px;
      width:100% ;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgb(${({ theme }) => theme.background_variant});

      h1 {
        text-align: center;
      }
      p {
        text-align: center;
        max-width: max(700px);
      }
    }

    h2 {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-self: center;
      gap: 12px;
      text-transform: capitalize;
      padding-top: 20px;
      border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);

      svg {
        padding: 12px;
        width: 60px;
        height: 60px;
        background: rgb(${({ theme }) => theme.background_variant});
        border-radius: 12px;
      }
    }

    .section-container {
      padding: 12px 20px;
      padding-top: 12px;
      border-top: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
    }
  }

  article {
    font-size: 1rem;
    line-height: 1.6rem;
    text-align: justify;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 1080px;
    padding: 50px;

    @media screen and (max-width: 520px) {
      padding: 40px 20px;
      text-align: left;
    }
    @media screen and (max-width: 370px) {
      padding: 30px 10px;
    }

    h2 {
      font-weight: 500;
      line-height: 2rem;
      margin-top: 5px;
      font-size: 1.4rem;
    }

    h3 {
      font-weight: 500;
      font-size: 1.2rem;
      padding-top: 10px;
    }

    h1 {
      font-size: 1.8rem;
      font-weight: 500;
    }

    p {
      padding: 5px 0;
    }

    ul,
    ol {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 12px;

      strong {
        margin-bottom: 5px;
      }
    }

    li {
      list-style: circle;
      list-style-position: inside;
    }

    strong {
      color: rgb(${({ theme }) => theme.primary_variant});
    }

    a {
      color: rgb(${({ theme }) => theme.secondary});
    }

    em {
      font-style: italic;
    }

    .resumo {
      font-style: italic;
      padding: 10px;
      border-radius: 12px;
      background: rgb(${({ theme }) => theme.background_variant});
    }

    .attribution {
      font-size: 0.8rem;
      line-height: 1.1rem;
    }
  }
`;
