import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar.jsx";
/*import DialogsContainer from "./components/Dialogs/DialogsContainer";*/  /*мы его погружаем ленивым способом он загрузиться только по мере необходимости только при переходе на него*/
import News from "./components/News/News.jsx";
import Music from "./components/Music/Music.jsx";
import Settings from "./components/Settings/Settings.jsx";
import UsersContainer from "./components/Users/UsersContainer";
import {Route} from "react-router-dom";
/*import ProfileContainer from "./components/Profile/ProfileContainer";*/  /*мы его погружаем ленивым способом он загрузиться только по мере необходимости только при переходе на него*/
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router";
import {initializAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
                                                                        /*Lazy ниже */
/*import DialogsContainer from "./components/Dialogs/DialogsContainer";  вместо вот этого импорта */
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {
    componentDidMount(){
        this.props.initializeApp()     /*вызов ThunkCreator //в параметры мы передаем то что нам нужно для обращения к серверу или для моих ActionCreator*/
    }

    render() {
        if(!this.props.initialized){
            return <Preloader />
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route
                        path='/profile/:userId?'        /* :userId  добавляем параметр что бы его отследить для совпадения в withRouter ?- гворит что параметр не обизателен */
                        render={ withSuspense (ProfileContainer)} />
                    <Route
                        path='/dialogs'                            /*  пример дальнейшего пути    to="/dialogs/2"     */
                        render={ withSuspense (DialogsContainer)} />
                    <Route path='/users'                                   /* ^ withSuspense хок с обозначением логики lazy загрузки  ^ */
                           render={() => <UsersContainer/>}/>
                    <Route path='/login'
                           render={() => <Login/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    initialized:state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {
        initializeApp: initializAppThunkCreator })) (App);
