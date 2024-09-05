/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {ReactNode, useEffect, useState} from 'react';
import * as S from './styles';

export interface ITabConfig {
	active?: boolean;
	ref?: string;
	name: string;
	children: ReactNode;
}

type Props = {
	tabs: ITabConfig[];
	type?: 'default' | 'inline';
	background?: string;
	headerTextColor?: string;
	unselectColor?: string;
	bodyBorderRadius?: string;
	currentIndex?: number;
	setCurrentIndex?: (value: number) => void;
};

const Tab = ({
	tabs,
	type = 'default',
	background,
	headerTextColor,
	unselectColor,
	bodyBorderRadius,
	currentIndex,
	setCurrentIndex,
}: Props) => {
	const [mTabs, setMTabs] = useState<ITabConfig[]>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		setMTabs(tabs);
	}, [tabs]);

	useEffect(() => {
		tabs = tabs.map((x, index) => {
			if (index === (currentIndex != undefined ? currentIndex : activeIndex)) x.active = true;
			else x.active = false;
			return x;
		});
	}, [activeIndex, currentIndex]);

	return (
		<>
			<S.Container type={type}>
				{mTabs.map((tab, index) => (
					<S.TabItem
						key={index}
						active={index === (currentIndex != undefined ? currentIndex : activeIndex)}
						type={type}
						onClick={() =>
							currentIndex != undefined && setCurrentIndex
								? setCurrentIndex(index)
								: setActiveIndex(index)
						}
						background={background}
						headerTextColor={headerTextColor}
						unselectColor={unselectColor}>
						{tab.name}
					</S.TabItem>
				))}
			</S.Container>
			<S.Body type={type} background={background} bodyBorderRadius={bodyBorderRadius}>
				{mTabs
					?.filter(
						(x, index) =>
							index === (currentIndex != undefined ? currentIndex : activeIndex),
					)
					?.map((item, index) => (
						<div key={index}>{item.children}</div>
					))}
			</S.Body>
		</>
	);
};

export default Tab;
