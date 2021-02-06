import {createSelector} from  "reselect";

const getUsers = (state) => {     /*это преметивный селектор для сложных селекторов ниже */
    return state.usersPage.users;
}

export const selectIsAuth = (state) => {         /*сложный селектор */
    return state.auth.isAuth;
}
export const selectCarrentUsersLogin = (state) => {         /*сложный селектор */
    return state.auth.login;
}
