import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

let  initialState =  {  /* инициалтзационный стейт который будет инициализировать подветку profileReducer*/
    PostData: [                                              /*ответ сервера */
        {id:1,massage:"Hi, how are you?",likeCount:"15"},
        {id:2,massage:"It's my first post",likeCount:"21"},
        {id:3,massage:"Blabla",likeCount:"7"},
        {id:4,massage:"DaDa",likeCount:"30"},
    ],
    profile: null,
    status: "",
}

const profileReducer = (state= initialState, action) => {   /* если стейт не приходит то иницилизируй то что есть */

     switch (action.type) {
         case "ADD-POST": {
             let newPost = {         /*нужно что бы совпадали все пропсы массива */
                 id: 5,
                 massage: action.newPostBody,
                 likeCount: "0"
             };
             let stateCope = {            /* создаем копию state */
                 ...state,
                 PostData: [...state.PostData, newPost],
             }
                    /*    ^ одно и тоже ^  stateCope  */
 /*            stateCope.PostData = [...state.PostData]
             stateCope.PostData.push(newPost);   /!*push()-это метод массива который добавляет в конейц массива новый элемент*!/
             stateCope.newPostText = "";*/
             return stateCope;
         }
         case "SET-STATUS" :{
            return {
                ...state,
                status: action.status
            }
         }
         case "SER-USER-PROFILE" : {
             return {...state, profile: action.profile}

         }
         case "DELETE-POST" : {
             return {...state,PostData: state.PostData.filter( p => p.id != action.postId) }
         }
         case "SAVE-PHOTO-SUCCESS" : {
             return {...state,profile: {...state.profile, photos: action.photos}}
         }
        default :     /* если кейсов таких не найдет то вернет дефолтный state без изменений */
            return state;
    }
}

/* export const addPostActionCreator = () => {
    return {
        type: "ADD-POST"             одно и тоже что и без ретурна
    }
};   */
export const addPostActionCreator = (newPostBody) => ({type: "ADD-POST", newPostBody});
export const setUsersProfileActionCreator = (profile) => ({type: "SER-USER-PROFILE", profile});
export const setStatusActionCreator = (status) => ({type: "SET-STATUS", status});
export const deletePostActionCreator = (postId) => ({type: "DELETE-POST", postId});
export const savePhotoSuccessActionCreator = (photos) => ({type: "SAVE-PHOTO-SUCCESS", photos});


export const setUsersProfileThunkCreator = (userId) => async (dispatch) => {    //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    const data = await usersAPI.getProfileC(userId)
    dispatch(setUsersProfileActionCreator(data));   /*запрашиваем все данные пользователя  */
}
export const getStatusThunkCreator = (userId) => async (dispatch) => {    /*получем статус */  //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatusActionCreator(response.data));
}
export const updateStatusThunkCreator = (status) => async (dispatch) => {    /*санка которая шлет запрос для обновления статуса */  //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusActionCreator(status));
    }
}

export const savePhotoThunkCreator = (file) => async (dispatch) => {     //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessActionCreator(response.data.data.photos));
    }
}
export const saveProfileThunkCreator = (profile) => async (dispatch, getState) => {     //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    const userId = getState().auth.id;                         /*берем данные айди с другова редьюсора */
    const response = await profileAPI.saveProfile(profile)
    debugger;
    if (response.data.resultCode === 0) {
        dispatch(setUsersProfileThunkCreator (userId));
    }else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]})); /* stopSubmit говорит что хотим прекратить сабмит формы // edit-profile название формы  из reduxForm({form: "edit-profile"}) вторям параметром проблемное поле // или вписываем свойство _error форма получает общую ошибку и валидейты срабатывают у всех полей формы  */
        //dispatch(stopSubmit("edit-profile", {"contacts":{"facebook": response.data.messages[0]} }));    //  это ошибкеа для отдельной строки контактов contacts-название обьекта facebook- название строки  имя свойства и выводим оп нему ошибку
        return Promise.reject(response.data.messages[0]);  //Метод Promise.reject(reason) возвращает объект Promise, который был отклонен по указанной причине
    }
}

export default profileReducer;