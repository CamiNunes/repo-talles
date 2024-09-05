import styled, {css} from 'styled-components';

type HeaderProps = {
	textColor?: string;
	background?: string;
	padding?: string;
};

type IconProps = {
	color?: string;
	size?: string;
};

type BodyProps = {
	background?: string;
	padding?: string;
};

type ContainerProps = {
	border?: string;
	borderRadius?: string;
};

export const Container = styled.div<ContainerProps>`
	${({border, borderRadius}) => css`
		border: ${border ? border : 'none'};
		border-radius: ${borderRadius ? borderRadius : 'none'};
	`}
`;

export const Header = styled.div<HeaderProps>`
	${({textColor, padding, background}) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;

		color: ${textColor && textColor != '' ? textColor : '#000'};
		padding: ${padding && padding != '' ? padding : '8px 16px'};
		background: ${background && background != '' ? background : 'transparent'};
	`}
`;

export const Icon = styled.div<IconProps>`
	${({color, size}) => css`
		margin-right: 20px;
		font-size: ${size && size != '' ? size : '16px'};
		color: ${color && color != '' ? color : '#555'};
	`}
`;

export const CollapseIcon = styled.div`
	cursor: pointer;
`;

export const Body = styled.div<BodyProps>`
	${({background, padding}) => css`
		padding: ${padding && padding != '' ? padding : '16px 8px 4px 8px'};
		background: ${background && background != '' ? background : 'transparent'};
	`}
`;
