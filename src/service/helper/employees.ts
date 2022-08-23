import { GetEmployeesResponse } from "../api/employees";

function GetEmployeeName(
    employees: GetEmployeesResponse[],
    id: number
): string {
    const employee = employees.filter((x) => x.id === id);
    return employee.length ? employee[0].name : "";
}

export {GetEmployeeName};
