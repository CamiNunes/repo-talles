import styled, {css} from 'styled-components';

type ContentImportFile = {
	border?: string;
	height?: string;
	background?: string;
};

export const ContentImportFile = styled.div<ContentImportFile>`
	${({border, height, background}) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: ${background ? background : '#f8f8fa'};
		border: ${border && border != '' ? border : '2px dashed black'};
		border-radius: 8px;
		padding: 16px;
		margin-top: 24px;
		cursor: pointer;
		height: ${height && height != '' ? height : ''};
	`}
`;

export const Icon = styled.div`
	width: 56px;
	height: 56px;
	background-color: #2b45d4;
	border-radius: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 16px;

	svg path {
		fill: white;
	}
`;

type ImportType = {
	textColor?: string;
	spanColor?: string;
};
export const Import = styled.a<ImportType>`
	${({textColor, spanColor}) => css`
		font-size: 16px;
		font-weight: 600;
		line-height: 24px;
		color: ${textColor ? textColor : '#2b45d4'};

		span {
			color: ${spanColor ? spanColor : 'black'};
		}
	`}
`;

type ImportInfoType = {
	textColor?: string;
};

export const ImportInfo = styled.div<ImportInfoType>`
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	margin-top: 12px;
	color: ${props => (props.textColor ? props.textColor : 'black')};
`;
