import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ReactNode, useState} from 'react';
import Wrapper from '../Wrapper';
import * as S from './styles';

type Props = {
	children: ReactNode;
	startOpen?: boolean;
	text?: string;
	leftIcon?: IconProp;
	leftIconColor?: string;
	leftIconSize?: string;
	headerPadding?: string;
	headerTextColor?: string;
	headerBackground?: string;
	bodyPadding?: string;
	bodyBackground?: string;
	border?: string;
	borderRadius?: string;
};

const Collapse = ({
	children,
	startOpen = false,
	text,
	leftIcon,
	leftIconColor,
	leftIconSize,
	headerPadding,
	headerTextColor,
	headerBackground,
	bodyPadding,
	bodyBackground,
	border,
	borderRadius,
}: Props) => {
	const [isOpen, setIsOpen] = useState(startOpen);

	return (
		<S.Container border={border} borderRadius={borderRadius}>
			<S.Header
				textColor={headerTextColor}
				padding={headerPadding}
				background={headerBackground}>
				<Wrapper>
					{leftIcon ? (
						<S.Icon color={leftIconColor} size={leftIconSize}>
							<FontAwesomeIcon icon={leftIcon} />
						</S.Icon>
					) : (
						<></>
					)}

					{text ?? ''}
				</Wrapper>
				<S.CollapseIcon>
					<FontAwesomeIcon
						icon={isOpen ? faChevronUp : faChevronDown}
						onClick={() => setIsOpen(!isOpen)}
					/>
				</S.CollapseIcon>
			</S.Header>
			{isOpen ? (
				<S.Body padding={bodyPadding} background={bodyBackground}>
					{children}
				</S.Body>
			) : (
				<></>
			)}
		</S.Container>
	);
};

export default Collapse;
