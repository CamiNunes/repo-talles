import axios from 'axios';

export const ApiAuthentication = axios.create({
	baseURL: 'https://midgardsuite.com.br/apis.myklik/v1/auth',
	headers: {
		'Access-Control-Allow-Headers': 'X-Requested-With, privatekey',
		Authorization: `Bearer: ${localStorage.getItem('jwt_token')}`,
	},
});
export const ApiDbGraficaSistema = axios.create({
	baseURL: 'https://midgardsuite.com.br/apis.myklik/v1/Sistema',
	headers: {
		'Access-Control-Allow-Headers': 'X-Requested-With, privatekey',
		Authorization: `Bearer: ${localStorage.getItem('jwt_token')}`,
	},
});
export const ApiDbGraficaSeguranca = axios.create({
	baseURL: 'https://midgardsuite.com.br/apis.myklik/v1/Seguranca',
	headers: {
		'Access-Control-Allow-Headers': 'X-Requested-With, privatekey',
		Authorization: `Bearer: ${localStorage.getItem('jwt_token')}`,
	},
});
export const ApiDbGraficaComercial = axios.create({
	baseURL: 'https://midgardsuite.com.br/apis.myklik/v1/Comercial',
	headers: {
		'Access-Control-Allow-Headers': 'X-Requested-With, privatekey',
		Authorization: `Bearer: ${localStorage.getItem('jwt_token')}`,
	},
});
export const ApiDbGraficaOperacional = axios.create({
	baseURL: 'https://midgardsuite.com.br/apis.myklik/v1/Operacional',
	headers: {
		'Access-Control-Allow-Headers': 'X-Requested-With, privatekey',
		Authorization: `Bearer: ${localStorage.getItem('jwt_token')}`,
	},
});
