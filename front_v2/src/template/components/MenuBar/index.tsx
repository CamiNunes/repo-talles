import {faHome, faChevronRight, faLockOpen, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {ITemplateMenu} from 'src/template/models';
import * as S from './styles';
import {useNavigate} from 'react-router-dom';
import {Modal} from 'src/components/Complex';
import {Button, ModalTitle, Wrapper} from 'src/components/UI';

type Props = {
	isOpen: boolean;
	menuData: ITemplateMenu[];
};

const MenuBar = ({isOpen, menuData}: Props) => {
	const navigate = useNavigate();
	const [menuItens, setMenuItens] = useState<ITemplateMenu[]>([]);
	const [showLogout, setShowLogout] = useState(false);

	useEffect(() => {
		setMenuItens(menuData);
	}, [menuData]);

	const openMenu = (item: ITemplateMenu) => {
		const newData = [...menuItens].map(x => {
			if (x.ref == item.ref && item.type == 'folder') x.isOpen = !x.isOpen;
			return x;
		});

		setMenuItens(newData);
	};
	const getSubItens = (item: ITemplateMenu, itens: ITemplateMenu[]): ITemplateMenu[] => {
		const listItens: ITemplateMenu[] = [];
		itens.forEach(x => {
			if (x.path) {
				const folderOrigin =
					item.path && item.path != ''
						? `${item.path.substring(1)}/${item.regularName}`
						: `${item.path}${item.regularName}`;
				const dest = x.path.substring(1);
				if (folderOrigin === dest) listItens.push(x);
			}
		});
		return listItens;
	};

	const renderSubMenus = (item: ITemplateMenu, index: number, subItens: ITemplateMenu[]) => {
		return (
			<div key={index}>
				<S.SubItemContent
					onClick={() =>
						item.type === 'folder' ? openMenu(item) : navigate(item.route ?? '')
					}>
					<S.SubItem>{item.name ?? ''}</S.SubItem>
					<S.Arrow>
						{(function () {
							if (item.type === 'folder')
								return (
									<FontAwesomeIcon
										icon={item.isOpen ? faChevronDown : faChevronRight}
									/>
								);
						})()}
					</S.Arrow>
				</S.SubItemContent>
				{isOpen && item.isOpen ? (
					subItens.map((subItem, indexSub) =>
						renderSubMenus(subItem, indexSub, getSubItens(subItem, menuItens)),
					)
				) : (
					<></>
				)}
			</div>
		);
	};

	const renderMenus = (item: ITemplateMenu, index: number, subItens: ITemplateMenu[]) => {
		return (
			<div key={index}>
				<S.ItemContent
					key={index}
					onClick={() =>
						item.type === 'folder' ? openMenu(item) : navigate(item.route ?? '')
					}>
					<S.Icon isOpen={isOpen}>
						<FontAwesomeIcon icon={faHome} />
					</S.Icon>
					{(function () {
						if (isOpen) {
							return (
								<>
									<S.Item>{item.name}</S.Item>
									<S.Arrow>
										{(function () {
											if (item.type === 'folder')
												return (
													<FontAwesomeIcon
														icon={
															item.isOpen
																? faChevronDown
																: faChevronRight
														}
													/>
												);
										})()}
									</S.Arrow>
								</>
							);
						}
					})()}
				</S.ItemContent>
				{isOpen && item.isOpen ? (
					subItens.map((subItem, indexSub) =>
						renderSubMenus(subItem, indexSub, getSubItens(subItem, menuItens)),
					)
				) : (
					<></>
				)}
			</div>
		);
	};

	const logoutModal = () => {
		return (
			<Modal isOpen={showLogout} onClose={() => setShowLogout(false)} width="22%">
				<>
					<ModalTitle color="black">Logout</ModalTitle>
					<Wrapper margin="0 10px">Deseja fazer o logout?</Wrapper>
					<Wrapper margin="20px 0 0 0" justifyContent="end">
						<Button
							onClick={() => setShowLogout(false)}
							text="Não"
							fill="auto"
							themeStyle="danger"
						/>
						<Button
							onClick={() => {
								localStorage.setItem('jwt_token', '');
								navigate('/');
							}}
							text="Sim"
							fill="auto"
						/>
					</Wrapper>
				</>
			</Modal>
		);
	};

	return (
		<>
			{logoutModal()}
			<S.Container isOpen={isOpen}>
				<S.ContainerMenu>
					{menuItens
						.filter(x => x.path == '')
						.map((item, index) =>
							renderMenus(item, index, getSubItens(item, menuItens)),
						)}
				</S.ContainerMenu>

				<S.ContainerMenuLogout>
					<S.ItemContentLogout onClick={() => setShowLogout(true)}>
						<S.Icon isOpen={isOpen}>
							<FontAwesomeIcon icon={faLockOpen} />
						</S.Icon>
						{(function () {
							if (isOpen) {
								return (
									<>
										<S.Item>Logout</S.Item>
										<S.Arrow>
											<FontAwesomeIcon icon={faChevronRight} />
										</S.Arrow>
									</>
								);
							}
						})()}
					</S.ItemContentLogout>
				</S.ContainerMenuLogout>
			</S.Container>
		</>
	);
};

export default MenuBar;
