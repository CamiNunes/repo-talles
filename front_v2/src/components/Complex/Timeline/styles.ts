import styled, {css} from 'styled-components';

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	margin-bottom: 12px;
`;

type FlagProps = {
	color: string;
	width?: string;
};
export const Flag = styled.div<FlagProps>`
	${({color, width}) => css`
		width: ${width ? width : 50}px;
		height: ${width ? width : 50}px;
		background-color: ${color};
		border-radius: ${width ? width : 50}px;
		display: flex;
		align-items: center;
		justify-content: center;
	`}
`;

type FlagLineProps = {
	orientation: 'Horizontal' | 'Vertical';
};
export const FlagLine = styled.div<FlagLineProps>`
	height: 4px;
	background-color: #a9a9a9;
	width: 20px;
`;

export const LeftContent = styled.div`
	display: flex;
	width: 15%;
`;
