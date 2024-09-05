export default (mon: string): string => {
	if (!mon) return '';
	mon = mon.replace(/[^\d]/g, '');
	if (mon.length > 3) {
		mon = mon.replace(/^(\d*)(\d{2})$/, '$1,$2');
	} else if (mon.length > 0) {
		mon = (mon.length === 1 ? '00' : '0') + mon;
		mon = mon.replace(/^(\d*)(\d{2})$/, '$1,$2');
	}
	while (mon[0] === '0' && mon[1] !== ',') {
		mon = mon.substring(1, mon.length);
	}

	mon = mon.replace(/(\d)(?=(\d{3})+,)/g, '$1.');

	if (mon === '' || mon === '0,00' || mon === 'R$ ') {
		return ``;
	}
	const monFormat = `R$ ${mon}`;

	return monFormat;
};
