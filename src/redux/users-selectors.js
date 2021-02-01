import {createSelector} from  "reselect";

const getUsers = (state) => {     /*это преметивный селектор для сложных селекторов ниже */
    return state.usersPage.users;
}

export const getUsersSelector = (state) => {         /*сложный селектор */
    return getUsers(state).filter(u => true);    /*.filter создает новый масив из юзеров */
}

export const getUsersSuperSelector = createSelector (getUsers,(users) => {     /*getUsersSuperSelector это наш reselect на выходе а селектор это функция которая всегда принемает стейт и возвращает что либо // createSelector в нем вся логика по запуску функции и кешированию массива логика описана в тетради под звездочкой  //(users) это зависимости изза которых будет запускаться функция   */
    return users.filter(u => true);             /*.filter создает новый масив из юзеров */
} )

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getPortionSize = (state) => {
    return state.usersPage.portionSize;
}

export const getFollowingInProgress = (state) => {   /* ^ эти селекторы вывают какие то элементы из state ^*/
    return state.usersPage.followingInProgress;
}

export const countSomethingDifficult = (state) => { /*эти селекторы могут быть сложные */
    /*в них могут быть for... математические вычесления math... пробегания по большим масивам  big arrays*/
    /*  и в итоге может возращаться приметивное значение */
    return state.usersPage.followingInProgress;
}
