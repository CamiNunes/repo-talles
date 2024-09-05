export interface IDbGraficaComercialIncluirVendedor {
	IdentVendedor: string;
	NmVendedor: string;
	DtInclusaoVendedor?: Date;
	DtAlteracaoVendedor?: Date;
}

export interface IDbGraficaComercialAlterarVendedor {
	CodVendedor: string;
	IdentVendedor: string;
	NmVendedor: string;
	DtInclusaoVendedor?: Date;
	DtAlteracaoVendedor?: Date;
}

export interface IDbGraficaComercialIncluirCliente {
	CnpjCliente: string;
	IeCliente: string;
	ImCliente: string;
	NmRazaoSocialCliente: string;
	NmFantasiaCliente: string;
	CepCliente: string;
	UfCliente: string;
	CidCliente: string;
	BrCliente: string;
	EndCliente: string;
	NrCliente: string;
	CompCliente: string;
	DtInclusaoCliente?: Date;
	DtAlteracaoCliente?: Date;
	CodCondicaoPagamento: string;
	NmContatoCliente: string;
	TelContatoCliente: string;
	EmailContatoCliente: string;
}

export interface IDbGraficaComercialAlterarCliente {
	CodCliente: string;
	CnpjCliente: string;
	IeCliente: string;
	ImCliente: string;
	NmRazaoSocialCliente: string;
	NmFantasiaCliente: string;
	CepCliente: string;
	UfCliente: string;
	CidCliente: string;
	BrCliente: string;
	EndCliente: string;
	NrCliente: string;
	CompCliente: string;
	DtInclusaoCliente?: Date;
	DtAlteracaoCliente?: Date;
	CodCondicaoPagamento: string;
	NmContatoCliente: string;
	TelContatoCliente: string;
	EmailContatoCliente: string;
}

export interface IDbGraficaComercialIncluirClienteContato {
	CodCliente: string;
	NmClienteContato: string;
	TelClienteContato: string;
	DtInclusaoClienteContato?: Date;
	DtAlteracaoClienteContato?: Date;
}

export interface IDbGraficaComercialAlterarClienteContato {
	CodClienteContato: string;
	CodCliente: string;
	NmClienteContato: string;
	TelClienteContato: string;
	DtInclusaoClienteContato?: Date;
	DtAlteracaoClienteContato?: Date;
}
