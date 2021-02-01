import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state : {
        profilePage: {
            PostData: [                                              /*ответ сервера */
                {id:1,massage:"Hi, how are you?",likeCount:"15"},
                {id:2,massage:"It's my first post",likeCount:"21"},
                {id:3,massage:"Blabla",likeCount:"7"},
                {id:4,massage:"DaDa",likeCount:"30"},
            ],
            newPostText: '',
        },
        dialogsPage : {
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
            newMassageText: '',
        }   ,
        sidebar : {
            friendsData : [
                {id:1, name: "Max", src : "https://sun2.velcom-by-minsk.userapi.com/impg/JgMiPlBJyic7Y_QdDJeJ8Ffpyr76frlDnIeDDA/P7b-RjVi6_c.jpg?size=50x0&quality=88&crop=602,63,1292,1292&sign=cbc740a2c2009b149875ae7fc157aa25&ava=1" },
                {id:2, name: "Artyom", src : " https://sun1.velcom-by-minsk.userapi.com/impf/c834304/v834304387/d6766/DjqtlSyn4Bg.jpg?size=50x0&quality=88&crop=0,262,1149,1149&sign=1749a1c6ebdc2c298972dcc3048ddc9b&ava=1 " },
                {id:3, name: "Polly", src : "https://sun2.velcom-by-minsk.userapi.com/impg/e7NByNdMxkFO_2I3MEZl9Q36jUIFBhZO0YJC7g/SWITza64E_o.jpg?size=50x0&quality=88&crop=7,7,1011,1011&sign=e938a12253701ab8b2e39f6cf2536260&ava=1" },
            ],
        },
    },
    _collSubscriber () {         /*функция которой присвоют другую функцию обновление страницы */
        console.log("state changed");
    },

    getState() {
        return this._state;
    },                    /*возвращает обект скрытый _state*/
    subscribe(observer) {       /*функция которая уходит от цикличности передаем функцию в параметрах*/
        this._collSubscriber = observer;  /* и присваиваю всё дерево  */   /* присваиваем переменной в начале страницы функцию из параметров*/
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);  /*мы отдаем текущий профаил пейдж в функцию с action редьюсор его преобразовывает и возвращает новый профаил паёдж*/
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._collSubscriber(this._state);   /*передаю во всё дерево обновленный _state и страница отрисовывается по новой  */
    },
};



export default store;
window.store = store;
