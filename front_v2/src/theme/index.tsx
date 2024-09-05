export interface ITheme {
	colors: {
		white: string;
		black: {
			light: string;
			medium: string;
			dark: string;
		};
		primary: {
			light: string;
			medium: string;
			dark: string;
		};
		info: {
			light: string;
			medium: string;
			dark: string;
		};
		success: {
			light: string;
			medium: string;
			dark: string;
		};
		alert: {
			light: string;
			medium: string;
			dark: string;
		};
		danger: {
			light: string;
			medium: string;
			dark: string;
		};
		light: {
			light: string;
			medium: string;
			dark: string;
		};
	};
}

const theme: ITheme = {
	colors: {
		white: '#FFFFFF',
		black: {
			light: 'rgba(0,0,0,0.16)',
			medium: 'rgba(0, 0, 0, 0.56)',
			dark: 'rgba(0, 0, 0, 0.88)',
		},
		primary: {
			light: '#2B45D4',
			medium: '#2B45D4',
			dark: '#2B45D4',
		},
		info: {
			light: '#CFE5F3',
			medium: '#008AD2',
			dark: '#0079B8',
		},
		success: {
			light: '#40CF54',
			medium: '#555151',
			dark: '#309C3F',
		},
		alert: {
			light: '#FFC61A',
			medium: '#FFCC00',
			dark: '#E5A100',
		},
		danger: {
			light: '#FF584C',
			medium: '#F44336',
			dark: '#DB3C31',
		},
		light: {
			light: '#ccc',
			medium: '#aaa',
			dark: '#777',
		},
	},
};

export default theme;
