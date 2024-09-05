export default (cpfCnpj: string): string => {
	if (!cpfCnpj) return '';
	cpfCnpj = cpfCnpj.replace(/[^\d]/g, '');
	cpfCnpj = cpfCnpj.substring(0, 14);

	if (cpfCnpj.length <= 11) {
		if (cpfCnpj.length > 3) {
			cpfCnpj = cpfCnpj.replace(/^(\d{3})(\d*)/, '$1.$2');
		}
		if (cpfCnpj.length > 7) {
			cpfCnpj = cpfCnpj.replace(/^(.{7})(\d*)/, '$1.$2');
		}
		if (cpfCnpj.length > 11) {
			cpfCnpj = cpfCnpj.replace(/^(.{11})(\d*)/, '$1-$2');
		}
	} else {
		if (cpfCnpj.length > 2) {
			cpfCnpj = cpfCnpj.replace(/^(\d{2})(\d*)/, '$1.$2');
		}
		if (cpfCnpj.length > 6) {
			cpfCnpj = cpfCnpj.replace(/^(.{6})(\d*)/, '$1.$2');
		}
		if (cpfCnpj.length > 10) {
			cpfCnpj = cpfCnpj.replace(/^(.{10})(\d*)/, '$1/$2');
		}
		if (cpfCnpj.length > 15) {
			cpfCnpj = cpfCnpj.replace(/^(.{15})(\d*)/, '$1-$2');
		}
	}
	return cpfCnpj;
};
