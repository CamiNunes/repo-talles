import React, {ReactNode} from 'react';
import * as S from './styles';

type Props = {
	children: ReactNode;
	boxWidth?: string;
	height?: string;
	borderRadius?: string;
	background?: string;
	boxShadow?: string;
	padding?: string;
};

const Box = ({children, boxWidth, height, borderRadius, background, boxShadow, padding}: Props) => {
	return (
		<S.Content>
			<S.Container
				width={boxWidth}
				height={height}
				borderRadius={borderRadius}
				background={background}
				boxShadow={boxShadow}
				padding={padding}>
				{children}
			</S.Container>
		</S.Content>
	);
};

export default Box;
