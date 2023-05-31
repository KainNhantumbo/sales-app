import styled from 'styled-components';
import { BaseButton } from '../defaults';

export const AppStatusContainer = styled.section`
	position: fixed;
	width: 100vw;
	height: 100vh;
	background: rgb(${({ theme }) => theme.background});
	z-index: 500;
	top: 95px;
	left: 0;
	display: grid;
	place-content: center;
	user-select: none;
	position: fixed;

	.content {
		margin-top: -395px;
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
			color: rgb(${({ theme }) => theme.secondary});
		}

		.message {
			text-align: center;
			span {
				font-size: 1.2rem;
				font-weight: 500;
			}

			h3 {
				margin-top: 20px;
			}
		}

		button {
			${BaseButton}
			margin-top: 20px;
			span {
				padding: 0;
			}
		}
	}
`;
