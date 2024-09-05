/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, {css} from 'styled-components';

export const ContainerCalender = styled.div`
	display: flex;
	width: 100%;
	color: #fff;
`;

type WrapperProps = {
	isFocused?: boolean;
	isFill?: boolean;
	inputType: 'default' | 'undeline' | 'light';
	border?: string;
	disabled?: boolean;
};

type LabelProps = {
	inputType: 'default' | 'undeline' | 'light';
	labelColor?: string;
};

const modifiersWrapperType = {
	default: (border?: string, disabled?: boolean) => css`
		display: flex;
		position: relative;
		flex-direction: row;
		align-items: center;
		background: ${disabled ? '#ddd' : '#fff'};
		width: 100%;

		border: ${border && border != '' ? border : '1px solid black'};
		border-radius: 4px;
	`,
	undeline: () => css``,
	light: (border?: string, disabled?: boolean) => css`
		display: flex;
		position: relative;
		flex-direction: row;
		align-items: center;
		background: ${disabled ? '#ddd' : '#fff'};
		width: 100%;

		border: ${border && border != '' ? border : '1px solid #00000020'};
		border-radius: 7px;
	`,
};

const modifiersLabelType = {
	default: (border?: string, disabled?: boolean) => css`
		position: absolute;
		top: 9px;
		left: 35px;
		font-size: 14px;
		padding-left: 6px;

		z-index: 2;
		background-color: ${disabled ? '#ddd' : '#fafafa'};
		background: linear-gradient(transparent 41%, #fff 41%, #fff 59%);
		color: black;
	`,
	undeline: () => css``,
	light: (labelColor?: string) => css`
		display: block;
		color: ${labelColor && labelColor ? labelColor : '#75868f'};
		padding-bottom: 4px;
		padding-left: 7px;
		font-size: 12px;
	`,
};

export const ContainerInputData = styled.div<WrapperProps>`
	${({isFocused, isFill, inputType, border, disabled}) => css`
		${modifiersWrapperType[inputType](border, disabled)}
		flex: 1;

		${isFocused &&
		css`
			border: 2px solid;
			border-color: black;
		`}
		${isFill &&
		css`
			border: ${border && border != '' ? border : '1px solid #00000020'};

			${Label} {
				top: -9px;
				left: 8px;
				font-size: 11px;
				z-index: 2;
				background-color: #fafafa;
				background: linear-gradient(transparent 41%, #fff 41%, #fff 59%);
				color: black;
			}
		`}
    .react-datepicker-popper {
			z-index: 10;
			width: 100% !important;
			max-width: 200px;

			.react-datepicker {
				width: 100%;
				max-width: 200px;

				.react-datepicker__triangle {
					display: none;
				}
				.react-datepicker__month-container {
					width: 100%;
					max-width: 200px;
					font-size: 12px;
					.react-datepicker__header {
						display: flex;
						flex-direction: column;
						align-items: center;
						.react-datepicker__current-month {
							font-size: 16px;
							margin: 5px 0px;
						}
						.react-datepicker__day-names {
							display: flex;
							flex-direction: row;
							text-align: center;

							width: 100%;
						}
						.react-datepicker__day-name {
							flex: 1;
						}
					}
					.react-datepicker__month {
						display: flex;
						flex-direction: column;
						align-items: center;

						.react-datepicker__week {
							display: flex;
							flex-direction: row;
							text-align: center;

							width: 100%;
							div {
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;
								flex: 1;
								font-size: 12px;
							}
						}
					}
				}
			}
		}

		div {
			div {
				input {
					border: none;
					outline: none;
					font-weight: 400;
					font-size: 14px;
					line-height: 24px;
					color: rgba(0, 0, 0, 0.88);
					margin-left: 4px;

					height: 36px;
					width: 90%;
				}
			}
		}
	`}
`;

export const Icon = styled.div`
	height: 16px;
	padding: 8px 12px;
	color: #0000008f;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Label = styled.label<LabelProps>`
	${({inputType, labelColor}) => css`
		${modifiersLabelType[inputType](labelColor)}
	`}
`;
