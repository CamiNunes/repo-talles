import styled, {css} from 'styled-components';

type ContainerProps = {
	background?: string;
	borderAll?: string;
	borderTop?: string;
	borderDown?: string;
	borderLeft?: string;
	borderRight?: string;
	borderRadius?: string;
	height?: string;
	width?: string;
	margin?: string;
	flexDirection?: string;
	alignItems?: string;
	justifyContent?: string;
};

const test = (value: string | undefined) => value && value.trim() != '';

export const Container = styled.div<ContainerProps>`
	${({
		background,
		borderAll,
		borderTop,
		borderDown,
		borderLeft,
		borderRight,
		borderRadius,
		height,
		width,
		margin,
		flexDirection,
		alignItems,
		justifyContent,
	}) => css`
		display: flex;
		background-color: ${test(background) ? background : 'transparent'};
		border-top: ${test(borderTop) ? borderTop : test(borderAll) ? borderAll : ''};
		border-bottom: ${test(borderDown) ? borderDown : test(borderAll) ? borderAll : ''};
		border-left: ${test(borderLeft) ? borderLeft : test(borderAll) ? borderAll : ''};
		border-right: ${test(borderRight) ? borderRight : test(borderAll) ? borderAll : ''};
		border-radius: ${test(borderRadius) ? borderRadius : '0'};
		height: ${test(height) ? height : '0'};
		width: ${test(width) ? width : '0'};
		margin: ${test(margin) ? margin : 'none'};
		flex-direction: ${flexDirection};
		align-items: ${alignItems};
		justify-content: ${justifyContent};
	`}
`;
