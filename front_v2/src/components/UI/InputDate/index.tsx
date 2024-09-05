/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import * as S from './styles';
import 'react-datepicker/dist/react-datepicker.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {Wrapper, WidthBox, Text} from '../';

interface propsInputDate {
	label?: string;
	placeholder?: string;
	value: Date | undefined | null;
	required?: boolean;
	onChange: (date: Date) => void;
	className?: string;
	inputType?: 'default' | 'undeline' | 'light';
	border?: string;
	labelColor?: string;
	iconPosition?: 'left' | 'right';
	errorMessage?: string;
	disabled?: boolean;
	hide?: boolean;
	onPressEnter?: () => void;
	onBlur?: () => void;
	onFocus?: () => void;
	onChangeValue?: () => void;
}

const InputDate = ({
	label,
	value,
	onChange,
	required,
	className,
	placeholder,
	inputType = 'default',
	border,
	labelColor,
	iconPosition = 'left',
	disabled,
	errorMessage,
	hide,
	onPressEnter,
	onBlur,
	onFocus,
	onChangeValue,
}: propsInputDate) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isFill, setIsFill] = useState(false);

	function mOnFocus() {
		setIsFocused(true);
		setIsFill(true);
	}
	function mOnBlur() {
		setIsFocused(false);
		setIsFill(!!value);
		onBlur ? onBlur() : null;
		onFocus ? onFocus() : null;
	}
	useEffect(() => {
		if (value !== null && value !== undefined) {
			setIsFill(!!value);
		} else {
			mOnBlur();
		}
	}, [value]);

	const getValue = (): any => {
		if (value && typeof value == 'string') {
			return new Date(value);
		}

		return value;
	};

	if (hide) return <></>;

	return (
		<Wrapper flexDirection="column" gap="0" alignItems="start">
			{label && inputType === 'light' ? (
				<S.Label inputType={inputType} labelColor={labelColor}>
					{label} {required && <span> *</span>}
				</S.Label>
			) : (
				<></>
			)}
			<S.ContainerInputData
				className={className}
				isFocused={isFocused}
				isFill={isFill}
				inputType={inputType}
				border={border}
				disabled={disabled}>
				{iconPosition === 'left' ? (
					<S.Icon>
						<FontAwesomeIcon icon={faCalendar} />
					</S.Icon>
				) : (
					<></>
				)}

				{label && inputType !== 'light' ? (
					<S.Label inputType={inputType} labelColor={labelColor}>
						{label} {required && <span> *</span>}
					</S.Label>
				) : (
					<></>
				)}
				<DatePicker
					selected={getValue()}
					locale={ptBR}
					placeholderText={placeholder}
					dateFormat="dd/MM/yyyy"
					onChange={(val: any) => {
						onChange(val);
						onChangeValue ? onChangeValue() : onChangeValue;
					}}
					onFocus={mOnFocus}
					onClickOutside={() => {
						setIsFocused(false);
					}}
					onBlur={() => {
						mOnBlur();
					}}
					disabled={disabled}
					onKeyDown={event => {
						if (event.key === 'Enter') {
							onPressEnter ? onPressEnter() : null;
						}
						// else {
						// 	const v = (event.target as any).value;
						// 	if (v.match(/^\d{2}$/) !== null) {
						// 		setVAv + '/';
						// 	} else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
						// 		setVAv + '/';
						// 	}
						// }
					}}
				/>
				{iconPosition === 'right' ? (
					<>
						<div style={{width: '100%'}}></div>
						<S.Icon>
							<FontAwesomeIcon icon={faCalendar} />
						</S.Icon>
					</>
				) : (
					<></>
				)}
			</S.ContainerInputData>
			<WidthBox margin="0 0 0 10px">
				<Text text={errorMessage} color="red" fontSize="10.5px" fontWeight="bold" />
			</WidthBox>
		</Wrapper>
	);
};

export default InputDate;
