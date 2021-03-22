import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar.jsx";
/*import DialogsContainer from "./components/Dialogs/DialogsContainer";*/  /*мы его погружаем ленивым способом он загрузиться только по мере необходимости только при переходе на него*/
import News from "./components/News/News.jsx";
import Music from "./components/Music/Music.jsx";
import Settings from "./components/Settings/Settings.jsx";
import UsersContainer from "./components/Users/UsersContainer";
import {NavLink, Route, Switch} from "react-router-dom";
/*import ProfileContainer from "./components/Profile/ProfileContainer";*/  /*мы его погружаем ленивым способом он загрузиться только по мере необходимости только при переходе на него*/
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router";
import {initializAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import Redirect from "react-router-dom/es/Redirect";
import {Header} from "./components/Header/Header";
import "antd/dist/antd.css";

import {Layout, Menu, Breadcrumb, Col, Row,} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import FriendsContainer from "./components/Navbar/Friends/FriendsContainer";
import s from "./components/Navbar/Navbar.module.css";





const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

                                                                        /*Lazy ниже */
/*import DialogsContainer from "./components/Dialogs/DialogsContainer";  вместо вот этого импорта */
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {
    catchAllUnhandleErrors = (reason, promise) => {
        alert("Some error occured");
        //console.error(promiseRejectionEvent)
    }
    componentDidMount(){
        this.props.initializeApp()     /*вызов ThunkCreator //в параметры мы передаем то что нам нужно для обращения к серверу или для моих ActionCreator*/
        window.addEventListener("unhandledrejection",  this.catchAllUnhandleErrors);
    };

    componentWillUnmount(){      /*компанета жизненого цикла срабатывает при удалении компаненты */
        window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors);
    }

    render() {
        if(!this.props.initialized){
            return <Preloader />
        }

        return (
            <Layout>

                <Header />

                {/*<Header className="header">
                    <div className="logo" />
                    <Row>  обозначает что это одна страка
                        <Col span={20}>      разбиваем сколько занимает колонак всего 24
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                                <Menu.Item key="1"><NavLink to="/users" >Developers</NavLink></Menu.Item>
                            </Menu>
                        </Col>
                        <Col span={4}>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </Col>
                    </Row>
                </Header>*/}
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                               /* defaultOpenKeys={['sub1']}*/
                                style={{ height: '100%' }}
                            >

                                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                                    <Menu.Item key="1"> <NavLink to="/profile" >Profile</NavLink></Menu.Item>
                                    <Menu.Item key="2"><NavLink to="/dialogs" >Messages</NavLink></Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                                    <Menu.Item key="5"><NavLink to="/users" >Users</NavLink></Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                                <div className={s.fieldFriends}>
                                    <FriendsContainer />
                                </div>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>

                            <Switch>
                                <Route
                                    path='/profile/:userId?'       /* :userId  добавляем параметр что бы его отследить для совпадения в withRouter ?- гворит что параметр не обизателен*/
                                    render={ withSuspense (ProfileContainer)} />
                                <Route exact  path='/'      /* <Route exact path = если я хочу что бы урл совпадал точь в точ*/
                                    render={() => <Redirect to={"/profile"} /> } />
                                <Route path='/dialogs'                              /*пример дальнейшего пути    to="/dialogs/2"   */
                                    render={ withSuspense (DialogsContainer)} />
                                <Route path='/users'                                    /*^ withSuspense хок с обозначением логики lazy загрузки  ^*/
                                    render={() => <UsersContainer pageTitle={"Самурай"} />}/>
                                <Route path='/login' render={() => <Login/>}/>
                                <Route path='/news' render={() => <News/>}/>
                                <Route path='/music' render={() => <Music/>}/>
                                <Route path='/settings' render={() => <Settings/>}/>    {/*<Route exact path = если я хочу что бы урл совпадал точь в точ */}
                            <Route path='*' render={() => <div>404 NOT FOUND</div>}/>      {/*ЕСЛИ ЕН ОДИН ПУТЬ НЕ УСТРАИВАЕТ ТО 404*/}
                            </Switch>

                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Social Network</Footer>
            </Layout>
          /*  <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route
                            path='/profile/:userId?'        /!* :userId  добавляем параметр что бы его отследить для совпадения в withRouter ?- гворит что параметр не обизателен *!/
                            render={ withSuspense (ProfileContainer)} />
                        <Route exact         /!*  <Route exact path = если я хочу что бы урл совпадал точь в точ *!/
                            path='/'        /!* :userId  добавляем параметр что бы его отследить для совпадения в withRouter ?- гворит что параметр не обизателен *!/
                            render={() => <Redirect to={"/profile"} /> } />
                        <Route
                            path='/dialogs'                            /!*  пример дальнейшего пути    to="/dialogs/2"     *!/
                            render={ withSuspense (DialogsContainer)} />
                        <Route path='/users'                                   /!* ^ withSuspense хок с обозначением логики lazy загрузки  ^ *!/
                               render={() => <UsersContainer/>}/>
                        <Route path='/login'
                               render={() => <Login/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>   {/!*  <Route exact path = если я хочу что бы урл совпадал точь в точ *!/}
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>      {/!*ЕСЛИ ЕН ОДИН ПУТЬ НЕ УСТРАИВАЕТ ТО 404*!/}
                    </Switch>
                </div>
            </div>*/
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
