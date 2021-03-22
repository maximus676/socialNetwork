import {profileAPI, ResultCodesEnum, ResultCodesEnumForCaptcha, securityAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = "/auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET-CAPTCHA-URL-SUCCESS";
const DELETE_CAPTCHA = "DELETE-CAPTCHA";

export type InitialStateType2 =  {
    id: number | null,
    email: string | null,                   // дабы не использовать весь этот лишний код пишеи определение через
    login: string | null,                                       // ^  null as string | null,  ^
    isAuth: boolean,
    captchaUrl: string | null,
}


let  initialState  /*:  InitialStateType*/ = {  /* инициалтзационный стейт который будет инициализировать подветку sidebar*/
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,                      /*булевое значение отоброжения логина в хедере показывает твою регистрацию на сайте*/
    captchaUrl: null as string | null,
};
export type InitialStateType = typeof initialState; //говорит затепизируй мне initialState на лету

const authReducer = (state = initialState, action: ActionsTypes):  InitialStateType => {   /*тут state = initialState это обьект который он принемает  а action: не понятно и мы временно пишем any что бы оно принало любой тип И в конце : initialStateType мы явно возвращаем строгое значение  */
    switch (action.type) {
        case "/auth/SET-USER-DATA":
            return {
                ...state,
                ...action.payload,
            };
        case "GET-CAPTCHA-URL-SUCCESS":
            return { ...state, captchaUrl: action.captchaUrl};
        case "DELETE-CAPTCHA":
            return {...state, captchaUrl: action.captchaUrl}

        default:
            return state;
    }
}



type SetAuthUserDataActionPayloadType = {
    id:  number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType | DeleteCaptchaActionType   //общий тип моих экшенов для моих редьбюсоров

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,   //SET_USER_DATA берет из констаннты  typeof обозначет не стринг а конкретное значение которое сидит в этой константе
    payload: SetAuthUserDataActionPayloadType,
}
export const setAuthUserDataActionCreator = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType =>
                                            ({type: SET_USER_DATA, payload: {id, email, login, isAuth}});
type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    captchaUrl: string,
}
export const getCaptchaUrlSuccessActionCreator = (captchaUrl: string): GetCaptchaUrlSuccessActionType =>   /*(captchaUrl: string): getCaptchaUrlSuccessActionType  говорит что функция принемает (captchaUrl: string) но возращает строго тепезированое значение  getCaptchaUrlSuccessActionType */
                                                ({type: GET_CAPTCHA_URL_SUCCESS, captchaUrl });
type DeleteCaptchaActionType = {
    type: typeof DELETE_CAPTCHA,
    captchaUrl: string | null,
}
export const deleteCaptchaActionCreator = (captchaUrl: string | null): DeleteCaptchaActionType =>
                                        ({type: DELETE_CAPTCHA, captchaUrl});




type ThunkType = ThunkAction <Promise<void>, AppStateType, unknown, ActionsTypes>  //ThunkAction пояснение в тетрадке 06 ур

export const getAuthUserDataThunkCreator = (): ThunkType => async (dispatch,getState) => {   //ThunkCreator   принемает параметры  и передает их в санку   // async (dispatch) =>  санка  Thunk
    const data = await usersAPI.getHeader();
    if (data.resultCode === ResultCodesEnum.Sucssess) {     /*приходит ответ есть ли ошибкаа или нет 0 это нет ошибок */  // ResultCodesEnum.Sucssess сидит в API
        let {id, email, login} = data.data     /*две даты потому что response создал дату и в ответе от сервера тоже есть дата*/
        dispatch(setAuthUserDataActionCreator(id, email, login, true));
    }
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async  (dispatch,getState) => {   //ThunkCreator   принемает параметры  и передает их в санку .. задача санки логиниться // async (dispatch) =>  санка  Thunk
    const data = await profileAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Sucssess) {     /*приходит ответ есть ли ошибкаа или нет 0 это нет ошибок */
        dispatch(getAuthUserDataThunkCreator())
        dispatch(deleteCaptchaActionCreator(null))
    } else {
        if(data.resultCode === ResultCodesEnumForCaptcha.CaptchaIsRequired){
            dispatch(getCaptchaUrlThunkCreator());
        }
        let message = data.messages.length > 0 ? data.messages[0] : "Some error";   /*resultCode если придет не ноль то в нем будет сидеть массив с ошибками */
        // @ts-ignore
        dispatch(stopSubmit("loginnn", {_error: message})); /* stopSubmit говорит что хотим прекратить сабмит формы // loginnn из reduxForm({form: "loginnn"}) вторым параметром проблемное поле // или вписываем свойство _error форма получает общую ошибку и валидейты срабатывают у всех полей формы  */
    }
}

export const getCaptchaUrlThunkCreator = (): ThunkType => async (dispatch,getState) => {   //ThunkCreator   принемает параметры  и передает их в санку .. задача санки логиниться // async (dispatch) =>  санка  Thunk
    const response = await securityAPI.getCaptchaUrl();
    const CaptchaUrl = response.data.url;          /*это мой ответ от сервера записаный в константу*/
    dispatch(getCaptchaUrlSuccessActionCreator(CaptchaUrl));
}

export const logoutThunkCreator = (): ThunkType => async (dispatch,getState) => {   //ThunkCreator   принемает параметры  и передает их в санку .. задача санки логиниться   // async (dispatch) =>  санка  Thunk
    const data = await profileAPI.logout();
    if (data.resultCode === 0) {     /*приходит ответ есть ли ошибкаа или нет 0 это нет ошибок */
        dispatch(setAuthUserDataActionCreator(null, null, null, false)); /*нужно занулить всё что о нас было известно  для выхода   */
    }
}

export default authReducer;