/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITemplateMenu {
	name?: string;
	path?: string;
	type?: 'component' | 'folder';
	isOpen?: boolean;
	icon?: any;
	regularName?: string;
	ref?: string;
	route?: string;
}
