import { Do, OrganizationHeaders, Request } from ".";

export interface GetEmployeesResponse {
    id: number;
    role_id: number;
    outlet_id: number;

    name: string;
    online: boolean;
    role: string;
}

function GetEmployees(): Promise<GetEmployeesResponse[]> {
    const req = Request({
        method: "GET",
        url: "/employees",
        headers: OrganizationHeaders(),
    });

    return Do(req).then(({ data }) => data as GetEmployeesResponse[]);
}

export { GetEmployees };
