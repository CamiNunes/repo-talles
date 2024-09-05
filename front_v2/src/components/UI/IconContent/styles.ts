import styled, {css} from 'styled-components';

type Props = {
	color?: string;
	size?: string;
};
export const Content = styled.div<Props>`
	${({color, size}) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: ${size && size != '' ? size : '16px'};
		color: ${color ?? 'black'};
		margin: 0;
		padding: 0;
	`}
`;
