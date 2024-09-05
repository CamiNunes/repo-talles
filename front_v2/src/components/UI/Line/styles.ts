import styled, {css} from 'styled-components';

type ContainerProps = {
	height?: string;
	width?: string;
	borderRadius?: string;
	background?: string;
};
export const Container = styled.div<ContainerProps>`
	${({height, width, borderRadius, background}) => css`
		height: ${height && height != '' ? height : '2px'};
		width: ${width && width != '' ? width : '100%'};
		border-radius: ${borderRadius && borderRadius != '' ? borderRadius : '0'};
		background: ${background && background != '' ? background : '#000'};
	`}
`;
