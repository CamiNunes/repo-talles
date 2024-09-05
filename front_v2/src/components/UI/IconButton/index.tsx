/* eslint-disable @typescript-eslint/no-explicit-any */
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import * as S from './styles';

export type IconButtonType = {
	icon?: IconProp;
	iconSize?: string;
	color?: string;
	size?: string;
	ref?: string;
	showGetColor?: boolean;
	onClick?: (item: any, index: number) => void;
	title?: string;
};

type Props = {
	icon?: IconProp;
	iconSize?: string;
	color?: string;
	size?: string;
	useBorder?: boolean;
	onClick?: (item: any) => void;
	title?: string;
};

const IconButton = ({icon = faAdd, iconSize, color, size, useBorder, onClick, title}: Props) => {
	return (
		<S.Button
			title={title}
			color={color}
			size={size}
			iconSize={iconSize}
			useBorder={useBorder}
			onClick={onClick}>
			<FontAwesomeIcon icon={icon} />
		</S.Button>
	);
};

export default IconButton;
