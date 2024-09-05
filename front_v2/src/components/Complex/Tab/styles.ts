import styled, {css} from 'styled-components';

type ContainerProps = {
	type: 'default' | 'inline';
};
export const Container = styled.div<ContainerProps>`
	${({type}) => css`
		display: flex;
		border-bottom: ${type === 'inline' ? `1px solid #75868F` : 'none'};
	`}
`;

type BodyProps = {
	type: 'default' | 'inline';
	background?: string;
	bodyBorderRadius?: string;
};
export const Body = styled.div<BodyProps>`
	${({type, background, bodyBorderRadius}) => css`
		background: ${background ? background : type === 'default' ? '#fff' : 'transparent'};
		padding: 12px 16px;
		border-radius: ${bodyBorderRadius ? bodyBorderRadius : '0 7px 7px 7px'};
	`}
`;

const modifierType = {
	default: (
		active: boolean,
		background?: string,
		headerTextColor?: string,
		unselectColor?: string,
	) => css`
		border-radius: 7px 7px 0 0;
		background: ${active
			? background
				? background
				: '#fff'
			: unselectColor
			? unselectColor
			: '#ccc'};
		margin-right: 1px;
		font-size: 13px;
		font-weight: 600;
		color: ${headerTextColor ? headerTextColor : '#000'} !important;
	`,
	inline: (active: boolean, background?: string, headerTextColor?: string) => css`
		font-size: 13px;
		font-weight: ${active ? 'bold' : '400'};
		border-bottom: ${active ? '3px solid black' : 'none'};
		color: ${headerTextColor ? headerTextColor : '#000'} !important;
	`,
};

type TabItemProps = {
	active: boolean;
	type: 'default' | 'inline';
	background?: string;
	headerTextColor?: string;
	unselectColor?: string;
};
export const TabItem = styled.div<TabItemProps>`
	${({active, type, background, headerTextColor, unselectColor}) => css`
		${modifierType[type](active, background, headerTextColor, unselectColor)}
		color: black;
		box-sizing: border-box;
		padding: 8px 16px;
		cursor: pointer;
	`}
`;
