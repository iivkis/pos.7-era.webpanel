import { Do, EmployeeHeaders, OrganizationHeaders, Request } from ".";

export interface GetSessionsResponse {
    id: number;
    outlet_id: number;
    employee_id: number;

    bank_earned: number;
    cash_close: number;
    cash_earned: number;
    cash_open: number;
    date_close: number;
    date_open: number;

    number_of_receipts: number;
}

function GetSessions(outletID: number): Promise<GetSessionsResponse[]> {
    const req = Request({
        method: "GET",
        url: "/sessions",
        headers: EmployeeHeaders(),
        params: {
            outlet_id: outletID,
        },
    });

    return Do(req).then(({ data }) => data as GetSessionsResponse[]);
}

export { GetSessions };
