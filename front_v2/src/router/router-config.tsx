import React from 'react';
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import {ROUTER_PATHS} from './router.path';
import SistemaEmpresa from 'src/modules/Sistema/Empresa';
import SegurancaUsuario from 'src/modules/Seguranca/Usuario';
import SistemaLoja from 'src/modules/Sistema/Loja';
import ComercialVendedor from 'src/modules/Comercial/Vendedor';
import SistemaCondicaoPagamento from 'src/modules/Sistema/CondicaoPagamento';
import SistemaServico from 'src/modules/Sistema/Servico';
import ComercialCliente from 'src/modules/Comercial/Cliente';
import OperacionalNotaFiscal from 'src/modules/Operacional/NotaFiscal';

export const RouterConfig = () => {
	const location = useLocation();

	return (
		<Routes location={location} key={location.pathname}>
			<Route path={ROUTER_PATHS.SISTEMA_EMPRESA} element={<SistemaEmpresa />}></Route>
			<Route path={ROUTER_PATHS.SEGURANCA_USUARIO} element={<SegurancaUsuario />}></Route>
			<Route path={ROUTER_PATHS.SISTEMA_LOJA} element={<SistemaLoja />}></Route>
			<Route path={ROUTER_PATHS.COMERCIAL_VENDEDOR} element={<ComercialVendedor />}></Route>
			<Route
				path={ROUTER_PATHS.SISTEMA_CONDICAOPAGAMENTO}
				element={<SistemaCondicaoPagamento />}></Route>
			<Route path={ROUTER_PATHS.SISTEMA_SERVICO} element={<SistemaServico />}></Route>
			<Route path={ROUTER_PATHS.COMERCIAL_CLIENTE} element={<ComercialCliente />}></Route>
			<Route
				path={ROUTER_PATHS.OPERACIONAL_NOTAFISCAL}
				element={<OperacionalNotaFiscal />}></Route>
		</Routes>
	);
};
