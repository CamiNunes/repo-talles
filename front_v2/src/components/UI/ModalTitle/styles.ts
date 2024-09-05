import styled from 'styled-components';

type TitleProps = {
	color?: string;
};
export const Title = styled.div<TitleProps>`
	font-size: 18px;
	font-weight: 600;
	padding: 0 0px 12px 12px;
	border-bottom: 1px solid ${props => (props.color ? props.color : '#fff')};
	margin-bottom: 15px;
	color: ${props => (props.color ? props.color : '#fff')};
`;
