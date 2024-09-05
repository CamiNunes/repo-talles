import React from 'react';
import {ReactNode} from 'react';
import * as S from './styles';

type Props = {
	children?: ReactNode;
	flexDirection?: 'row' | 'column';
	alignItems?: 'center' | 'start' | 'end';
	justifyContent?: 'space-between' | 'flex-start' | 'center' | 'end';
	margin?: string;
	gap?: string;
	width?: string;
};

const Wrapper = ({
	children,
	flexDirection = 'row',
	alignItems = 'center',
	justifyContent = 'flex-start',
	margin = '0',
	gap = '16px',
	width = '100%',
}: Props) => {
	return (
		<S.Wrapper
			flexDirection={flexDirection}
			alignItems={alignItems}
			justifyContent={justifyContent}
			margin={margin}
			gap={gap}
			width={width}>
			{children}
		</S.Wrapper>
	);
};

export default Wrapper;
