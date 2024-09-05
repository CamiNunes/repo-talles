/* eslint-disable @typescript-eslint/no-explicit-any */
import {ApiDbGraficaSistema} from './base';
import {
	IDbGraficaSistemaIncluirEmpresa,
	IDbGraficaSistemaAlterarEmpresa,
	IDbGraficaSistemaIncluirLoja,
	IDbGraficaSistemaAlterarLoja,
	IDbGraficaSistemaIncluirCondicaoPagamento,
	IDbGraficaSistemaAlterarCondicaoPagamento,
	IDbGraficaSistemaIncluirServico,
	IDbGraficaSistemaAlterarServico,
} from 'src/models/dbgraficasistema-model';

export class dbgraficasistemaRepository {
	async IncluirEmpresa(data: IDbGraficaSistemaIncluirEmpresa): Promise<void> {
		await ApiDbGraficaSistema.post('/Empresa', data);
	}

	async AlterarEmpresa(data: IDbGraficaSistemaAlterarEmpresa): Promise<void> {
		await ApiDbGraficaSistema.put('/Empresa', data);
	}

	async RemoverEmpresa(id: any): Promise<void> {
		await ApiDbGraficaSistema.delete(`/Empresa/${id}`);
	}

	async ODataEmpresa(filter: any): Promise<any[]> {
		const result = await ApiDbGraficaSistema.get(`/Empresa/${filter}`);
		return result.data;
	}

	async IncluirLoja(data: IDbGraficaSistemaIncluirLoja): Promise<void> {
		await ApiDbGraficaSistema.post('/Loja', data);
	}

	async AlterarLoja(data: IDbGraficaSistemaAlterarLoja): Promise<void> {
		await ApiDbGraficaSistema.put('/Loja', data);
	}

	async RemoverLoja(id: any): Promise<void> {
		await ApiDbGraficaSistema.delete(`/Loja/${id}`);
	}

	async ODataLoja(filter: any): Promise<any[]> {
		const result = await ApiDbGraficaSistema.get(`/Loja/${filter}`);
		return result.data;
	}

	async IncluirCondicaoPagamento(data: IDbGraficaSistemaIncluirCondicaoPagamento): Promise<void> {
		await ApiDbGraficaSistema.post('/CondicaoPagamento', data);
	}

	async AlterarCondicaoPagamento(data: IDbGraficaSistemaAlterarCondicaoPagamento): Promise<void> {
		await ApiDbGraficaSistema.put('/CondicaoPagamento', data);
	}

	async RemoverCondicaoPagamento(id: any): Promise<void> {
		await ApiDbGraficaSistema.delete(`/CondicaoPagamento/${id}`);
	}

	async ODataCondicaoPagamento(filter: any): Promise<any[]> {
		const result = await ApiDbGraficaSistema.get(`/CondicaoPagamento/${filter}`);
		return result.data;
	}

	async IncluirServico(data: IDbGraficaSistemaIncluirServico): Promise<void> {
		await ApiDbGraficaSistema.post('/Servico', data);
	}

	async AlterarServico(data: IDbGraficaSistemaAlterarServico): Promise<void> {
		await ApiDbGraficaSistema.put('/Servico', data);
	}

	async RemoverServico(id: any): Promise<void> {
		await ApiDbGraficaSistema.delete(`/Servico/${id}`);
	}

	async ODataServico(filter: any): Promise<any[]> {
		const result = await ApiDbGraficaSistema.get(`/Servico/${filter}`);
		return result.data;
	}
}
