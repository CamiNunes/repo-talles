/* eslint-disable @typescript-eslint/no-explicit-any */
import {ApiDbGraficaComercial} from './base';
import {
	IDbGraficaComercialIncluirVendedor,
	IDbGraficaComercialAlterarVendedor,
	IDbGraficaComercialIncluirCliente,
	IDbGraficaComercialAlterarCliente,
	IDbGraficaComercialIncluirClienteContato,
	IDbGraficaComercialAlterarClienteContato,
} from 'src/models/dbgraficacomercial-model';

export class dbgraficacomercialRepository {
	async IncluirVendedor(data: IDbGraficaComercialIncluirVendedor): Promise<void> {
		await ApiDbGraficaComercial.post('/Vendedor', data);
	}

	async AlterarVendedor(data: IDbGraficaComercialAlterarVendedor): Promise<void> {
		await ApiDbGraficaComercial.put('/Vendedor', data);
	}

	async RemoverVendedor(id: any): Promise<void> {
		await ApiDbGraficaComercial.delete(`/Vendedor/${id}`);
	}

	async ODataVendedor(filter: any): Promise<any[]> {
		const result = await ApiDbGraficaComercial.get(`/Vendedor/${filter}`);
		return result.data;
	}

	async IncluirCliente(data: IDbGraficaComercialIncluirCliente): Promise<void> {
		await ApiDbGraficaComercial.post('/Cliente', data);
	}

	async AlterarCliente(data: IDbGraficaComercialAlterarCliente): Promise<void> {
		await ApiDbGraficaComercial.put('/Cliente', data);
	}

	async RemoverCliente(id: any): Promise<void> {
		await ApiDbGraficaComercial.delete(`/Cliente/${id}`);
	}

	async ODataCliente(filter: any): Promise<any[]> {
		const result = await ApiDbGraficaComercial.get(`/Cliente/${filter}`);
		return result.data;
	}

	async IncluirClienteContato(data: IDbGraficaComercialIncluirClienteContato): Promise<void> {
		await ApiDbGraficaComercial.post('/ClienteContato', data);
	}

	async AlterarClienteContato(data: IDbGraficaComercialAlterarClienteContato): Promise<void> {
		await ApiDbGraficaComercial.put('/ClienteContato', data);
	}

	async RemoverClienteContato(id: any): Promise<void> {
		await ApiDbGraficaComercial.delete(`/ClienteContato/${id}`);
	}

	async ODataClienteContato(filter: any): Promise<any[]> {
		const result = await ApiDbGraficaComercial.get(`/ClienteContato/${filter}`);
		return result.data;
	}
}
