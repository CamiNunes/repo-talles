export default (cnpj: string): string => {
	if (!cnpj) return '';
	cnpj = cnpj.replace(/[^\d]/g, '');
	cnpj = cnpj.substring(0, 14);
	if (cnpj.length > 2) {
		cnpj = cnpj.replace(/^(\d{2})(\d*)/, '$1.$2');
	}
	if (cnpj.length > 6) {
		cnpj = cnpj.replace(/^(.{6})(\d*)/, '$1.$2');
	}
	if (cnpj.length > 10) {
		cnpj = cnpj.replace(/^(.{10})(\d*)/, '$1/$2');
	}
	if (cnpj.length > 15) {
		cnpj = cnpj.replace(/^(.{15})(\d*)/, '$1-$2');
	}
	return cnpj;
};
