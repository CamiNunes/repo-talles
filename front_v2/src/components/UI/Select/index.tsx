/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import * as S from './styles';
import {WidthBox, Text} from '../';

export interface IOption {
	value: any;
	label: any;
}

type Props = {
	options: IOption[];
	value?: any;
	onChange: (value: any) => void;
	placeholder?: string;
	label?: string;
	background?: string;
	border?: string;
	textColor?: string;
	inputType?: 'none' | 'default' | 'underline' | 'light' | 'minimal';
	labelColor?: string;
	errorMessage?: string;
	onPressEnter?: () => void;
	disabled?: boolean;
	hide?: boolean;
	finderFunction?: () => Promise<any[]>;
	required?: boolean;
	valueChanged?: any;
	onBlur?: () => void;
	onFocus?: () => void;
	onChangeValue?: () => void;
};

const SelectComponent = ({
	options,
	value,
	onChange,
	placeholder,
	label,
	background,
	border,
	textColor,
	inputType = 'default',
	disabled,
	labelColor,
	errorMessage,
	onPressEnter,
	hide,
	finderFunction,
	required,
	valueChanged,
	onBlur,
	onFocus,
	onChangeValue,
}: Props) => {
	const [mOption, setMOption] = useState<any[]>([]);

	useEffect(() => {
		findValues();
	}, [hide, disabled, valueChanged]);

	const getBorder = () => {
		if (inputType === 'none' || !border || border === '') {
			if (inputType === 'default') return '1px solid #000';
			if (inputType === 'underline') return '1px solid #000';
			if (inputType === 'light') return '1px solid #00000020';
			if (inputType == 'minimal') return '1px solid #00000020';
		} else {
			return border;
		}
	};

	const getBorderRadius = () => {
		if (inputType === 'default') return '4px';
		if (inputType === 'underline') return '0px';
		if (inputType === 'light') return '7px';
		if (inputType == 'minimal') return '2px';
		return '4px';
	};

	const getFontSize = () => {
		if (inputType == 'minimal') return '12px';
		return '14px';
	};

	const getHeight = () => {
		if (inputType == 'minimal') return '26px';
		return '38px';
	};

	const getIconPadding = () => {
		if (inputType == 'minimal') return '2px';
		return '8px';
	};

	const pressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && onPressEnter) onPressEnter();
	};

	const findValues = async () => {
		if (!finderFunction) return;

		const result = await finderFunction();
		const resultData: any = [
			{
				value: undefined,
				label: 'Selecione...',
			},
		];
		result?.forEach(item => {
			const keys = Reflect.ownKeys(item);
			const dataOption: any = {};
			keys.forEach(key => {
				if (typeof item[key] === 'number') dataOption.value = item[key];
				else if (typeof item[key] === 'string') dataOption.label = item[key];
			});

			resultData.push(dataOption);
		});

		setMOption(resultData);
		if (!value) onChange(resultData[0]);
	};

	const mBackground = background && background != '' ? background : '#fff';
	const mBorder = getBorder();
	const mTextColor = textColor && textColor != '' ? textColor : 'black';
	const mBorderRadius = getBorderRadius();
	const mFontSize = getFontSize();
	const mHeight = getHeight();
	const mIconPadding = getIconPadding();

	const addCustom =
		inputType === 'minimal'
			? {
					indicatorSeparator: (styles: any) => ({
						...styles,
						marginTop: '0px',
						marginBottom: '0px',
					}),
					valueContainer: (styles: any) => ({
						...styles,
						height: '25px',
					}),
					input: (styles: any) => ({
						...styles,
						margin: '0px',
						padding: '0px',
					}),
			  }
			: {};

	const customStyles = {
		control: (styles: any) => ({
			...styles,
			background: disabled ? '#ddd' : mBackground,
			border: inputType !== 'underline' ? mBorder : 'none',
			borderBottom: mBorder,
			width: '100.1%',
			borderRadius: mBorderRadius,
			height: mHeight,
			minHeight: mHeight,
		}),
		option: (styles: any) => ({...styles, color: 'black', fontSize: mFontSize}),
		menu: (styles: any) => ({...styles, zIndex: 9999999}),
		singleValue: (styles: any) => ({
			...styles,
			color: mTextColor,
			fontSize: mFontSize,
			marginLeft: '4px',
			width: '100%',
		}),
		menuPortal: (styles: any) => ({
			...styles,
			zIndex: 9999999,
		}),
		dropdownIndicator: (styles: any) => ({
			...styles,
			padding: mIconPadding,
		}),
		...addCustom,
	};

	const getOptions = () => (mOption && mOption.length > 0 ? mOption : options);
	const getValue = () => {
		if (typeof value === 'object') return value;
		const val = getOptions()?.find(x => x.value == value) ?? {
			value: undefined,
			label: 'Selecione...',
		};

		return val;
	};

	if (hide) return <></>;

	return (
		<div style={{width: '100%'}}>
			{label && (inputType === 'light' || inputType === 'minimal') ? (
				<S.Label inputType={inputType} labelColor={labelColor} hasLeftIcon={false}>
					{label} {required ? '*' : ''}
				</S.Label>
			) : (
				<></>
			)}
			<Select
				value={getValue()}
				options={getOptions()}
				onChange={(val: any) => {
					onChange(val);
					onChangeValue ? onChangeValue() : null;
				}}
				styles={customStyles}
				placeholder={placeholder}
				menuPortalTarget={document.body}
				isDisabled={disabled}
				onKeyDown={pressEnter}
				onBlur={onBlur}
				onFocus={onFocus}
			/>
			<WidthBox margin="0 0 0 10px">
				<Text text={errorMessage} color="red" fontSize="10.5px" fontWeight="bold" />
			</WidthBox>
		</div>
	);
};

export default SelectComponent;
