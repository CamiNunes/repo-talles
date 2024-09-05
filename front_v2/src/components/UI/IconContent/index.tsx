import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import * as S from './styles';

type Props = {
	icon?: IconProp;
	size?: string;
	color?: string;
};

const IconContent = ({icon = faCheck, size, color}: Props) => {
	return (
		<S.Content size={size} color={color}>
			<FontAwesomeIcon icon={icon} />
		</S.Content>
	);
};

export default IconContent;

export const iconContentProperties = {
	name: 'string',
	icon: 'icon',
	color: 'color',
	size: 'string',
};
