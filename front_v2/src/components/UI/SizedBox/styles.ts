import styled from 'styled-components';

type SizeProps = {
	height: string;
};
export const Size = styled.div<SizeProps>`
	height: ${props => props.height};
`;
