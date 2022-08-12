import { Do, OrganizationHeaders, Request } from ".";

interface SignInOrganizationResponse {
	token: string;
}

function SignInOrganization(
	email: string,
	password: string
): Promise<SignInOrganizationResponse> {
	const data = JSON.stringify({
		email: email,
		password,
	});

	const req = Request({
		method: "POST",
		url: "/auth/signIn.Org",
		data,
	});

	return Do(req).then(({ data }) => data as SignInOrganizationResponse);
}

interface SignInEmployeeResponse {
	token: string;
	affiliate: boolean;
}

function SignInEmployee(
	id: number,
	password: string
): Promise<SignInEmployeeResponse> {
	const data = JSON.stringify({
		id,
		password,
	});

	const req = Request({
		method: "POST",
		url: "/auth/signIn.Employee",
		data,
		headers: OrganizationHeaders(),
	});

	return Do(req).then(({ data }) => data as SignInEmployeeResponse);
}

export { SignInOrganization, SignInEmployee };
