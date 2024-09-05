/* eslint-disable @typescript-eslint/no-explicit-any */
import {ITheme} from '.';

export type IModifier = {
	main: string;
	secondary: string;
};

export const modifiersTheme = (theme: ITheme, themeStyle: string): IModifier => {
	const modifiers = {
		success: {
			main: theme.colors.success.medium,
			secondary: theme.colors.white,
		},
		danger: {
			main: theme.colors.danger.medium,
			secondary: theme.colors.white,
		},
		info: {
			main: theme.colors.info.medium,
			secondary: theme.colors.white,
		},
		alert: {
			main: theme.colors.alert.medium,
			secondary: theme.colors.white,
		},
		black: {
			main: theme.colors.black.medium,
			secondary: theme.colors.white,
		},
		primary: {
			main: theme.colors.primary.medium,
			secondary: theme.colors.white,
		},
		light: {
			main: theme.colors.light.dark,
			secondary: theme.colors.white,
		},
	};

	return (<any>modifiers)[themeStyle];
};
