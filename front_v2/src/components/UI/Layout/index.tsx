import React, {ReactNode} from 'react';
import * as S from './styles';

export type Props = {
	children: ReactNode;
	onClick?: () => void;
};

const Layout = ({children, onClick}: Props) => {
	return <S.Container onClick={onClick}>{children}</S.Container>;
};

export default Layout;
