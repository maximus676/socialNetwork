let  initialState =  {  /* инициалтзационный стейт который будет инициализировать подветку profileReducer*/
    dialogsData : [       /*ответ сервера */
        {id:1, name: "Max"},
        {id:2, name: "Artyom"},
        {id:3, name: "Polly"},
        {id:4, name: "Sasha"},
        {id:5, name: "Viktor"},
        {id:6, name: "Valera"}
    ],
    massagesData : [          /*ответ сервера */
        {id:1,massage:"Hi"},
        {id:2,massage:"How are you?"},
        {id:3,massage:"Yo"},
        {id:4,massage:"Yo"},
        {id:5,massage:"Yo"},
    ],
}

const dialogsReducer = (state = initialState, action) => {

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

export const addMassageActionCreator = (newMassageBody) => ({type: "ADD-MASSAGE", newMassageBody});  /* {type: "ADD-MASSAGE",} это возращается action*/


export default dialogsReducer;