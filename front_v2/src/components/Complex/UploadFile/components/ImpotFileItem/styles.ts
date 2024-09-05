import styled from 'styled-components';

interface ActiveProps {
	progress: number;
}

export const File = styled.div<ActiveProps>`
	margin-top: 30px;
	display: flex;
	align-items: center;

	.content {
		width: 70%;
		display: flex;
		align-items: center;

		svg path {
			fill: ${props => (props.progress < 100 ? 'black' : '#FF9243')};
		}

		svg {
			margin-right: 12px;
			margin-top: 8px;
		}

		.detail {
			width: 100%;
			span {
				font-size: 16px;
				font-weight: 600;
				line-height: 24px;
				color: black;
			}

			.progress-bar {
				margin-top: 8px;
				height: 6px;
				width: 70%;
				background: black;
				border-radius: 4px;

				.bar {
					width: ${props => props.progress + '%'};
					height: 6px;
					border-radius: 4px;
					background: ${props => (props.progress < 70 ? '#FF9243' : '#FF9243')};
				}
			}
		}
	}
	.btn {
		margin-top: 12px;
		width: 30%;
		display: flex;
		align-items: end;
		justify-content: end;

		a {
			font-size: 16px;
			font-weight: 600;
			line-height: 24px;
			color: black;
			cursor: pointer;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`;
