import React from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useTheme} from 'styled-components';
import * as S from './styles';
import Wrapper from '../Wrapper';

type Props = {
	text?: string;
	type?: 'default' | 'ghost' | 'mininum';
	format?: 'default' | 'circle' | 'square' | 'oval';
	borderRadius?: string;
	themeStyle?: 'success' | 'danger' | 'info' | 'alert' | 'black' | 'primary' | 'light';
	textColor?: string;
	background?: string;
	icon?: IconProp;
	leftIcon?: IconProp;
	rightIcon?: IconProp;
	fill?: 'full' | 'auto';
	onClick: () => void;
	disabled?: boolean;
	tooltip?: string;
	leftLineIcon?: string;
	fontWeight?: string;
	leftLineIconColor?: string;
};

const Button = ({
	text,
	icon,
	type = 'default',
	format = 'default',
	themeStyle = 'info',
	borderRadius,
	textColor,
	background,
	leftIcon,
	rightIcon,
	fill,
	onClick,
	disabled = false,
	tooltip,
	leftLineIcon,
	fontWeight,
	leftLineIconColor,
}: Props) => {
	const themeData = useTheme();
	const themeStyleM =
		(textColor && textColor != '') || (background && background != '') ? undefined : themeStyle;

	return (
		<Wrapper width={fill === 'auto' ? 'fit-content' : '100%'}>
			<S.Button
				onClick={disabled ? undefined : onClick}
				typeBtn={type}
				fontWeight={fontWeight}>
				<S.Container
					title={tooltip}
					theme={themeData}
					themeStyle={themeStyleM}
					type={type}
					format={format}
					borderRadius={borderRadius}
					textColor={textColor}
					background={background}
					fill={fill}
					disabled={disabled}
					leftLineIconColor={leftLineIconColor}>
					{leftIcon ? (
						<div className="icon">
							<FontAwesomeIcon icon={leftIcon} />
						</div>
					) : (
						<></>
					)}
					{leftLineIcon ? (
						<div className="icon">
							<i className={leftLineIcon}></i>
						</div>
					) : (
						<></>
					)}
					{icon ? <FontAwesomeIcon icon={icon} /> : text}
					{rightIcon ? (
						<div className="icon">
							<FontAwesomeIcon icon={rightIcon} />
						</div>
					) : (
						<></>
					)}
				</S.Container>
			</S.Button>
		</Wrapper>
	);
};

export default Button;
