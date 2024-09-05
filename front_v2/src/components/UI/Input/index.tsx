/* eslint-disable @typescript-eslint/no-explicit-any */
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {
	maskCEP,
	maskCNPJ,
	maskCPF,
	maskHours,
	maskMonetary,
	maskPhone,
	maskCPFCNPJ,
	maskPlate,
	maskNoSpace,
} from 'src/helpers/mask';
import maskNumber from 'src/helpers/mask/maskNumber';
import {Text, WidthBox} from '../';
import * as S from './styles';

type Props = {
	value?: string;
	onChange: (value: string) => void;
	onPressEnter?: () => void;
	onBlur?: () => void;
	onFocus?: () => void;
	onChangeValue?: () => void;
	textColor?: string;
	background?: string;
	label?: string;
	labelColor?: string;
	focusLabelColor?: string;
	placeholder?: string;
	border?: string;
	focusBorder?: string;
	inputType?: 'default' | 'undeline' | 'light' | 'minimal';
	mask?:
		| 'Nenhuma'
		| 'Numero'
		| 'CPF'
		| 'CNPJ'
		| 'CPF/CNPJ'
		| 'CEP'
		| 'Telefone'
		| 'Hora'
		| 'Monetario'
		| 'Placa'
		| 'Sem espaço';
	borderRadius?: string;
	leftIcon?: IconProp;
	rightIcon?: IconProp;
	leftIconColor?: string;
	rightIconColor?: string;
	messageError?: string;
	ref?: React.RefObject<any>;
	maxLength?: number;
	required?: boolean;
	leftAttach?: string;
	disabled?: boolean;
	hide?: boolean;
	noShow?: boolean;
	type?: string;
	errorMessage?: string;
};

const Input = ({
	value = '',
	onChange,
	onPressEnter,
	onBlur,
	onFocus,
	onChangeValue,
	textColor,
	background,
	label,
	labelColor,
	focusLabelColor,
	placeholder,
	border,
	focusBorder,
	mask,
	inputType = 'default',
	leftIcon,
	rightIcon,
	leftIconColor,
	rightIconColor,
	ref,
	maxLength,
	required,
	leftAttach,
	disabled,
	hide = false,
	errorMessage,
	type = 'text',
}: Props) => {
	const changeMask = (value: string): string => {
		if (mask === 'Numero') value = maskNumber(value);
		else if (mask === 'CEP') value = maskCEP(value);
		else if (mask === 'CNPJ') value = maskCNPJ(value);
		else if (mask === 'CPF') value = maskCPF(value);
		else if (mask === 'CPF/CNPJ') value = maskCPFCNPJ(value);
		else if (mask === 'Telefone') value = maskPhone(value);
		else if (mask === 'Hora') value = maskHours(value);
		else if (mask === 'Monetario') value = maskMonetary(value);
		else if (mask === 'Placa') value = maskPlate(value);
		else if (mask === 'Sem espaço') value = maskNoSpace(value);

		return value;
	};

	const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value;
		value = changeMask(value);

		if (maxLength !== undefined) {
			value = value.slice(0, maxLength);
		}

		onChange ? onChange(value) : null;
		onChangeValue ? onChangeValue() : null;
	};

	const pressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && onPressEnter) onPressEnter();
	};

	if (hide) return <></>;

	return (
		<S.ContentAll leftAttach={leftAttach}>
			{label && (inputType === 'light' || inputType === 'minimal') ? (
				<S.Label inputType={inputType} labelColor={labelColor} hasLeftIcon={!!leftIcon}>
					{label}
					{required ? '*' : ''}
				</S.Label>
			) : (
				<></>
			)}
			{leftAttach ? (
				<S.LeftAttach background={background} border={border}>
					{leftAttach}
				</S.LeftAttach>
			) : (
				<></>
			)}
			<S.Container
				leftAttach={leftAttach}
				border={border}
				focusBorder={focusBorder}
				inputType={inputType}
				leftIconColor={leftIconColor}
				rightIconColor={rightIconColor}
				background={disabled ? '#eee' : background}>
				{leftIcon ? (
					<div className="icon-left">
						<FontAwesomeIcon icon={leftIcon} />
					</div>
				) : (
					<></>
				)}
				<S.Input
					ref={ref}
					inputType={inputType}
					textColor={textColor}
					required
					type={type}
					value={value}
					onChange={changeValue}
					placeholder={placeholder}
					labelColor={labelColor}
					focusLabelColor={focusLabelColor}
					background={disabled ? '#eee' : background}
					onKeyDown={pressEnter}
					disabled={disabled}
					onBlur={onBlur}
					onFocus={onFocus}
				/>
				{label && inputType !== 'light' && inputType !== 'minimal' ? (
					<S.Label inputType={inputType} labelColor={labelColor} hasLeftIcon={!!leftIcon}>
						{label}
						{required ? ' *' : ''}
					</S.Label>
				) : (
					<></>
				)}
				{rightIcon ? (
					<div className="icon-right">
						<FontAwesomeIcon icon={rightIcon} />
					</div>
				) : (
					<></>
				)}
			</S.Container>
			<WidthBox margin="0 0 0 10px">
				<Text text={errorMessage} color="red" fontSize="10.5px" fontWeight="bold" />
			</WidthBox>
		</S.ContentAll>
	);
};

export default Input;
