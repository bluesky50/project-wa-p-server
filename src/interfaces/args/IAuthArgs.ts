export type IAuthRegisterArgs = { 
	username: string, 
	email: string, 
	password: string, 
	alias: string, 
	about: string, 
	status: string, 
	additional: string 
};

export type IAuthLoginArgs = { 
	username: string, 
	password: string 
}