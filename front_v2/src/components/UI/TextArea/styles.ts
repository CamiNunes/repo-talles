import styled, {css} from 'styled-components';
import {shade} from 'polished';

type ContainerProps = {
	border?: string;
	focusBorder?: string;
	inputType: 'default' | 'undeline' | 'light';
	background?: string;
};

type TextAreaProps = {
	textColor?: string;
	labelColor?: string;
	focusLabelColor?: string;
	inputType: 'default' | 'undeline' | 'light';
	background?: string;
};

type LabelProps = {
	labelColor?: string;
	inputType: 'default' | 'undeline' | 'light';
};

const modifiersContainerType = {
	default: (
		border?: string,
		focusBorder?: string,
		background?: string,
		leftAttach?: string,
	) => css`
		width: 100%;
		background-color: ${background && background != '' ? background : '#fff'};
		border-radius: ${leftAttach ? '0 4px 4px 0' : '4px'};
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border: ${border && border != '' ? border : '1px solid black'};

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
		border-bottom: ${border && border != '' ? border : '1.5px solid black'};

		&:focus-within {
			border-bottom: ${focusBorder && focusBorder != ''
				? focusBorder
				: '1.5px solid #2196f3'};
		}
	`,
	light: (border?: string, focusBorder?: string, background?: string) => css`
		width: 100%;
		background-color: ${background && background != '' ? background : '#fff'};
		border-radius: 7px;
		display: flex;
		align-items: center;
		justify-content: center;
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
		textColor?: string,
		background?: string,
	) => css`
		margin: 9px 10px;
		box-sizing: border-box;
		outline: none;
		border: none;
		width: 100%;
		font-size: 13px;
		color: ${textColor && textColor != '' ? textColor : 'black'};
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
	undeline: (focusLabelColor?: string, labelColor?: string, textColor?: string) => css`
		margin: 10px 6px 5px 6px;
		box-sizing: border-box;
		outline: none;
		border: none;
		width: 100%;
		font-size: 14px;
		background: transparent;
		color: ${textColor && textColor != '' ? textColor : 'black'};

		&:valid ~ label {
			top: -8px;
			left: 1px;
			font-size: 10px;
			transition: 0.2s;
			color: ${labelColor && labelColor != '' ? labelColor : 'black'};
		}

		&:focus ~ label {
			top: -8px;
			left: 1px;
			font-size: 10px;
			transition: 0.2s;
			color: ${focusLabelColor && focusLabelColor != '' ? focusLabelColor : '#2196f3'};
		}
	`,
	light: (
		focusLabelColor?: string,
		labelColor?: string,
		textColor?: string,
		background?: string,
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
	default: (labelColor?: string) => css`
		top: 8px;
		font-size: 14px;
		z-index: 20;
		background-color: #fafafa;
		padding: 0 0.4rem;
		box-sizing: border-box;
		background: linear-gradient(transparent 41%, #fff 41%, #fff 59%);
		color: ${labelColor && labelColor ? labelColor : 'black'};
		position: absolute;
		transition: 0.2s ease all;
	`,
	undeline: (labelColor?: string) => css`
		top: 6px;
		font-size: 14px;
		z-index: 20;
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
};

export const Container = styled.div<ContainerProps>`
	${({inputType, border, focusBorder, background}) => css`
		${modifiersContainerType[inputType](border, focusBorder, background)};}
	`}
`;

export const TextArea = styled.textarea<TextAreaProps>`
	${({inputType, focusLabelColor, labelColor, textColor, background}) => css`
		${modifiersInputType[inputType](focusLabelColor, labelColor, textColor, background)};
		resize: none;
	`}
`;

export const Label = styled.label<LabelProps>`
	${({inputType, labelColor}) => css`
		${modifiersLabelType[inputType](labelColor)};
	`}
`;

type LeftAttachProps = {
	background?: string;
	border?: string;
};
export const LeftAttach = styled.div<LeftAttachProps>`
	box-sizing: border-box;
	padding: 0 12px;
	height: 38px;
	background: ${props => (props.background ? shade(0.5, props.background) : 'transparent')};
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px 0 0 4px;
	border: ${props => (props.border ? props.border : 'none')};
	border-right: none;
`;

export const ContentAll = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: start;
	width: 100%;
`;
