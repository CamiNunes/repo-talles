/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as S from './styles';

type Props = {
	value?: string;
	onChange: (value: string) => void;
	onKeyDown?: (event: any) => void;
	textColor?: string;
	background?: string;
	label?: string;
	labelColor?: string;
	focusLabelColor?: string;
	placeholder?: string;
	border?: string;
	focusBorder?: string;
	inputType?: 'default' | 'undeline' | 'light';
	required?: boolean;
	disabled?: boolean;
	rows?: number;
	onPressEnter?: () => void;
	onBlur?: () => void;
	onFocus?: () => void;
	onChangeValue?: () => void;
};

const TextArea = ({
	value = '',
	onChange,
	onKeyDown,
	textColor,
	background,
	label,
	labelColor,
	focusLabelColor,
	placeholder,
	border,
	focusBorder,
	inputType = 'default',
	required,
	disabled,
	rows = 2,
	onPressEnter,
	onBlur,
	onFocus,
	onChangeValue,
}: Props) => {
	return (
		<S.ContentAll>
			{label && inputType === 'light' ? (
				<S.Label inputType={inputType} labelColor={labelColor}>
					{label}
				</S.Label>
			) : (
				<></>
			)}
			<S.Container
				border={border}
				focusBorder={focusBorder}
				inputType={inputType}
				background={disabled ? '#eee' : background}>
				<S.TextArea
					onKeyDown={event => {
						onKeyDown ? onKeyDown(event) : null;
						if (event.key === 'Enter') {
							onPressEnter ? onPressEnter() : null;
						}
					}}
					placeholder={placeholder}
					value={value}
					onChange={val => {
						onChange(val.target.value);
						onChangeValue ? onChangeValue() : null;
					}}
					inputType={inputType}
					focusLabelColor={focusLabelColor}
					labelColor={labelColor}
					textColor={textColor}
					background={background}
					rows={rows}
					onBlur={onBlur}
					onFocus={onFocus}></S.TextArea>
				{label && inputType !== 'light' ? (
					<S.Label inputType={inputType} labelColor={labelColor}>
						{label}
						{required ? ' *' : ''}
					</S.Label>
				) : (
					<></>
				)}
			</S.Container>
		</S.ContentAll>
	);
};

export default TextArea;
