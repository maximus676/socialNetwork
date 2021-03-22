import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_STATUS = "SET-STATUS"
const DELETE_POST = "DELETE-POST"
const SAVE_PHOTO_SUCCESS = "SAVE-PHOTO-SUCCESS"


let  initialState =  {  /* инициалтзационный стейт который будет инициализировать подветку profileReducer*/
    PostData: [                                              /*ответ сервера */
        {id:1,massage:"Hi, how are you?",likeCount:15},
        {id:2,massage:"It's my first post",likeCount:21},
        {id:3,massage:"Blabla",likeCount:7},
        {id:4,massage:"DaDa",likeCount:30},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
}

export type InitialStateType = typeof initialState; //говорит затепизируй мне initialState на лету

const profileReducer = (state= initialState, action: ActionsTypes): InitialStateType => { /*тут state = initialState это обьект который он принемает  а action: не понятно и мы временно пишем any что бы оно принало любой тип И в конце : initialStateType мы явно возвращаем строгое значение  */

     switch (action.type) {
         case "ADD-POST": {
             let newPost = {         /*нужно что бы совпадали все пропсы массива */
                 id: 5,
                 massage: action.newPostBody,
                 likeCount: 0
             };
             let stateCope = {            /* создаем копию state */
                 ...state,
                 PostData: [...state.PostData, newPost],
             }
             return stateCope;
         }
         case "SET-STATUS" :{
            return {
                ...state,
                status: action.status
            }
         }
         case "SET-USER-PROFILE" : {
             return {...state, profile: action.profile}

         }
         case "DELETE-POST" : {
             return {...state,PostData: state.PostData.filter( p => p.id != action.postId) }
         }
         case "SAVE-PHOTO-SUCCESS" : {
             return {...state,profile: {...state.profile, photos: action.photos} as ProfileType}   //пока этого обекта нету временно воспринемай его как as ProfileType  но такое делать не жедлательно
         }
        default :     /* если кейсов таких не найдет то вернет дефолтный state без изменений */
            return state;
    }
}

type ActionsTypes = AddPostActionType | SetUsersProfileActionType | setStatusActionType | DeletePostActionType | SavePhotoSuccessActionType  //общий тип моих экшенов для моих редьбюсоров

type AddPostActionType = {
    type: typeof ADD_POST
    newPostBody: string
}
export const addPostActionCreator = (newPostBody: string): AddPostActionType => ({type: ADD_POST, newPostBody});
type SetUsersProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUsersProfileActionCreator = (profile: ProfileType): SetUsersProfileActionType => ({type: SET_USER_PROFILE, profile});
type setStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatusActionCreator = (status: string): setStatusActionType => ({type: SET_STATUS, status});
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePostActionCreator = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccessActionCreator = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});



type ThunkType = ThunkAction <Promise<void>, AppStateType, unknown, ActionsTypes>  //ThunkAction пояснение в тетрадке 06 ур
                          //   userId: number | null почему нужно ещё и нал  (Артем)
export const setUsersProfileThunkCreator = (userId: number | null): ThunkType => async (dispatch, getState) => {    //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    const data = await usersAPI.getProfileC(userId)
    dispatch(setUsersProfileActionCreator(data));   /*запрашиваем все данные пользователя  */
}
export const getStatusThunkCreator = (userId: number): ThunkType => async (dispatch, getState) => {    /*получем статус */  //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatusActionCreator(response.data));
}
export const updateStatusThunkCreator = (status: string): ThunkType => async (dispatch, getState) => {    /*санка которая шлет запрос для обновления статуса */  //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusActionCreator(status));
    }
}
                           //в file  string или другой тип ?
export const savePhotoThunkCreator = (file: string): ThunkType => async (dispatch, getState) => {     //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessActionCreator(response.data.data.photos));
    }
}
export const saveProfileThunkCreator = (profile: ProfileType): ThunkType => async (dispatch, getState) => {     //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    const userId = getState().auth.id;                         /*берем данные айди с другова редьюсора */
    const response = await profileAPI.saveProfile(profile)
    debugger;
    if (response.data.resultCode === 0) {
        dispatch(setUsersProfileThunkCreator (userId));
    }else {
        // @ts-ignore
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]})); /* stopSubmit говорит что хотим прекратить сабмит формы // edit-profile название формы  из reduxForm({form: "edit-profile"}) вторям параметром проблемное поле // или вписываем свойство _error форма получает общую ошибку и валидейты срабатывают у всех полей формы  */
        //dispatch(stopSubmit("edit-profile", {"contacts":{"facebook": response.data.messages[0]} }));    //  это ошибкеа для отдельной строки контактов contacts-название обьекта facebook- название строки  имя свойства и выводим оп нему ошибку
        return Promise.reject(response.data.messages[0]);  //Метод Promise.reject(reason) возвращает объект Promise, который был отклонен по указанной причине
    }
}

export default profileReducer;