import styled from 'styled-components';

export const Container = styled.div`
	position: absolute;
	background: rgba(0, 0, 0, 0.8);
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999999;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: white;
`;

export const ProgressIndicator = styled.div`
	margin-top: 20px;
	width: 250px;
	height: 7px;
	background: #555;
	border-radius: 4px;
`;

type ProgressIndicatorLoadType = {
	progress: string;
};
export const ProgressIndicatorLoad = styled.div<ProgressIndicatorLoadType>`
	width: ${props => props.progress};
	height: 7px;
	background: #40cf54;
	border-radius: 4px;
`;

export const ProgressContent = styled.div`
	margin-top: 7px;
`;
