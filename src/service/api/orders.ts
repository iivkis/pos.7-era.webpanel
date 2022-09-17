import { Do, EmployeeHeaders, Request } from ".";

export interface GetOrdersResponse {
    id: number;

    info: {
        session_id: number;
        outlet_id: number;

        employee_name: string;
        pay_type: number;
        date: number;

        is_delete: boolean;
    };

    list: {
        product_id: number;
        product_name: string;
        product_price: number;
        count: number;
    }[];
}

function GetOrders(session_id: number): Promise<GetOrdersResponse[]> {
    const req = Request({
        method: "GET",
        url: "/orders",
        headers: EmployeeHeaders(),
    });

    return Do(req).then(({ data }) => data as GetOrdersResponse[]);
}

export { GetOrders };
