import styled from 'styled-components';

export const Content = styled.div`
	#overlay {
		position: fixed;

		z-index: 1000;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		background-color: rgb(0, 0, 0, 0.5);
		color: black;

		&.active {
			opacity: 1;
			pointer-events: all;
		}
	}
`;

type WrapperProps = {
	background: string;
	borderRadius?: string;
	maxHeight: string;
	height?: string;
};
export const Wrapper = styled.div<WrapperProps>`
	::-webkit-scrollbar {
		width: 7px;
		border-radius: 0 7px 7px 0;
	}

	::-webkit-scrollbar-track {
		background: #aaa;
		border-radius: 0 7px 7px 0;
	}

	::-webkit-scrollbar-thumb {
		background: #555;
		border-radius: 0 7px 7px 0;
	}
	max-height: ${props => props.maxHeight};
	height: ${props => (props.height ? props.height : 'auto')};
	overflow-y: auto;
	position: fixed;
	box-sizing: border-box;
	top: 50%;
	left: 50%;
	padding: 25px 30px;
	transform: translate(-50%, -50%) scale(0);
	border-radius: ${props => (props.borderRadius ? props.borderRadius : '7px')};
	z-index: 99999;
	background: ${props => props.background};
	transition: 200ms ease-in-out;
	min-width: 370px;
	width: 464px;

	&.active {
		transform: translate(-50%, -50%) scale(1);
	}

	@media (max-width: 520px) {
		width: 90%;
	}
`;

export const Body = styled.div`
	p {
		text-align: left;
		font-family: Open Sans;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 24px;
		color: rgba(0, 0, 0, 0.64);
	}
`;
