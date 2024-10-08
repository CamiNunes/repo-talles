import styled from 'styled-components';
import theme from 'src/theme';

export const CheckBoxWrapper = styled.div`
	position: relative;
`;
export const CheckBoxLabel = styled.label`
	position: absolute;
	top: 0;
	left: 0;
	width: 42px;
	height: 22px;
	margin-top: 3px;
	border-radius: 15px;
	background: #bebebe;
	cursor: pointer;
	&::after {
		content: '';
		display: block;
		border-radius: 50%;
		width: 15px;
		height: 15px;
		margin: 3px;
		background: #ffffff;
		box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
		transition: 0.2s;
	}
`;
export const CheckBox = styled.input`
	opacity: 0;
	z-index: 1;
	border-radius: 15px;
	width: 42px;
	height: 22px;
	&:checked + ${CheckBoxLabel} {
		background: #4fbe79;
		&::after {
			content: '';
			display: block;
			border-radius: 50%;
			width: 15px;
			height: 15px;
			margin-left: 21px;
			transition: 0.2s;
		}
	}
`;

export const Content = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

type LabelProps = {
	textColor?: string;
};

export const Label = styled.div<LabelProps>`
	font-size: 16px;
	font-weight: 600;
	line-height: 24px;
	color: ${props => (props.textColor ? props.textColor : theme.colors.black.medium)};
`;

export const ContentSwitch = styled.div``;
