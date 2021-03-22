import {getAuthUserDataThunkCreator} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

export type initialStateType = {
    initialized: boolean,
}

let  initialState: initialStateType =  {  /* инициалтзационный стейт который будет инициализировать подветку sidebar*/
    initialized: false,
};

const appReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {  /*тут state принимает явный тип который в нем должен быть initialStateType а initialState это обьект который он принемает  а action: не понятно и мы временно пишем any что бы оно принало любой тип И в конце : initialStateType мы явно возвращаем строгое значение  */
    switch (action.type) {
        case "INITIALIZED-SUCCESS":
            return {
                ...state,
                initialized: true,
            };

        default:
            return state;
    }
}

type ActionsTypes = InitializedSuccessActionType               //общий тип моих экшенов для моих редьбюсоров

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS   //"INITIALIZED-SUCCESS" берет из констаннты  typeof обозначет не стринг а конкретное значение которое сидит в этой константе
}
export const initializedSuccessActionCreator = (): InitializedSuccessActionType  => ({type: INITIALIZED_SUCCESS});   /*(): InitializedSuccessActionType  говорит что функция ничего не принемает () но возращает строго тепезированое значение */


/*
type ThunkType = ThunkAction <Promise<void>, AppStateType, unknown, ActionsTypes>  //ThunkAction пояснение в тетрадке 06 ур
*/

export const initializAppThunkCreator = () => {   //ThunkCreator   принемает параметры  и передает их в санку
    return (dispatch: any, getState: any) => {      // санка  Thunk    и не понятно что принемает диспач
        let promise = dispatch(getAuthUserDataThunkCreator()) /*promise от этого диспатча */
        Promise.all([promise])
            .then(() => {     /*говорит когда ты зарезолвишься выполни то что внутри */
            dispatch(initializedSuccessActionCreator());
        });
    }
}  



export default appReducer;