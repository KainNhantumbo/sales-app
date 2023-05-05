import styled from 'styled-components';

export const LegalContainer = styled.div`
	margin-top: 50px;
	display: grid;
	align-items: center;
	justify-items: center;
	line-height: 1.6rem;

	article {
		line-height: 1.6rem;
		text-align: justify;
		background: rgb(${({ theme }) => theme.background});
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		max-width: 900px;
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
			font-size: 1.2rem;
		}

		h3 {
			font-weight: 500;
			padding-top: 10px;
		}

		h1 {
			font-size: 1.8rem;
			font-weight: 500;
		}

		p {
			font-size: 1rem;
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

		a,
		strong {
			color: rgb(${({ theme }) => theme.secondary});
		}
	}
`;
