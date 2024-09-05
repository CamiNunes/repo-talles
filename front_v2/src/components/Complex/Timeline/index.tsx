/* eslint-disable @typescript-eslint/no-explicit-any */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Wrapper} from 'src/components/UI';
import * as S from './styles';

export type TimelineIconType = {
	icon?: any;
	color?: string;
	status?: string;
	show?: boolean;
};

export type TimelineProps = {
	firstIcon?: TimelineIconType;
	lastIcon?: TimelineIconType;
	dataIcon?: TimelineIconType[];
	data?: any[];
	propStatus?: string;
	orientation?: 'Horizontal' | 'Vertical';
	iconWidth?: string;
	useHeader?: boolean;
	leftContent?: any[];
	subProp?: string;
	subComponentRef?: string;
	dataRef?: any;
	propRef?: string;
	renderLeft?: (item: any) => any;
};

const Timeline = ({
	firstIcon,
	lastIcon,
	dataIcon,
	data,
	propStatus,
	orientation,
	iconWidth,
	useHeader,
	leftContent,
	subProp,
	renderLeft,
}: TimelineProps) => {
	const renderData = (item: any, index: number) => {
		if (useHeader) {
			return item[subProp ?? '']?.map((subItem: any, index: number) =>
				renderItem(getSubItem(subItem), index),
			);
		}

		return renderItem(getSubItem(item), index);
	};

	const renderItem = (finded: TimelineIconType | undefined, index: number) => {
		if (!finded) return <></>;

		return (
			<Wrapper width="auto" gap="0" key={index}>
				<S.Flag color={finded.color ?? '#000'} width={iconWidth}>
					<FontAwesomeIcon icon={finded.icon.icon} color="#fff" />
				</S.Flag>
				<S.FlagLine orientation={orientation ?? 'Horizontal'} />
			</Wrapper>
		);
	};

	const getSubItem = (subItem: any) =>
		dataIcon?.find(
			x => x.status?.toLocaleLowerCase() === subItem[propStatus ?? '']?.toLocaleLowerCase(),
		);

	return (
		<>
			{data?.map((item, index) => (
				<S.Container key={index}>
					{(function () {
						if (useHeader && leftContent)
							return <S.LeftContent>{leftContent}</S.LeftContent>;
						if (useHeader && renderLeft)
							return <S.LeftContent>{renderLeft(item)}</S.LeftContent>;
					})()}

					{firstIcon ? (
						<>
							<S.Flag color={firstIcon.color ?? '#000'} width={iconWidth}>
								<FontAwesomeIcon icon={firstIcon.icon.icon} color="#fff" />
							</S.Flag>
							<S.FlagLine orientation={orientation ?? 'Horizontal'} />
						</>
					) : (
						<></>
					)}
					{renderData(item, index)}
					{lastIcon ? (
						<S.Flag color={lastIcon.color ?? '#000'} width={iconWidth}>
							<FontAwesomeIcon icon={lastIcon.icon.icon} color="#fff" />
						</S.Flag>
					) : (
						<></>
					)}
				</S.Container>
			))}
		</>
	);
};

export default Timeline;
