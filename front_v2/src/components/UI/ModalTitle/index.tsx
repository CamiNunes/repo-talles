import React from 'react';
import * as S from './styles';

type Props = {
	children: string;
	color?: string;
};

const ModalTitle = ({children, color}: Props) => {
	return <S.Title color={color}>{children}</S.Title>;
};

export default ModalTitle;
