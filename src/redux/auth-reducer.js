import {profileAPI, securityAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

let  initialState =  {  /* инициалтзационный стейт который будет инициализировать подветку sidebar*/
    id: null,
    email: null,
    login: null,
    isAuth: false,    /*булевое значение отоброжения логина в хедере показывает твою регистрацию на сайте*/
    captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "/auth/SET-USER-DATA":
            return {
                ...state,
                ...action.payload,
            };
        case "GET-CAPTCHA-URL-SUCCESS":
            return { ...state, captchaUrl: action.captchaUrl};

        default:
            return state;
    }
}

export const setAuthUserDataActionCreator = (id, email, login, isAuth) => ({type: "/auth/SET-USER-DATA",
                                            payload: {id, email, login, isAuth}});
export const getCaptchaUrlSuccessActionCreator = (captchaUrl) => ({type: "GET-CAPTCHA-URL-SUCCESS", captchaUrl });

export const getAuthUserDataThunkCreator = () => async (dispatch) => {   //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    const data = await usersAPI.getHeader();
    if (data.resultCode === 0) {     /*приходит ответ есть ли ошибкаа или нет 0 это нет ошибок */
        let {id, email, login} = data.data     /*две даты потому что response создал дату и в ответе от сервера тоже есть дата*/
        dispatch(setAuthUserDataActionCreator(id, email, login, true));
    }
}

export const loginThunkCreator = (email, password, rememberMe, captcha) => async (dispatch) => {   //ThunkCreator   принемает параметры  и передает их в санку .. задача санки логиниться // async (dispatch) =>  санка  Thunk
    const data = await profileAPI.login(email, password, rememberMe, captcha);
    if (data.data.resultCode === 0) {     /*приходит ответ есть ли ошибкаа или нет 0 это нет ошибок */
        dispatch(getAuthUserDataThunkCreator())

    } else {
        if(data.data.resultCode === 10){
            dispatch(getCaptchaUrlThunkCreator());
        }
        let message = data.data.messages.length > 0 ? data.data.messages[0] : "Some error";   /*resultCode если придет не ноль то в нем будет сидеть массив с ошибками */
        dispatch(stopSubmit("loginnn", {_error: message})); /* stopSubmit говорит что хотим прекратить сабмит формы // loginnn из reduxForm({form: "loginnn"}) вторям параметром проблемное поле // или вписываем свойство _error форма получает общую ошибку и валидейты срабатывают у всех полей формы  */
    }
}

export const getCaptchaUrlThunkCreator = () => async (dispatch) => {   //ThunkCreator   принемает параметры  и передает их в санку .. задача санки логиниться // async (dispatch) =>  санка  Thunk
    const response = await securityAPI.getCaptchaUrl();
    const CaptchaUrl = response.data.url;          /*это мой ответ от сервера записаный в константу*/
    dispatch(getCaptchaUrlSuccessActionCreator(CaptchaUrl));
}

export const logoutThunkCreator = () => async (dispatch) => {   //ThunkCreator   принемает параметры  и передает их в санку .. задача санки логиниться   // async (dispatch) =>  санка  Thunk
    const data = await profileAPI.logout();
    if (data.data.resultCode === 0) {     /*приходит ответ есть ли ошибкаа или нет 0 это нет ошибок */
        dispatch(setAuthUserDataActionCreator(null, null, null, false)); /*нужно занулить всё что о нас было известно  для выхода   */
    }
}

export default authReducer;