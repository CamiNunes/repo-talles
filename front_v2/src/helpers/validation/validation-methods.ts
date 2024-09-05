/* eslint-disable @typescript-eslint/no-explicit-any */

export const validateRequired = (value: any): boolean => {
	if (!value) return false;
	return true;
};

export const validateMaxLength = (value: any, length: number): boolean => {
	if (!value) return true;
	if (value.length > length) return false;
	return true;
};

export const validateMinLength = (value: any, length: number): boolean => {
	if (!value) return true;
	if (value.length < length) return false;
	return true;
};

export const validateMaxValue = (value: any, length: number): boolean => {
	if (!value) return true;
	const number = Number(value);
	if (Number.isNaN(number)) return false;
	if (number > length) return false;
	return true;
};

export const validateMinValue = (value: any, length: number): boolean => {
	if (!value) return true;
	const number = Number(value);
	if (Number.isNaN(number)) return false;
	if (number < length) return false;
	return true;
};

export const validateEmail = (value: any): boolean => {
	if (!value) return true;
	const test = /\S+@\S+\.\S+/;
	return test.test(value);
};

export const validateUrl = (value: any): boolean => {
	if (!value) return true;
	const test =
		/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;
	return test.test(value);
};

export const validateCpfCnpj = (value: any): boolean => {
	if (!value) return true;
	if (testCpf(value)) return true;
	if (testCnpj(value)) return true;
	return false;
};

export const validateLessThan = (value: any, date: Date): boolean => {
	const convertedValue = new Date(Date.parse(value));
	convertedValue.setHours(0, 0, 0, 0);
	date.setHours(0, 0, 0, 0);
	return convertedValue < date;
};

export const validateGreatThan = (value: any, date: Date): boolean => {
	const convertedValue = new Date(Date.parse(value));
	convertedValue.setHours(0, 0, 0, 0);
	date.setHours(0, 0, 0, 0);
	return convertedValue > date;
};

export const validateBetween = (value: any, startDate: Date, endDate: Date): boolean => {
	const convertedValue = new Date(Date.parse(value));
	convertedValue.setHours(0, 0, 0, 0);
	startDate.setHours(0, 0, 0, 0);
	endDate.setHours(0, 0, 0, 0);
	return convertedValue > startDate && convertedValue < endDate;
};

export const checkFormIsValid = (object: any): boolean => {
	let valid = true;
	Object.keys(object).forEach(key => {
		if (object[key]) {
			valid = false;
			return;
		}
	});

	return valid;
};

const testCpf = (cpf: string): boolean => {
	cpf = cpf.replace(/[^\d]+/g, '');
	if (cpf.length != 11) return false;

	let sum;
	let rest;
	sum = 0;
	if (cpf == '00000000000') return false;

	for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
	rest = (sum * 10) % 11;

	if (rest == 10 || rest == 11) rest = 0;
	if (rest != parseInt(cpf.substring(9, 10))) return false;

	sum = 0;
	for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
	rest = (sum * 10) % 11;

	if (rest == 10 || rest == 11) rest = 0;
	if (rest != parseInt(cpf.substring(10, 11))) return false;
	return true;
};

const testCnpj = (cnpj: string): boolean => {
	cnpj = cnpj.replace(/[^\d]+/g, '');
	if (cnpj == '') return false;
	if (cnpj.length != 14) return false;

	if (
		cnpj == '00000000000000' ||
		cnpj == '11111111111111' ||
		cnpj == '22222222222222' ||
		cnpj == '33333333333333' ||
		cnpj == '44444444444444' ||
		cnpj == '55555555555555' ||
		cnpj == '66666666666666' ||
		cnpj == '77777777777777' ||
		cnpj == '88888888888888' ||
		cnpj == '99999999999999'
	)
		return false;

	// Valida DVs
	let length = cnpj.length - 2;
	let numbers: any = cnpj.substring(0, length);
	const digitos: any = cnpj.substring(length);
	let sum = 0;
	let pos = length - 7;
	for (let i = length; i >= 1; i--) {
		sum += numbers.charAt(length - i) * pos--;
		if (pos < 2) pos = 9;
	}
	let resultado = sum % 11 < 2 ? 0 : 11 - (sum % 11);
	if (resultado != digitos.charAt(0)) return false;

	length = length + 1;
	numbers = cnpj.substring(0, length);
	sum = 0;
	pos = length - 7;
	for (let i = length; i >= 1; i--) {
		sum += numbers.charAt(length - i) * pos--;
		if (pos < 2) pos = 9;
	}
	resultado = sum % 11 < 2 ? 0 : 11 - (sum % 11);
	if (resultado != digitos.charAt(1)) return false;

	return true;
};
