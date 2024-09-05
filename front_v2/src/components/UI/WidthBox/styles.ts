import styled from 'styled-components';

interface WidthBoxProps {
	width: string;
	margin: string;
}

export const WidthBox = styled.div<WidthBoxProps>`
	display: flex;
	align-items: center;
	justify-content: start;
	width: ${props => props.width};
	margin: ${props => props.margin};
`;
