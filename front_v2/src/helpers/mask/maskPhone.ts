export default (phone: string) => {
	if (!phone) return '';
	phone = phone.replace(/[^\d]/g, '');
	phone = phone.substring(0, 11);
	if (phone.length > 2) {
		phone = phone.replace(/^(\d{2})(\d*)/, '($1) $2');
	}
	if (phone.length > 9) {
		phone = phone.replace(/^(.*)(\d{4})$/, '$1-$2');
	}
	return phone;
};
