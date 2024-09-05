import React from 'react';
import {Text} from '../../UI';

type Props = {
	text?: string;
	fontSize?: string;
	color?: string;
	fontWeight?: string;
	margin?: string;
	dataRef?: string;
	propRef?: string;
};

const LabelValue = ({text, fontSize, color, fontWeight, margin}: Props) => {
	return (
		<>
			<Text
				text={text ?? 'LabelValue'}
				fontSize={fontSize}
				color={color}
				fontWeight={fontWeight}
				margin={margin}
			/>
		</>
	);
};

export default LabelValue;
