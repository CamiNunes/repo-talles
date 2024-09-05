import {ITheme} from 'src/theme';
import {IModifier, modifiersTheme} from 'src/theme/modifiers';
import styled, {css} from 'styled-components';
import {shade, transparentize} from 'polished';

type ContainerProps = {
	theme: ITheme;
	themeStyle?: 'success' | 'danger' | 'info' | 'alert' | 'black' | 'primary' | 'light';
	type: 'default' | 'ghost' | 'mininum';
	format: 'default' | 'circle' | 'square' | 'oval';
	borderRadius?: string;
	background?: string;
	textColor?: string;
	fill?: 'full' | 'auto';
	disabled: boolean;
	leftLineIconColor?: string;
};

const modifiersType = {
	default: (style: IModifier, disabled: boolean) => css`
		background: ${disabled ? '#aaa' : style.main};
		color: ${style.secondary};

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		cursor: ${disabled ? 'no-drop' : 'pointer'};
		transition: 0.2s;

		&:hover {
			background: ${disabled ? '#aaa' : shade(0.2, style.main)};
			transition: 0.2s;
		}

		&:active {
			background: ${disabled ? '#aaa' : shade(0.3, style.main)};
			transition: 0.2s;
		}
	`,
	ghost: (style: IModifier, disabled: boolean) => css`
		border: 1px solid ${disabled ? '#aaa' : style.main};
		color: ${disabled ? '#aaa' : style.main};

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		cursor: ${disabled ? 'no-drop' : 'pointer'};
		transition: 0.2s;

		&:hover {
			background: ${disabled ? 'transparent' : transparentize(0.95, style.main)};
			transition: 0.2s;
		}

		&:active {
			background: ${disabled ? 'transparent' : transparentize(0.8, style.main)};
			transition: 0.2s;
		}
	`,
	mininum: (style: IModifier) => css`
		color: ${style.secondary};

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		cursor: pointer;
		transition: 0.2s;

		&:hover {
			background: ${transparentize(0.85, '#ccc')};
			transition: 0.2s;
		}

		&:active {
			background: ${transparentize(0.75, '#ccc')};
			transition: 0.2s;
		}
	`,
};

const modifiersFormat = {
	default: (borderRadius?: string, fill?: 'full' | 'auto') => css`
		height: 33px;
		padding: 0 16px 2px 16px;
		border-radius: ${borderRadius && borderRadius != '' ? borderRadius : '4px'};
		width: ${fill === 'auto' ? 'auto' : '100%'};
	`,
	circle: () => css`
		height: 36px;
		width: 36px;
		border-radius: 36px;
	`,
	square: (borderRadius?: string, fill?: 'full' | 'auto') => css`
		height: 36px;
		padding: 0 16px 2px 16px;
		width: ${fill === 'auto' ? 'auto' : '100%'};
	`,
	oval: (borderRadius?: string, fill?: 'full' | 'auto') => css`
		height: 36px;
		padding: 0 16px 2px 16px;
		border-radius: ${borderRadius && borderRadius != '' ? borderRadius : '25px'};
		width: ${fill === 'auto' ? 'auto' : '100%'};
	`,
};

export const Container = styled.div<ContainerProps>`
	${({
		theme,
		themeStyle,
		type,
		background,
		textColor,
		format,
		borderRadius,
		fill,
		disabled,
		leftLineIconColor,
	}) => css`
		${themeStyle
			? modifiersType[type](modifiersTheme(theme, themeStyle), disabled)
			: modifiersType[type](
					{
						main: background ?? 'black',
						secondary: textColor ?? 'white',
					},
					disabled,
			  )};

		${modifiersFormat[format](borderRadius, fill)};

		font-size: ${type === 'mininum' ? '13px' : '14px'};
		box-sizing: border-box;

		.icon {
			font-size: ${type === 'mininum' ? '16px' : '14px'};

			i {
				color: ${themeStyle
					? modifiersTheme(theme, themeStyle).main
					: leftLineIconColor
					? leftLineIconColor
					: textColor};
				margin-top: 3px;
			}
		}
	`}
`;

type ButtonProps = {
	typeBtn: 'default' | 'ghost' | 'mininum';
	fontWeight?: string;
};

export const Button = styled.button<ButtonProps>`
	${({typeBtn, fontWeight}) => css`
		margin: 0;
		padding: 0;
		border: none;
		background: transparent;
		box-sizing: border-box;
		width: 100%;
		font-size: ${typeBtn === 'mininum' ? '13px' : '14px'};
		font-weight: ${typeBtn === 'mininum' ? '400' : fontWeight ? fontWeight : '600'};
		-webkit-appearance: none;
	`}
`;
