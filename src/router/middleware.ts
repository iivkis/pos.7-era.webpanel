import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { store } from "../store";

function UseEmployeeAuth(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    if (store.state.EmployeeAPIKey) {
        next();
    } else {
        next({
            name: "Authorization",
        });
    }
}

export { UseEmployeeAuth };
