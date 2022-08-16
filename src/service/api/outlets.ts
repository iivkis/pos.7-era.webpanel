import { Do, OrganizationHeaders, Request } from ".";

export interface GetOutletsResponse {
    id: number;
    name: string;
}

function GetOutlets(): Promise<GetOutletsResponse[]> {
    const req = Request({
        method: "GET",
        url: "/outlets",
        headers: OrganizationHeaders(),
    });

    return Do(req).then(({ data }) => data as GetOutletsResponse[]);
}

export { GetOutlets };
