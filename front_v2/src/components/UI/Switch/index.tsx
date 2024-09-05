import React from 'react';
import * as S from './styles';
import {v4 as uuiV4} from 'uuid';

type Props = {
	isOn?: boolean;
	handleToggle: () => void;
	text?: string;
	textColor?: string;
	disabled?: boolean;
	hide?: boolean;
	textPosition?: 'top' | 'left' | 'right';
	onBlur?: () => void;
	onFocus?: () => void;
	onChangeValue?: () => void;
	errorMessage?: string;
	required?: boolean;
};

const Switch = ({
	isOn,
	handleToggle,
	text = '',
	disabled = false,
	textColor,
	hide,
	textPosition = 'top',
	onBlur,
	onFocus,
	onChangeValue,
	required,
}: Props) => {
	const id = uuiV4();

	if (hide) return <></>;

	return (
		<S.ContentSwitch>
			{text && text != '' && textPosition === 'top' ? (
				<S.Label textColor={textColor}>{text}</S.Label>
			) : (
				<></>
			)}
			<S.Content>
				{text && text != '' && textPosition === 'left' ? (
					<S.Label textColor={textColor}>{text}</S.Label>
				) : (
					<></>
				)}

				<S.CheckBoxWrapper>
					<S.CheckBox
						disabled={disabled}
						checked={isOn ?? false}
						onChange={
							disabled
								? undefined
								: () => {
										handleToggle();
										onChangeValue ? onChangeValue : null;
								  }
						}
						id={id}
						type="checkbox"
						onBlur={onBlur}
						onFocus={onFocus}
					/>
					<S.CheckBoxLabel htmlFor={id} />
				</S.CheckBoxWrapper>

				{text && text != '' && textPosition === 'right' ? (
					<S.Label textColor={textColor}>
						{text}
						{required ? '*' : ''}
					</S.Label>
				) : (
					<></>
				)}
			</S.Content>
		</S.ContentSwitch>
	);
};

export default Switch;
