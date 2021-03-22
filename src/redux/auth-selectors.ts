import {createSelector} from  "reselect";
import {AppStateType} from "./redux-store";

const getUsers = (state: AppStateType) => {     /*это преметивный селектор для сложных селекторов ниже */
    return state.usersPage.users;
}

export const selectIsAuth = (state: AppStateType) => {         /*сложный селектор */
    return state.auth.isAuth;
}
export const selectCarrentUsersLogin = (state: AppStateType) => {         /*сложный селектор */
    return state.auth.login;
}
