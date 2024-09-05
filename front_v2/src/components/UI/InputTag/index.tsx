/* eslint-disable @typescript-eslint/no-explicit-any */
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import Wrapper from '../Wrapper';
import * as S from './styles';
import Select from '../Select';

type Props = {
	values?: string[];
	onChange: (values: string[]) => void;
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
	tagBorderRadius?: string;
	tagBackgroundColor?: string;
	tagColor?: string;
	options?: any[];
	disabled?: boolean;
	hide?: boolean;
	onPressEnter?: () => void;
	onBlur?: () => void;
	onFocus?: () => void;
	onChangeValue?: () => void;
};

const InputTag = ({
	values = [],
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
	tagBorderRadius,
	tagBackgroundColor,
	tagColor,
	disabled,
	options,
	hide,
	onPressEnter,
	onBlur,
	onFocus,
	onChangeValue,
}: Props) => {
	const [inputValue, setInputValue] = useState('');

	const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			mOnPressEnter();
		}
	};

	const mOnPressEnter = () => {
		let value = inputValue;
		if (
			values.map(x => x.toLocaleLowerCase()).includes(value.toLocaleLowerCase()) ||
			value === ''
		)
			return;

		if (maxLength !== undefined) value = value.slice(0, maxLength);

		const newValues = [...values];
		newValues.push(value);
		onChange ? onChange(newValues) : null;
		setInputValue('');
		onPressEnter ? onPressEnter() : null;
	};

	const removeItem = (text: string) => {
		const newValues = values.filter(val => val != text);
		onChange(newValues);
	};

	if (hide) return <></>;

	return (
		<S.ContentAll>
			{label && inputType === 'light' ? (
				<S.Label inputType={inputType} labelColor={labelColor} hasLeftIcon={!!leftIcon}>
					{label}
				</S.Label>
			) : (
				<></>
			)}
			<S.Container
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
				<Wrapper width="100%">
					{options && options.length > 0 ? (
						<Select
							value={options.find(x => x.value === inputValue)}
							options={options}
							onChange={val => setInputValue(val.value)}
							background="transparent"
							border="none"
							onPressEnter={() => {
								mOnPressEnter();
								setInputValue('');
							}}
						/>
					) : (
						<S.Input
							inputType={inputType}
							required
							type="text"
							value={inputValue}
							placeholder={placeholder}
							labelColor={labelColor}
							focusLabelColor={focusLabelColor}
							onChange={e => {
								setInputValue(e.target.value);
								onChangeValue ? onChangeValue() : onChangeValue;
							}}
							onKeyDown={keyDown}
							textColor={textColor}
							background={disabled ? '#eee' : background}
							disabled={disabled}
							onBlur={onBlur}
							onFocus={onFocus}
						/>
					)}

					{label && inputType !== 'light' ? (
						<S.Label
							inputType={inputType}
							labelColor={labelColor}
							hasLeftIcon={!!leftIcon}>
							{label}
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
				</Wrapper>
				{(function () {
					if (values && values.length > 0) {
						return (
							<S.ContentTag>
								{values?.map((item, index) => (
									<S.Tag
										key={index}
										color={tagColor}
										background={tagBackgroundColor}
										borderRadius={tagBorderRadius}>
										{item}
										<div className="icon" onClick={() => removeItem(item)}>
											<FontAwesomeIcon icon={faClose} />
										</div>
									</S.Tag>
								))}
							</S.ContentTag>
						);
					}
				})()}
			</S.Container>
		</S.ContentAll>
	);
};

export default InputTag;
