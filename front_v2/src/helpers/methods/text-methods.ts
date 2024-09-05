export const upperFirstWord = (word: string): string => {
	if (!word) return '';
	return word[0].toUpperCase() + word.substring(1);
};

export const lowerFirstWord = (word: string): string => {
	if (!word) return '';
	return word[0].toLocaleLowerCase() + word.substring(1);
};
