import styled, {css} from 'styled-components';
import {shade} from 'polished';

type ContainerProps = {
	border?: string;
	focusBorder?: string;
	leftIconColor?: string;
	rightIconColor?: string;
	background?: string;
	inputType: 'default' | 'undeline' | 'light';
};

type InputProps = {
	labelColor?: string;
	focusLabelColor?: string;
	textColor?: string;
	background?: string;
	inputType: 'default' | 'undeline' | 'light';
};

type LabelProps = {
	labelColor?: string;
	hasLeftIcon: boolean;
	inputType: 'default' | 'undeline' | 'light';
};

const modifiersContainerType = {
	default: (border?: string, focusBorder?: string, background?: string) => css`
		width: 100%;
		background: ${background && background != '' ? background : '#fff'};
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
		border: ${border && border != '' ? border : '1px solid black'};
		color: black;

		&:focus-within {
			border: ${focusBorder && focusBorder != '' ? focusBorder : '1px solid #2196f3'};
		}
	`,
	undeline: (border?: string, focusBorder?: string) => css`
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-direction: column;
		border-bottom: ${border && border != '' ? border : '1.5px solid black'};
		color: black;

		&:focus-within {
			border-bottom: ${focusBorder && focusBorder != ''
				? focusBorder
				: '1.5px solid #2196f3'};
		}
	`,
	light: (border?: string, focusBorder?: string, background?: string) => css`
		width: 100%;
		background: ${background && background != '' ? background : '#fff'};
		border-radius: 7px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
		border: ${border && border != '' ? border : '1px solid #00000020'};

		&:focus-within {
			border: ${focusBorder && focusBorder != '' ? focusBorder : '1px solid #2196f3'};
		}
	`,
};

const modifiersInputType = {
	default: (
		focusLabelColor?: string,
		labelColor?: string,
		background?: string,
		textColor?: string,
	) => css`
		margin: 9px 10px;
		outline: none;
		border: none;
		width: 100%;
		font-size: 14px;
		background: ${background && background != '' ? background : '#fff'};
		color: ${textColor && textColor != '' ? textColor : 'black'};

		&:valid ~ label {
			top: -9px;
			left: 8px;
			font-size: 11px;
			transition: 0.2s;
			color: ${labelColor && labelColor != '' ? labelColor : 'black'};
		}

		&:focus ~ label {
			top: -9px;
			left: 8px;
			font-size: 11px;
			transition: 0.2s;
			color: ${focusLabelColor && focusLabelColor != '' ? focusLabelColor : '#2196f3'};
		}
	`,
	undeline: (focusLabelColor?: string, labelColor?: string) => css`
		margin: 10px 6px 5px 6px;
		outline: none;
		border: none;
		width: 100%;
		font-size: 14px;
		background: transparent;

		&:valid ~ label {
			top: -7px;
			left: 2px;
			font-size: 11px;
			transition: 0.2s;
			color: ${labelColor && labelColor != '' ? labelColor : 'black'};
		}

		&:focus ~ label {
			top: -7px;
			left: 2px;
			font-size: 11px;
			transition: 0.2s;
			color: ${focusLabelColor && focusLabelColor != '' ? focusLabelColor : '#2196f3'};
		}
	`,
	light: (
		focusLabelColor?: string,
		labelColor?: string,
		background?: string,
		textColor?: string,
	) => css`
		margin: 9px 10px;
		box-sizing: border-box;
		outline: none;
		border: none;
		width: 100%;
		font-size: 14px;
		color: ${textColor && textColor != '' ? textColor : '#75868f'};
		background: ${background && background != '' ? background : '#fff'};

		&:valid ~ label {
			top: -9px;
			left: 8px;
			font-size: 11px;
			transition: 0.2s;
			color: ${labelColor && labelColor != '' ? labelColor : 'black'};
		}

		&:focus ~ label {
			top: -9px;
			left: 8px;
			font-size: 11px;
			transition: 0.2s;
			color: ${focusLabelColor && focusLabelColor != '' ? focusLabelColor : '#2196f3'};
		}
	`,
};

const modifiersLabelType = {
	default: (labelColor?: string, hasLeftIcon = false) => css`
		top: 8px;
		left: ${hasLeftIcon ? '27px' : '5px'};
		font-size: 14px;
		z-index: 20;
		background-color: #fafafa;
		padding: 0 0.4rem;
		background: linear-gradient(transparent 41%, #fff 41%, #fff 59%);
		color: ${labelColor && labelColor ? labelColor : 'black'};
		position: absolute;
		transition: 0.2s ease all;
	`,
	undeline: (labelColor?: string, hasLeftIcon = false) => css`
		top: 6px;
		left: ${hasLeftIcon ? '27px' : '5px'};
		font-size: 14px;
		z-index: 20;
		background-color: #fafafa;
		padding: 0 0.4rem;
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
};

export const Container = styled.div<ContainerProps>`
	${({inputType, border, focusBorder, leftIconColor, rightIconColor, background}) => css`
		${modifiersContainerType[inputType](border, focusBorder, background)};

		.icon-left {
			color: ${leftIconColor && leftIconColor != '' ? leftIconColor : 'black'};
			font-size: 18px;
			padding-left: 5px;
		}
		.icon-right {
			color: ${rightIconColor && rightIconColor != '' ? rightIconColor : 'black'};
			font-size: 18px;
			padding-right: 5px;
		}
	`}
`;

export const Input = styled.input<InputProps>`
	${({inputType, focusLabelColor, labelColor, background, textColor}) => css`
		${modifiersInputType[inputType](focusLabelColor, labelColor, background, textColor)};
	`}
`;

export const Label = styled.label<LabelProps>`
	${({inputType, labelColor, hasLeftIcon}) => css`
		${modifiersLabelType[inputType](labelColor, hasLeftIcon)};
	`}
`;

export const ContentTag = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	flex-wrap: wrap;
	gap: 8px;
	width: 99%;
	padding: 4px 0;
`;

type TagProps = {
	borderRadius?: string;
	background?: string;
	color?: string;
};
export const Tag = styled.div<TagProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
	color: ${props => (props.color && props.color != '' ? props.color : 'black')};
	background-color: ${props =>
		props.background && props.background != '' ? props.background : '#ccc'};
	border-radius: ${props =>
		props.borderRadius && props.borderRadius != '' ? props.borderRadius : '4px'};
	padding: 5px 10px 5px 14px;
	line-height: 20px;
	font-size: 14px;

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 18px;
		width: 18px;
		border-radius: 18px;
		cursor: pointer;

		&:hover {
			background: ${props =>
				shade(0.3, props.background && props.background != '' ? props.background : '#ccc')};
		}
	}
`;

export const ContentAll = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: start;
	width: 100%;
`;
