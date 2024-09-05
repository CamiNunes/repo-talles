import styled, {css} from 'styled-components';
import {shade} from 'polished';

export const Container = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	color: white;
	align-items: center;
`;

type LogoProps = {isOpen: boolean};

export const Logo = styled.div<LogoProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;

	${({isOpen}) =>
		css`
			width: ${isOpen ? '200px' : '70px'};
			transition: 0.1s;
		`}

	img {
		height: 80px; /* Define a altura da imagem */
		width: auto; /* A largura será ajustada automaticamente para manter a proporção */
		max-width: 100%;
	}
`;

type MenuActionProps = {isOpen: boolean};

export const MenuAction = styled.div<MenuActionProps>`
	${({isOpen}) =>
		css`
			width: ${isOpen ? 'calc(85% - 200px)' : 'calc(85% - 70px)'};
			transition: 0.1s;
		`}
`;

export const IconsContent = styled.div`
	width: calc(15%);
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

export const MenuActionBtn = styled.div`
	border-radius: 10px;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		background-color: ${shade(0.3, '#f6f0f0')};
		cursor: pointer;
	}
	&:active {
		background-color: ${shade(0.5, '#f6f0f0')};
	}

	i {
		color: #ec4401; /* Cor padrão do ícone */
		font-size: 18px; /* Ajusta o tamanho do ícone */
	}

	&:hover i {
		color: #ec4401; /* Cor do ícone ao passar o mouse */
	}

	&:active i {
		color: #ec4401; /* Cor do ícone ao clicar */
	}
`;
