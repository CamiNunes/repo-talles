export interface IDbGraficaSegurancaIncluirUsuario {
	LoginUsuario: string;
	SenhaUsuario: string;
	CodEmpresa: string;
	DtInclusaoUsuario?: Date;
	DtAlteracaoUsuario?: Date;
}

export interface IDbGraficaSegurancaAlterarUsuario {
	CodUsuario: string;
	LoginUsuario: string;
	SenhaUsuario: string;
	CodEmpresa: string;
	DtInclusaoUsuario?: Date;
	DtAlteracaoUsuario?: Date;
}
