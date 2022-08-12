export interface ServerReponse {
	status: boolean;
	data: any;
}

export interface ServerError {
	code: number;
	error: string;
}

export {};
