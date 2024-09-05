import styled, {css} from 'styled-components';
export const Main = styled.div`
	position: relative;
	height: calc(100% - 180px);
`;
export const Container = styled.div`
	margin: 0;
	padding: 0;
	height: calc(100% + 130px);
	position: relative;
`;
export const BackGround = styled.div`
	position: absolute;
	width: 100%;
	height: 100vh;
`;
export const BackGroundTop = styled.div`
	width: 100%;
	height: 180px;
	background: #f6f0f0;
`;
export const BackGroundBottom = styled.div`
	width: 100%;
	height: calc(100% - 180px);
	background: #edf1f6;
`;
export const Body = styled.div`
	display: flex;
	height: 100%;
	background: #fff;
`;
type FormAreaProps = {
	isOpen: boolean;
};
export const FormArea = styled.div<FormAreaProps>`
	${({isOpen}) => css`
		display: flex;
		flex-direction: column;
		margin: 18px 2px 10px 18px;
		width: ${isOpen ? 'calc(100% - 200px)' : 'calc(100% - 50px)'};
		transition: 0.1s;
		padding: 0 5px;
		box-sizing: border-box;
	`}
`;
export const ContentTop = styled.div`
	height: 120px;
`;
export const Title = styled.div`
	font-family: 'Ubunto';
	color: #0e0e0e;
	font-size: 32px;
	font-weight: 400;
`;
