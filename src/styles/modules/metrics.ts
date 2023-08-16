import styled from 'styled-components';

export const _metrics = styled.div`
  width: 100%;
  position: relative;

  * {
    ::selection {
      background: rgba(${({ theme }) => theme.font}, 0.2);
      color: rgb(${({ theme }) => theme.primary});
    }
  }

  h2 {
    align-self: start;
    display: flex;
    flex-direction: row;
    gap: 8px;
    font-size: 1.3rem;
    line-height: 1.8rem;
    align-items: center;
    font-weight: 500;
    padding-top: 12px;
    color: rgb(${({ theme }) => theme.font});
  }

  .metrics-container {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    gap: 12px;
    padding: 20px 0;

    .data-container {
      padding: 20px;
      border-radius: 8px;
      border: 1px solid rgba(${({ theme }) => theme.font}, 0.08);
      gap: 20px;
      border-style: dashed;

      @media screen and (max-width: 500px) {
        width: 100%;
      }

      h3 {
        display: flex;
        flex-direction: row;
        gap: 8px;
        font-size: 1.1rem;
        line-height: 1.6rem;
        font-weight: 500;
        color: rgb(${({ theme }) => theme.primary});
      }

      .element {
        display: flex;
        flex-direction: row;
        gap: 5px;
        line-height: 1.6rem;
      }
    }
  }
`;
