import styled, {css} from 'styled-components';
type ContainerProps = {isOpen: boolean};
export const Container = styled.div<ContainerProps>`
	${({isOpen}) =>
		css`
			width: ${isOpen ? '250px' : '50px'};
			background-color: white;
			min-height: calc(100vh - 50px);
			border-radius: 0 17px 0 0;
			transition: 0.1s;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			box-shadow: 2px 0px 6px #bbb;
		`}
`;
export const ContainerMenu = styled.div`
	padding: 20px 12px;
`;
export const ContainerMenuLogout = styled.div`
	padding: 6px 12px;
	border-top: 1px solid #e1e2e3;
`;
export const ItemContent = styled.div`
	width: 100%;
	display: flex;
	padding: 10px 6px;
	box-sizing: border-box;
	cursor: pointer;
`;
export const ItemContentLogout = styled.div`
	width: 100%;
	display: flex;
	padding: 10px 6px;
	box-sizing: border-box;
	cursor: pointer;
`;
type IconProps = {isOpen: boolean};
export const Icon = styled.div<IconProps>`
	${({isOpen}) =>
		css`
			width: ${isOpen ? '18%' : '100%'};
			color: #ec4401;
			display: flex;
			align-items: center;
			justify-content: ${isOpen ? 'start' : 'center'};
			transition: 0.1s;
		`}
`;
export const Item = styled.div`
	width: 67%;
	font-family: 'Ubunto';
	font-size: 13px;
	color: #0e0e0e;
	display: flex;
	align-items: center;
`;
export const Arrow = styled.div`
	width: 15%;
	color: #0e0e0e;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 13px;
`;
export const SubItemContent = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
`;
export const SubItem = styled.div`
	width: calc(85% - 19px);
	margin-left: 9%;
	border-left: 1px dashed #0e0e0e;
	color: #0e0e0e;
	box-sizing: border-box;
	padding: 5px 0 5px 19px;
	display: flex;
	font-size: 13px;
`;
