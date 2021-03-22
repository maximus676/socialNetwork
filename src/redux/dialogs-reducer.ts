
const ADD_MASSAGE = "ADD-MASSAGE";

type DialogType = {
    id: number
    name: string
}

type MassagesType = {
    id: number
    massage: string
}

let  initialState =  {  /* инициалтзационный стейт который будет инициализировать подветку profileReducer*/
    dialogsData : [       /*ответ сервера */
        {id:1, name: "Max"},
        {id:2, name: "Artyom"},
        {id:3, name: "Polly"},
        {id:4, name: "Sasha"},
        {id:5, name: "Viktor"},
        {id:6, name: "Valera"}
    ] as Array <DialogType>,
    massagesData : [          /*ответ сервера */
        {id:1,massage:"Hi"},
        {id:2,massage:"How are you?"},
        {id:3,massage:"Yo"},
        {id:4,massage:"Yo"},
        {id:5,massage:"Yo"},
    ] as Array <MassagesType>,
}

export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes): initialStateType => { /*тут state = initialState это обьект который он принемает  а action: не понятно и мы временно пишем any что бы оно принало любой тип И в конце : initialStateType мы явно возвращаем строгое значение  */

    switch (action.type){
        case "ADD-MASSAGE": {
            let newMassage = {         /*нужно что бы совпадали все пропсы массива */
                id: 6,
                massage: action.newMassageBody,
            };
            let stateCope = {                          /* создаем копию state */
                ...state,
                massagesData: [...state.massagesData , newMassage],
            };

            return stateCope;
        }
        default :
            return state;
    }
}

type ActionsTypes = AddMassageActionType   //общий тип моих экшенов для моих редьбюсоров

type AddMassageActionType = {
    type: typeof ADD_MASSAGE
    newMassageBody: string
}
export const addMassageActionCreator = (newMassageBody: string): AddMassageActionType =>
                                        ({type: ADD_MASSAGE, newMassageBody});  /* {type: "ADD-MASSAGE",} это возращается action*/


export default dialogsReducer;