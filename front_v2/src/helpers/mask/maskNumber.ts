export default (numberData: string): string => {
	if (!numberData) return '';
	numberData = numberData.replace(/[^\d]/g, '');

	if (!!Number(numberData)) return Number(numberData).toString();

	return numberData;
};
