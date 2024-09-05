/* eslint-disable @typescript-eslint/no-explicit-any */
import {ApiDbGraficaOperacional} from './base';
import {
	IDbGraficaOperacionalIncluirNotaFiscal,
	IDbGraficaOperacionalAlterarNotaFiscal,
	IDbGraficaOperacionalIncluirItemNotaFiscal,
	IDbGraficaOperacionalAlterarItemNotaFiscal,
} from 'src/models/dbgraficaoperacional-model';

export class dbgraficaoperacionalRepository {
	async IncluirNotaFiscal(data: IDbGraficaOperacionalIncluirNotaFiscal): Promise<void> {
		await ApiDbGraficaOperacional.post('/NotaFiscal', data);
	}

	async AlterarNotaFiscal(data: IDbGraficaOperacionalAlterarNotaFiscal): Promise<void> {
		await ApiDbGraficaOperacional.put('/NotaFiscal', data);
	}

	async RemoverNotaFiscal(id: any): Promise<void> {
		await ApiDbGraficaOperacional.delete(`/NotaFiscal/${id}`);
	}

	async ODataNotaFiscal(filter: any): Promise<any[]> {
		const result = await ApiDbGraficaOperacional.get(`/NotaFiscal/${filter}`);
		return result.data;
	}

	async IncluirItemNotaFiscal(data: IDbGraficaOperacionalIncluirItemNotaFiscal): Promise<void> {
		await ApiDbGraficaOperacional.post('/ItemNotaFiscal', data);
	}

	async AlterarItemNotaFiscal(data: IDbGraficaOperacionalAlterarItemNotaFiscal): Promise<void> {
		await ApiDbGraficaOperacional.put('/ItemNotaFiscal', data);
	}

	async RemoverItemNotaFiscal(id: any): Promise<void> {
		await ApiDbGraficaOperacional.delete(`/ItemNotaFiscal/${id}`);
	}

	async ODataItemNotaFiscal(filter: any): Promise<any[]> {
		const result = await ApiDbGraficaOperacional.get(`/ItemNotaFiscal/${filter}`);
		return result.data;
	}
}
