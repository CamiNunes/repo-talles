export default (time: string): string => {
	if (!time) return '';
	time = time.replace(/[^\d]/g, '');
	time = time.substring(0, 4);
	if (time.length > 2) {
		time = time.replace(/^(\d{2})(\d*)/, '$1:$2');
	}
	return time;
};
