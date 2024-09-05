import styled, {css} from 'styled-components';
import theme from 'src/theme';

type CheckboxContainerProps = {
	inputType?: 'default' | 'undeline' | 'light';
};
export const CheckboxContainer = styled.div<CheckboxContainerProps>`
	margin-right: 19px;
	cursor: pointer;
	display: flex;
	align-items: center;
	height: ${props => (props.inputType === 'light' ? '38px' : 'auto')};

	svg path {
		fill: ${theme.colors.light.dark};
	}
`;

type TextProps = {
	inputType?: 'default' | 'undeline' | 'light';
	textColor?: string;
	fontWeight?: string;
	fontSize?: string;
};

export const Text = styled.div<TextProps>`
	${({inputType, textColor, fontWeight, fontSize}) => css`
		font-size: ${inputType === 'light' ? '12px' : fontSize ? fontSize : '16px'};
		font-weight: ${inputType === 'light' ? '400' : fontWeight ? fontWeight : '600'};
		line-height: 24px;
		margin-left: ${inputType === 'light' ? '0px !important' : '15px'};
		color: ${inputType === 'light'
			? '#75868f'
			: textColor
			? textColor
			: theme.colors.black.medium};
	`}
`;

export const ContentIcon = styled.div`
	margin-top: 4px;
`;
