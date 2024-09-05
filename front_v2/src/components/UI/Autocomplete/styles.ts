import styled from 'styled-components';

export const Content = styled.div`
	position: relative;
	width: 100%;
`;

export const OptionContainer = styled.div`
	z-index: 10000;
	position: absolute;
	width: 100%;
	margin-top: 5px;
	border-radius: 6px;
	box-shadow: 2px 2px 3px #ddd;
	border: 1px solid #ddd;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: white;
`;

export const Options = styled.div`
	box-sizing: border-box;
	padding: 8px 6px;
	position: relative;
	width: 100%;
	cursor: pointer;
	color: black;
	font-size: 14px;
	border-radius: 6px;

	&:hover {
		background: #ccc;
	}
`;
