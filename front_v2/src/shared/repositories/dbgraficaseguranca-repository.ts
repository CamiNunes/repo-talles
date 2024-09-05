/* eslint-disable @typescript-eslint/no-explicit-any */
import {ApiDbGraficaSeguranca} from './base';
import {
	IDbGraficaSegurancaIncluirUsuario,
	IDbGraficaSegurancaAlterarUsuario,
} from 'src/models/dbgraficaseguranca-model';

export class dbgraficasegurancaRepository {
	async IncluirUsuario(data: IDbGraficaSegurancaIncluirUsuario): Promise<void> {
		await ApiDbGraficaSeguranca.post('/Usuario', data);
	}

	async AlterarUsuario(data: IDbGraficaSegurancaAlterarUsuario): Promise<void> {
		await ApiDbGraficaSeguranca.put('/Usuario', data);
	}

	async RemoverUsuario(id: any): Promise<void> {
		await ApiDbGraficaSeguranca.delete(`/Usuario/${id}`);
	}

	async ODataUsuario(filter: any): Promise<any[]> {
		const result = await ApiDbGraficaSeguranca.get(`/Usuario/${filter}`);
		return result.data;
	}
}
