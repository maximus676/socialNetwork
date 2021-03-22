import {usersAPI} from "../api/api";
import {UsersType} from "../types/types";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOWED = "FOLLOWED"
const UNFOLLOWED = "UNFOLLOWED"
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS"



let  initialState =  {  /* инициалтзационный стейт который будет инициализировать подветку sidebar*/
    users : [] as Array <UsersType> ,
    pageSize: 5,
    totalUsersCount:0,
    currentPage: 1,
    isFetching: true,       /* БУЛЕВОЕ ЗНАЧЕНИЕ КРУТЁЛКИ */
    followingInProgress: [] as Array <number>,    //Array <number> воспринимай как масив в котором сидят числа
};
type InitialStateType = typeof initialState; //говорит затепизируй мне initialState на лету

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => { /*тут state = initialState это обьект который он принемает  а action: не понятно и мы временно пишем any что бы оно принало любой тип И в конце : initialStateType мы явно возвращаем строгое значение  */

    switch (action.type) {
        case "FOLLOWED":
            return {
                ...state,
                users: state.users.map(users => {     /*map() возвращает новый массив на основании старого массива*/
                    if (users.id === action.userId){
                        return {...users, followed: true}
                    }
                    return users;
                })
            };
        case "UNFOLLOWED":
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

type ActionsTypes = FollowedSuccessActionType | UnfollowedSuccessActionType | SetIsFetchingActionType |        // общие типы экшенов для usersReducer
    SetUsersActionType | SetCurrentPageActionType | SetTotalUsersCountActionType | FollowingInProgressActionType

type FollowedSuccessActionType = {
    type: typeof FOLLOWED
    userId: number
}
export const followedSuccessActionCreator = (userId: number): FollowedSuccessActionType =>
                                            ({type: FOLLOWED, userId}); //(userId: number): FollowedSuccessActionType говорит что принемает(userId: number) и возращает строго тепезированое значение  FollowedSuccessActionType */
type UnfollowedSuccessActionType = {
    type: typeof UNFOLLOWED
    userId: number
}
export const unfollowedSuccessActionCreator = (userId: number): UnfollowedSuccessActionType =>
                                                ({type: UNFOLLOWED, userId});
type SetIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const setIsFetchingActionCreator = (isFetching: boolean): SetIsFetchingActionType =>
                                            ({type: TOGGLE_IS_FETCHING, isFetching});
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export const setUsersActionCreator = (users: Array<UsersType>): SetUsersActionType =>
                                        ({type: SET_USERS, users,});       /*  возвращает обратно в AddMassages и dispatch понимает какую функцию нужно вызвать и какие параметры в нее входят*/
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPageActionCreator = (currentPage: number): SetCurrentPageActionType =>
                                            ({type: SET_CURRENT_PAGE, currentPage});
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCountActionCreator = (totalUsersCount: number): SetTotalUsersCountActionType =>
                                                ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
type FollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    userId: number
    isFetching: boolean
}
export const followingInProgressActionCreator = (isFetching: boolean, userId: number): FollowingInProgressActionType =>
                                                ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});


type DispatchType = Dispatch<ActionsTypes>   // почему через Dispatch а не просто ActionsTypes написать в followUnfollowFlow (спросить у Артема )
type ThunkType = ThunkAction <Promise<void>, AppStateType, unknown, ActionsTypes>  //ThunkAction пояснение в тетрадке 06 ур

export const requestUsersThunkCreator = (page: number, pageSize: number): ThunkType => async (dispatch, getState) => {       //ThunkCreator   принемает параметры  и передает их в санку      //AppStateType мой глобальный стейт //: ThunkAction типизируем всю нашу возращаемую санку и (dispatch, getState)  автаматически типезируются  // ThunkAction пояснение в тетрадке 06 ур
    dispatch(setIsFetchingActionCreator(true));                         /*крутёлка*/
    const data = await usersAPI.getUsers(page, pageSize);     /*getUsers() иой  запрос API из DAL уровня */
    dispatch(setIsFetchingActionCreator(false));      /*полсе ответа сервера передает значение false и крутилка откоючается */
    dispatch(setUsersActionCreator(data.items));                     /*запрашиваем все данные пользователей определенного отрезка пользователей */
    dispatch(setTotalUsersCountActionCreator(data.totalCount));      /*запрашиваем количество пользователей */
    dispatch(setCurrentPageActionCreator(page));
}

const followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowedSuccessActionType | UnfollowedSuccessActionType) => {
    dispatch(followingInProgressActionCreator(true, userId));
    const data = await apiMethod(userId);

    if (data.resultCode === 0) {        /* мы должны анализировать resultCode если мы отправляем на сервер запросы с действиями post delete put*/  /*если подписка прошла усешно сервер подтверждает - 0 */
        dispatch(actionCreator(userId));
    }
    dispatch(followingInProgressActionCreator(false, userId));
}

export const followThunkCreator = (userId: number): ThunkType => async (dispatch, getState) => {       //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    let  apiMethod = usersAPI.postUsers.bind(usersAPI);
    followUnfollowFlow (dispatch, userId, apiMethod, followedSuccessActionCreator)   /*рефакторинг и обединение в одну функцию */
}

export const unfollowThunkCreator = (userId: number): ThunkType => async (dispatch, getState) => {       /*//ThunkCreator   принемает параметры  и передает их в санку  // async (dispatch) =>  санка  Thunk*/
    let apiMethod = usersAPI.deleteUsers.bind(usersAPI);
    followUnfollowFlow(dispatch, userId, apiMethod, unfollowedSuccessActionCreator);   /*рефакторинг и обединение в одну функцию */
}

export default usersReducer;