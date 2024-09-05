import styled, {css} from 'styled-components';

type ContainerProps = {
	width?: string;
	height?: string;
	borderRadius?: string;
	background?: string;
	boxShadow?: string;
	padding?: string;
};

export const Container = styled.div<ContainerProps>`
	${({width, height, borderRadius, background, boxShadow, padding}) => css`
		width: ${width && width != '' ? width : '100%'};
		height: ${height && height != '' ? height : 'auto'};
		border-radius: ${borderRadius && borderRadius != '' ? borderRadius : '6px'};
		background: ${background && background != '' ? background : '#eee'};
		box-shadow: ${boxShadow && boxShadow != '' ? boxShadow : '5px 5px 4px #aaa'};
		padding: ${padding && padding != '' ? padding : '12px 16px'};
	`}
`;

export const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;
