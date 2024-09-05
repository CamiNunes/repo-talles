export interface IAuthenticationAuth {
	Login: string;
	Password: string;
}

export interface IAuthenticationAuthResult {
	Token: string;
	ExpireDate: Date;
}
