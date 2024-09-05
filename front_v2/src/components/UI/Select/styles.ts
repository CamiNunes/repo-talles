import styled, {css} from 'styled-components';

type LabelProps = {
	labelColor?: string;
	hasLeftIcon: boolean;
	inputType: 'default' | 'undeline' | 'light' | 'minimal';
};

const modifiersLabelType = {
	default: (labelColor?: string, hasLeftIcon = false) => css`
		top: 8px;
		left: ${hasLeftIcon ? '27px' : '5px'};
		font-size: 14px;
		background-color: #fafafa;
		padding: 0 0.4rem;
		box-sizing: border-box;
		background: linear-gradient(transparent 41%, #fff 41%, #fff 59%);
		color: ${labelColor && labelColor ? labelColor : 'black'};
		position: absolute;
		transition: 0.2s ease all;
	`,
	undeline: (labelColor?: string, hasLeftIcon = false) => css`
		top: 6px;
		left: ${hasLeftIcon ? '27px' : '5px'};
		font-size: 14px;
		background-color: #fafafa;
		padding: 0 0.4rem;
		box-sizing: border-box;
		background: transparent;
		color: ${labelColor && labelColor ? labelColor : 'black'};
		position: absolute;
		transition: 0.2s ease all;
	`,
	light: (labelColor?: string) => css`
		display: block;
		color: ${labelColor && labelColor ? labelColor : '#75868f'};
		padding-bottom: 4px;
		box-sizing: border-box;
		padding-left: 7px;
		font-size: 12px;
	`,
	minimal: (labelColor?: string) => css`
		display: block;
		color: ${labelColor && labelColor ? labelColor : '#75868f'};
		padding-bottom: 4px;
		box-sizing: border-box;
		padding-left: 7px;
		font-size: 12px;
	`,
};

export const Label = styled.label<LabelProps>`
	${({inputType, labelColor, hasLeftIcon}) => css`
		${modifiersLabelType[inputType](labelColor, hasLeftIcon)};
	`}
`;
