import styled, {css} from 'styled-components';

type TextProps = {
	fontSize: string;
	color: string;
	fontWeight: string;
	margin: string;
};

export const Text = styled.p<TextProps>`
	${({fontSize, color, fontWeight, margin}) => css`
		font-family: 'sans-serif', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
			'Droid Sans', 'Helvetica Neue', sans-serif !important;
		font-size: ${fontSize && fontSize != '' ? fontSize : '14px'} !important;
		color: ${color && color != '' ? color : '#000'} !important;
		font-weight: ${fontWeight} !important;
		margin: 0;
		padding: 0;
		display: box;
		margin: ${margin};
	`}
`;
