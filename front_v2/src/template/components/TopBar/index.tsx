import React from 'react';
import * as S from './styles';
import logoImage from '../../../img/GrafSystem.png';

type Props = {
	isOpenMenu: boolean;
	setIsOpenMenu: (val: boolean) => void;
};

const TopBar = ({isOpenMenu, setIsOpenMenu}: Props) => {
	return (
		<S.Container>
			<S.Logo isOpen={isOpenMenu}>
				<img src={logoImage} alt="Logo" />
			</S.Logo>
			<S.MenuAction isOpen={isOpenMenu}>
				<S.MenuActionBtn onClick={() => setIsOpenMenu(!isOpenMenu)}>
					<i className="fa fa-bars"></i>
				</S.MenuActionBtn>
			</S.MenuAction>
			<S.IconsContent>
				<S.MenuActionBtn>
					<i className="fa fa-bars"></i>
				</S.MenuActionBtn>
				<S.MenuActionBtn>
					<i className="fa fa-bell"></i>
				</S.MenuActionBtn>
				<S.MenuActionBtn>
					<i className="fa fa-user"></i>
				</S.MenuActionBtn>
				<S.MenuActionBtn>
					<i className="fa fa-ellipsis-vertical"></i>
				</S.MenuActionBtn>
			</S.IconsContent>
		</S.Container>
	);
};

export default TopBar;
