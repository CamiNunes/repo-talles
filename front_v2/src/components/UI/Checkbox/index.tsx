import React from 'react';
import {ReactSVG} from 'react-svg';
import Wrapper from '../Wrapper';
import * as S from './styles';

type Props = {
	checked: boolean;
	handleToggle: () => void;
	useCheckDash?: boolean;
	text?: string;
	inputType?: 'default' | 'undeline' | 'light';
	textColor?: string;
	fontWeight?: string;
	fontSize?: string;
	disabled?: boolean;
	hide?: boolean;
	onBlur?: () => void;
	onFocus?: () => void;
	onChangeValue?: () => void;
};

const Checkbox = ({
	checked,
	handleToggle,
	useCheckDash = false,
	text,
	disabled = false,
	inputType = 'default',
	textColor,
	fontWeight,
	fontSize,
	hide,
	onBlur,
	onFocus,
	onChangeValue,
}: Props) => {
	if (hide) return <></>;

	return (
		<Wrapper flexDirection="column" alignItems="start" gap="0">
			{inputType === 'light' && text && text != '' ? (
				<S.Text inputType={inputType}>{text}</S.Text>
			) : (
				<></>
			)}
			<S.CheckboxContainer
				onClick={
					disabled
						? undefined
						: () => {
								handleToggle();
								onChangeValue ? onChangeValue() : null;
						  }
				}
				inputType={inputType}
				onFocus={onFocus}
				onBlur={onBlur}>
				<S.ContentIcon>
					{checked ? (
						useCheckDash ? (
							<ReactSVG src="/icons/check-dash.svg" />
						) : (
							<ReactSVG src="/icons/check-select.svg" />
						)
					) : (
						<ReactSVG src="/icons/check-unselect.svg" />
					)}
				</S.ContentIcon>
				{inputType != 'light' && text && text != '' ? (
					<S.Text
						inputType={inputType}
						textColor={textColor}
						fontWeight={fontWeight}
						fontSize={fontSize}>
						{text}
					</S.Text>
				) : (
					<></>
				)}
			</S.CheckboxContainer>
		</Wrapper>
	);
};

export default Checkbox;
