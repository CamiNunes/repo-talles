import React from 'react';
import * as S from './styles';

type Props = {
	text?: string;
	fontSize?: string;
	color?: string;
	fontWeight?: string;
	margin?: string;
};

const Text = ({
	text,
	fontSize = '14px',
	color = '#000',
	fontWeight = 'normal',
	margin = '0',
}: Props) => {
	return (
		<S.Text fontSize={fontSize} color={color} fontWeight={fontWeight} margin={margin}>
			{text && text != '' ? text : ''}
		</S.Text>
	);
};

export default Text;
