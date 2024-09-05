export default (plate: string): string => {
	if (!plate) return '';
	plate = plate.substring(0, 7);

	if (plate.length > 3)
		plate = plate.replace(/^([A-Z]{3}\d{3})([0-9][0-9A-Z][0-9]{2}\d*)/, '$1-$2');
	return plate;
};
