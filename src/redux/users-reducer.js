import {usersAPI} from "../api/api";

let  initialState =  {  /* инициалтзационный стейт который будет инициализировать подветку sidebar*/
    users : [],
    pageSize: 5,
    totalUsersCount:0,
    currentPage: 1,
    isFetching: true,       /* БУЛЕВОЕ ЗНАЧЕНИЕ КРУТЁЛКИ */
    followingInProgress: [],   /*булевое значение отмены работы кнопки */
    fake: 10,
    /*portionSize: 10,*/
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case "FAKE": return {...state, fake: state.fake +1}
        case "FOLLOWE":
            return {
                ...state,
                users: state.users.map(users => {     /*map() возвращает новый массив на основании старого массива*/
                    if (users.id === action.userId){
                        return {...users, followed: true}
                    }
                    return users;
                })
            };
        case "UNFOLLOWE":
            return {
                ...state,
                users: state.users.map(users => {     /*map() возвращает новый массив на основании старого массива*/
                    if (users.id === action.userId){
                        return {...users, followed: false}
                    }
                    return users;
                })
            };
        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "SET-USERS": {
            return {...state, users: action.users}
        }
        case "SET-CURRENT-PAGE":{
            return {...state, currentPage: action.currentPage}     /*указывает на нажатую цифру */
        }
        case "SET-TOTAL-USERS-COUNT":{
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case "TOGGLE-IS-FOLLOWING-PROGRESS" :{
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)   /*.filter  записываем в масив id лбдей которых нужно сделать кнопку не активными и выражением id => id != action.userId мы мы игнарируем айди всех кроме тех что прилетели нам в акшене */
            }                                                                       //!= action.userId те цифры которые я передал он удаляет из масива и отменяет дизейбл для этой кнопке
        }
        default:
            return state;
    }
}

export const followedSuccessActionCreator = (userId) => ({type: "FOLLOWE", userId});  /* {type: "ADD-MASSAGE",} это возращается action*/
export const unfollowedSuccessActionCreator = (userId) => ({type: "UNFOLLOWE", userId});
export const setIsFetchingActionCreator = (isFetching) => ({type: "TOGGLE-IS-FETCHING", isFetching});
export const setUsersActionCreator = (users) => ({type: "SET-USERS", users,});       /*  возвращает обратно в AddMassages и dispatch понимает какую функцию нужно вызвать и какие параметры в нее входят*/
export const setCurrentPageActionCreator = (currentPage) => ({type: "SET-CURRENT-PAGE", currentPage});
export const setTotalUsersCountActionCreator = (totalUsersCount) => ({type: "SET-TOTAL-USERS-COUNT", totalUsersCount});
export const followingInProgressActionCreator = (isFetching, userId) => ({type: "TOGGLE-IS-FOLLOWING-PROGRESS", isFetching, userId});

export const requestUsersThunkCreator = (page, pageSize) => async (dispatch) => {       //ThunkCreator   принемает параметры  и передает их в санку
    dispatch(setIsFetchingActionCreator(true));                         /*крутёлка*/

    const data = await usersAPI.getUsers(page, pageSize);     /*getUsers() иой  запрос API из DAL уровня */
    dispatch(setIsFetchingActionCreator(false));      /*полсе ответа сервера передает значение false и крутилка откоючается */
    dispatch(setUsersActionCreator(data.items));                     /*запрашиваем все данные пользователей определенного отрезка пользователей */
    dispatch(setTotalUsersCountActionCreator(data.totalCount));      /*запрашиваем количество пользователей */
    dispatch(setCurrentPageActionCreator(page));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(followingInProgressActionCreator(true, userId));
    const data = await apiMethod(userId);

    if (data.resultCode === 0) {        /* мы должны анализировать resultCode если мы отправляем на сервер запросы с действиями post delete put*/  /*если подписка прошла усешно сервер подтверждает - 0 */
        dispatch(actionCreator(userId));
    }
    dispatch(followingInProgressActionCreator(false, userId));
}



export const followThunkCreator = (userId) => async (dispatch) => {       //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    let  apiMethod = usersAPI.postUsers.bind(usersAPI);
    let actionCreator = followedSuccessActionCreator;
    followUnfollowFlow (dispatch, userId, apiMethod, actionCreator)   /*рефакторинг и обединение в одну функцию */

    /*dispatch(followingInProgressActionCreator(true, userId));
    const data = await apiMethod(userId);
        if (data.resultCode === 0) {        /!* мы должны анализировать resultCode если мы отправляем на сервер запросы с действиями post delete put*!/  /!*если подписка прошла усешно сервер подтверждает - 0 *!/
          dispatch(actionCreator(userId));
        }
    dispatch(followingInProgressActionCreator(false, userId));*/
}

export const unfollowThunkCreator = (userId) => async (dispatch) => {       /*//ThunkCreator   принемает параметры  и передает их в санку  // async (dispatch) =>  санка  Thunk*/
    let  apiMethod = usersAPI.deleteUsers.bind(usersAPI);
    let actionCreator = unfollowedSuccessActionCreator;
    followUnfollowFlow (dispatch, userId, apiMethod, actionCreator);   /*рефакторинг и обединение в одну функцию */

   /* dispatch(followingInProgressActionCreator(true, userId));
    const data = await apiMethod (userId)
        if (data.resultCode === 0) {        /!* мы должны анализировать resultCode если мы отправляем на сервер запросы с действиями post delete put*!/  /!*если подписка прошла усешно сервер подтверждает - 0 *!/
            dispatch(actionCreator(userId));
        }
    dispatch(followingInProgressActionCreator(false, userId));*/
}


export default usersReducer;