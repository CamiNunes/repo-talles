export interface IDbGraficaSistemaIncluirEmpresa {
	CnpjEmpresa: string;
	NmRazaoSocialEmpresa: string;
	DtInclusaoEmpresa?: Date;
	DtAlteracaoEmpresa?: Date;
}

export interface IDbGraficaSistemaAlterarEmpresa {
	CodEmpresa: string;
	CnpjEmpresa: string;
	NmRazaoSocialEmpresa: string;
	DtInclusaoEmpresa?: Date;
	DtAlteracaoEmpresa?: Date;
}

export interface IDbGraficaSistemaIncluirLoja {
	IdentLoja: string;
	NmLoja: string;
	DtInclusaoLoja?: Date;
	DtAlteracaoLoja?: Date;
}

export interface IDbGraficaSistemaAlterarLoja {
	CodLoja: string;
	IdentLoja: string;
	NmLoja: string;
	DtInclusaoLoja?: Date;
	DtAlteracaoLoja?: Date;
}

export interface IDbGraficaSistemaIncluirCondicaoPagamento {
	IdentCondicaoPagamento: string;
	DsCondicaoPagamento: string;
	DtInclusaoCondicaoPagamento?: Date;
	DtAlteracaoCondicaoPagamento?: Date;
}

export interface IDbGraficaSistemaAlterarCondicaoPagamento {
	CodCondicaoPagamento: string;
	IdentCondicaoPagamento: string;
	DsCondicaoPagamento: string;
	DtInclusaoCondicaoPagamento?: Date;
	DtAlteracaoCondicaoPagamento?: Date;
}

export interface IDbGraficaSistemaIncluirServico {
	IdentServico: string;
	DsServico: string;
	DtInclusaoServico?: Date;
	DtAlteracaoServico?: Date;
	VlServico: string;
}

export interface IDbGraficaSistemaAlterarServico {
	CodServico: string;
	IdentServico: string;
	DsServico: string;
	DtInclusaoServico?: Date;
	DtAlteracaoServico?: Date;
	VlServico: string;
}
