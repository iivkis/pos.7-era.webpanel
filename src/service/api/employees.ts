import { Do, OrganizationHeaders, Request } from ".";

interface GetEmployees {
	id: number;
	role_id: number;
	outlet_id: number;

	name: string;
	online: boolean;
	role: string;
}

function GetEmployees(): Promise<GetEmployees[]> {
	const req = Request({
		method: "GET",
		url: "/employees",
		headers: OrganizationHeaders(),
	});

	return Do(req).then(({ data }) => data as GetEmployees[]);
}

export { GetEmployees };
