import { Do, EmployeeHeaders, Request } from ".";

export interface GetActivatedInvitesResponse {
    id: number;
    affiliate_org: {
        id: number;
        name: string;
        outlets: [
            {
                id: number;
                name: string;
            }
        ];
    };
}

function GetActivatedInvites(): Promise<GetActivatedInvitesResponse[]> {
    const req = Request({
        method: "GET",
        url: "/invites.Activated",
        headers: EmployeeHeaders(),
    });

    return Do(req).then(({ data }) => data as GetActivatedInvitesResponse[]);
}

export { GetActivatedInvites };
