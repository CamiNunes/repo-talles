export default (cpf: string): string => {
	if (!cpf) return '';
	cpf = cpf.replace(/[^\d]/g, '');
	cpf = cpf.substring(0, 11);
	if (cpf.length > 3) {
		cpf = cpf.replace(/^(\d{3})(\d*)/, '$1.$2');
	}
	if (cpf.length > 7) {
		cpf = cpf.replace(/^(.{7})(\d*)/, '$1.$2');
	}
	if (cpf.length > 11) {
		cpf = cpf.replace(/^(.{11})(\d*)/, '$1-$2');
	}
	return cpf;
};
