export default (cep: string): string => {
	if (!cep) return '';
	cep = cep.replace(/[^\d]/g, '');
	cep = cep.substring(0, 8);
	if (cep.length > 5) {
		cep = cep.replace(/^(\d{5})(\d*)/, '$1-$2');
	}
	return cep;
};
