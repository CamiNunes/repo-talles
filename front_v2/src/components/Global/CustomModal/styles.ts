import styled, {css} from 'styled-components';

export const Container = styled.div`
	background: #fff;
	border-radius: 7px;
	color: #000;
`;

export const Header = styled.div`
	${() => css`
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 16px;
		border-radius: 8px 8px 0 0;
		font-family: 'Ubunto';
		font-weight: 400;
		font-size: 15px;
		border-bottom: 1px solid #cccccc;
	`}
`;

export const Body = styled.div`
	${() => css`
		box-sizing: border-box;
		padding: 12px 16px;
		font-family: 'Ubunto';
		font-size: 13px;
	`}
`;
