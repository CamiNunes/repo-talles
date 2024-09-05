import React from 'react';
import * as S from './styles';

type Props = {
	height?: string;
	lineWidth?: string;
	borderRadius?: string;
	background?: string;
};

const Line = ({height, lineWidth, borderRadius, background}: Props) => {
	return (
		<>
			<S.Container
				height={height}
				width={lineWidth}
				borderRadius={borderRadius}
				background={background}
			/>
		</>
	);
};

export default Line;
