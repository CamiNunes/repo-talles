import React, {ReactNode} from 'react';
import * as S from './styles';

type Props = {
	background?: string;
	borderAll?: string;
	borderTop?: string;
	borderDown?: string;
	borderLeft?: string;
	borderRight?: string;
	borderRadius?: string;
	height?: string;
	width?: string;
	margin?: string;
	children?: ReactNode;
	flexDirection?: 'row' | 'column';
	alignItems?: 'center' | 'start' | 'end';
	justifyContent?: 'space-between' | 'flex-start' | 'center' | 'end';
};

const Section = ({
	background,
	borderAll,
	borderTop,
	borderDown,
	borderLeft,
	borderRight,
	borderRadius,
	height,
	width,
	margin,
	children,
	flexDirection = 'row',
	alignItems = 'center',
	justifyContent = 'flex-start',
}: Props) => {
	return (
		<S.Container
			background={background}
			borderAll={borderAll}
			borderTop={borderTop}
			borderDown={borderDown}
			borderLeft={borderLeft}
			borderRight={borderRight}
			borderRadius={borderRadius}
			height={height}
			width={width}
			margin={margin}
			flexDirection={flexDirection}
			alignItems={alignItems}
			justifyContent={justifyContent}>
			{children}
		</S.Container>
	);
};

export default Section;

export const sectionProperties = {
	children: 'ReactNode',
	background: 'color',
	borderAll: 'string',
	borderTop: 'string',
	borderDown: 'string',
	borderLeft: 'string',
	borderRight: 'string',
	borderRadius: 'string',
	height: 'string',
	width: 'string',
	flexDirection: 'row,column',
	alignItems: 'center,start,end',
	justifyContent: 'space-between,start,center,end',
};
