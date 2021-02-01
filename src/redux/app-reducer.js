import {getAuthUserDataThunkCreator} from "./auth-reducer";


let  initialState =  {  /* инициалтзационный стейт который будет инициализировать подветку sidebar*/
    initialized: false,
};

const appReducer = (state = initialState, action) => {
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

export const initializedSuccessActionCreator = () => ({type: "INITIALIZED-SUCCESS"});

export const initializAppThunkCreator = () => {   //ThunkCreator   принемает параметры  и передает их в санку
    return (dispatch) => {      // санка  Thunk
        let promise = dispatch(getAuthUserDataThunkCreator()) /*promise от этого диспатча */
        //dispatch(sometcingelse())
        //dispatch(sometcingelse())
        promise.then(() => {     /*говорит когда ты зарезолвишься выполни то что внутри */
            dispatch(initializedSuccessActionCreator())
        });
    }
}  



export default appReducer;