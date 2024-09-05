import styled, {css} from 'styled-components';

type ButtonProps = {
	color?: string;
	size?: string;
	iconSize?: string;
	useBorder?: boolean;
};
export const Button = styled.div<ButtonProps>`
	${({color, size, iconSize, useBorder}) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${color ?? 'black'};
		width: ${size ?? '26px'};
		height: ${size ?? '26px'};
		border-radius: ${size && size != '' ? size : '26px'};
		transition: 0.1s;
		font-size: ${iconSize && iconSize != '' ? iconSize : '16px'};
		cursor: pointer;
		border: ${useBorder ? `1px solid ${color}` : 'none'};

		&:hover {
			background: #777;
			transition: 0.1s;
		}

		&:active {
			background: #666;
			transition: 0.1s;
		}
	`}
`;
