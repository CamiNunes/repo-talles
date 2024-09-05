export default (value: string) => {
	if (!value) return '';
	value = value.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
	return value;
};
