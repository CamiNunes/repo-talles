import React, {ReactNode, useState} from 'react';
import {ITemplateMenu} from './models';
import MenuBar from './components/MenuBar';
import TopBar from './components/TopBar';
import * as S from './styles';
import {ROUTER_PATHS} from 'src/router/router.path';
import {v4 as uuidV4} from 'uuid';

type Props = {
	children: ReactNode;
	pageName?: string;
};

const NiftyLayout = ({children, pageName}: Props) => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [showLogout, setShowLogout] = useState(false);

	const templateMenu: ITemplateMenu[] = [
		{
			ref: uuidV4().toString(),
			name: 'Empresa',
			path: '/Sistema',
			type: 'component',
			route: ROUTER_PATHS.SISTEMA_EMPRESA,
			regularName: 'Empresa',
		},

		{
			ref: uuidV4().toString(),
			name: 'Usuario',
			path: '/Seguranca',
			type: 'component',
			route: ROUTER_PATHS.SEGURANCA_USUARIO,
			regularName: 'Usuario',
		},

		{
			ref: uuidV4().toString(),
			name: 'Loja',
			path: '/Sistema',
			type: 'component',
			route: ROUTER_PATHS.SISTEMA_LOJA,
			regularName: 'Loja',
		},

		{
			ref: uuidV4().toString(),
			name: 'Vendedor',
			path: '/Comercial',
			type: 'component',
			route: ROUTER_PATHS.COMERCIAL_VENDEDOR,
			regularName: 'Vendedor',
		},

		{
			ref: uuidV4().toString(),
			name: 'CondicaoPagamento',
			path: '/Sistema',
			type: 'component',
			route: ROUTER_PATHS.SISTEMA_CONDICAOPAGAMENTO,
			regularName: 'CondicaoPagamento',
		},

		{
			ref: uuidV4().toString(),
			name: 'Servico',
			path: '/Sistema',
			type: 'component',
			route: ROUTER_PATHS.SISTEMA_SERVICO,
			regularName: 'Servico',
		},

		{
			ref: uuidV4().toString(),
			name: 'Cliente',
			path: '/Comercial',
			type: 'component',
			route: ROUTER_PATHS.COMERCIAL_CLIENTE,
			regularName: 'Cliente',
		},

		{
			ref: uuidV4().toString(),
			name: 'Oeder de Serviço',
			path: '/Operacional',
			type: 'component',
			route: ROUTER_PATHS.OPERACIONAL_NOTAFISCAL,
			regularName: 'Ordem de Serviço',
		},

		{
			ref: uuidV4().toString(),
			name: 'Sistema',
			path: '',
			type: 'folder',
			regularName: 'Sistema',
		},

		{
			ref: uuidV4().toString(),
			name: 'Seguranca',
			path: '',
			type: 'folder',
			regularName: 'Seguranca',
		},

		{
			ref: uuidV4().toString(),
			name: 'Comercial',
			path: '',
			type: 'folder',
			regularName: 'Comercial',
		},

		{
			ref: uuidV4().toString(),
			name: 'Operacional',
			path: '',
			type: 'folder',
			regularName: 'Operacional',
		},
	];

	return (
		<S.Main>
			<S.BackGround>
				<S.BackGroundTop />
				<S.BackGroundBottom />
			</S.BackGround>
			<S.Container>
				<TopBar isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
				<S.Body>
					<MenuBar isOpen={isOpenMenu} menuData={templateMenu} />
					<S.FormArea isOpen={isOpenMenu}>
						<S.ContentTop>
							<S.Title>{pageName ?? ''}</S.Title>
						</S.ContentTop>
						{children}
					</S.FormArea>
				</S.Body>
			</S.Container>
		</S.Main>
	);
};

export default NiftyLayout;
