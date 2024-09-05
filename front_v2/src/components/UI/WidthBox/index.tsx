import React, {ReactNode} from 'react';
import * as S from './styles';

type Props = {
	children: ReactNode;
	width?: string;
	margin?: string;
};

const WidthBox = ({children, width = '100%', margin = '0'}: Props) => {
	return (
		<S.WidthBox width={width} margin={margin}>
			{children}
		</S.WidthBox>
	);
};

export default WidthBox;
