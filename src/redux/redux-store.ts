import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";   /*нужен для санок  это и есть тот самый промежуточный уровень который мы импортируем */
import {reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer";


let rootReducer = combineReducers({          /* это обект у которого значение редьюсоры*/
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});

type RootReducerType = typeof rootReducer;   // сам создает тип на лету и закинет затипизуирует внутрь глобальный стейт и нам его нужно вычленить и для этого есть функция ниже
export type AppStateType = ReturnType<RootReducerType>     // функция ReturnType<>  говорит определи сам что возвращается и зафиксируй под RootReducerType // AppStateType это мой глабальный стор


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;     /*для расширения в браузере  урок 91 */
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));   /*закомбайненые reducers мы отдаем стору //  applyMiddleware -говорит прими промежуточные слои и вкиниться между стором и редьюсором ДЛЯ САНОК  */

// @ts-ignore       // нажимаем Alt+Enter и выбираем @ts-ignore и строшка будет игнорирываться тепизацией
window.__store__ = store

export default store
