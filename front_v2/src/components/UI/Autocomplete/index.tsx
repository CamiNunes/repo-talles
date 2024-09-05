/* eslint-disable @typescript-eslint/no-explicit-any */
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import React, {useEffect, useRef, useState} from 'react';
import Input from '../Input';
import * as S from './styles';

type Props = {
	value?: string;
	onChange: (value: any, customLabel: string) => void;
	textColor?: string;
	background?: string;
	label?: string;
	labelColor?: string;
	focusLabelColor?: string;
	placeholder?: string;
	border?: string;
	focusBorder?: string;
	inputType?: 'default' | 'undeline' | 'light';
	borderRadius?: string;
	maxLength?: number;
	leftIcon?: IconProp;
	rightIcon?: IconProp;
	leftIconColor?: string;
	rightIconColor?: string;
	options?: any[];
	errorMessage?: string;
	disabled?: boolean;
	hide?: boolean;
	finderFunction?: () => Promise<any[]>;
	required?: boolean;
	valueChanged?: any;
	onPressEnter?: () => void;
	onBlur?: () => void;
	onFocus?: () => void;
	onChangeValue?: () => void;
};

const Autocomplete = ({
	value = '',
	onChange,
	textColor,
	background,
	label,
	labelColor,
	focusLabelColor,
	placeholder,
	border,
	focusBorder,
	inputType = 'default',
	maxLength,
	leftIcon,
	rightIcon,
	leftIconColor,
	rightIconColor,
	options,
	errorMessage,
	finderFunction,
	hide,
	disabled,
	required,
	valueChanged,
	onPressEnter,
	onBlur,
	onFocus,
	onChangeValue,
}: Props) => {
	const currentRef = useRef<any>(null);
	const [isClose, setIsClose] = useState(false);
	const [mOption, setMOption] = useState<any[]>([]);
	const [mValue, setMValue] = useState<any>();

	useEffect(() => {
		window.document.body.addEventListener('click', e => {
			setIsClose(true);
			e.stopPropagation();
			return false;
		});
	}, []);

	useEffect(() => {
		findValues();
	}, [hide, disabled, valueChanged]);

	useEffect(() => {
		setIsClose(false);
	}, [mValue]);

	useEffect(() => {
		setIsClose(true);
		if (!value) setMValue('');
		setMValue(
			(options && options.length > 0 ? options : mOption ?? []).find(x => x.id == value)
				?.label ?? '',
		);
		setTimeout(() => {
			setIsClose(true);
		}, 50);
	}, [value]);

	const findValues = async () => {
		if (!finderFunction) return;

		const result = await finderFunction();
		const resultData: any = [];
		result?.forEach(item => {
			const keys = Reflect.ownKeys(item);
			const dataOption: any = {};

			keys.forEach(key => {
				if (typeof item[key] === 'number') dataOption.id = item[key];
				else if (typeof item[key] === 'string') dataOption.label = item[key];
			});

			resultData.push(dataOption);
		});

		setMOption(resultData);
	};

	const onSelectItem = (selectItem: any, itemLabel: string) => {
		const internalValue = selectItem[Object.keys(selectItem)[0]];
		onChange(internalValue, itemLabel);
		setMValue(itemLabel);
		setTimeout(() => {
			setIsClose(true);
		}, 50);
		setTimeout(() => {
			currentRef.current?.focus();
			currentRef.current?.select();
		}, 200);
	};

	const mOnFocus = () => {
		setTimeout(() => {
			setIsClose(false);
		}, 200);
		if (onFocus) onFocus();
	};

	if (hide) return <></>;

	return (
		<S.Content>
			<Input
				ref={currentRef}
				value={mValue}
				onChange={val => {
					setMValue(val);
					onChangeValue ? onChangeValue() : null;
				}}
				textColor={textColor}
				background={background}
				label={label}
				labelColor={labelColor}
				focusLabelColor={focusLabelColor}
				placeholder={placeholder}
				border={border}
				focusBorder={focusBorder}
				inputType={inputType}
				maxLength={maxLength}
				leftIcon={leftIcon}
				rightIcon={rightIcon}
				leftIconColor={leftIconColor}
				rightIconColor={rightIconColor}
				errorMessage={errorMessage}
				disabled={disabled}
				required={required}
				onBlur={onBlur}
				onFocus={mOnFocus}
				onPressEnter={onPressEnter}
			/>
			{!isClose && ((options && options.length > 0) || (mOption && mOption.length > 0)) ? (
				<S.OptionContainer>
					{(options && options.length > 0 ? options : mOption ?? [])
						.filter(x =>
							mValue ? x.label?.toLowerCase().includes(mValue.toLowerCase()) : true,
						)
						.map((item, index) => (
							<S.Options key={index} onClick={() => onSelectItem(item, item.label)}>
								{item.label}
							</S.Options>
						))}
				</S.OptionContainer>
			) : (
				<></>
			)}
		</S.Content>
	);
};

export default Autocomplete;
