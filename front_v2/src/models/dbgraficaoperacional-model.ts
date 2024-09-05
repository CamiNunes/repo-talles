export interface IDbGraficaOperacionalIncluirNotaFiscal {
	DtNotaFiscal: Date;
	CodCliente: string;
	CodCondicaoPagamento: string;
	DtInclusaoNotaFiscal?: Date;
	DtAlteracaoNotaFiscal?: Date;
	CodVendedor: string;
	CodLoja: string;
	NrNotaFiscal: string;
	Itens: IDbGraficaOperacionalIncluirNotaFiscal[];
}

export interface IDbGraficaOperacionalAlterarNotaFiscal {
	CodNotaFiscal: string;
	DtNotaFiscal: Date;
	CodCliente: string;
	CodCondicaoPagamento: string;
	DtInclusaoNotaFiscal?: Date;
	DtAlteracaoNotaFiscal?: Date;
	CodVendedor: string;
	CodLoja: string;
	NrNotaFiscal: string;
	Itens: IDbGraficaOperacionalAlterarItemNotaFiscal[];
}

export interface IDbGraficaOperacionalIncluirItemNotaFiscal {
	CodServico: string;
	QtItemNotaFiscal: string;
	VlServicoItemNotaFiscal: string;
	VlItemNotaFiscal: string;
}

export interface IDbGraficaOperacionalAlterarItemNotaFiscal {
	CodServico: string;
	QtItemNotaFiscal: string;
	VlServicoItemNotaFiscal: string;
	VlItemNotaFiscal: string;
}
