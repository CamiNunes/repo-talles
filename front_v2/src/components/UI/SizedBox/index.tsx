import React from 'react';
import * as S from './styles';

type Props = {
	height: string;
};

const SizedBox = ({height}: Props) => {
	return <S.Size height={height}></S.Size>;
};

export default SizedBox;

export const sizedBoxProperties = {
	height: 'string',
};
