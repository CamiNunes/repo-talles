/* eslint-disable @typescript-eslint/no-explicit-any */
import {ApiAuthentication} from './base';
import {IAuthenticationAuth, IAuthenticationAuthResult} from 'src/models/authentication-model';

export class authenticationRepository {
	async Auth(data: IAuthenticationAuth): Promise<IAuthenticationAuthResult> {
		const result = await ApiAuthentication.post('/login', data);
		return result.data;
	}
}
