import React, {useState} from "react";
import s from "./Header.module.css";
import Logo from "../Icons/Logo.png";
import {NavLink} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd';
import {UserOutlined, PoweroffOutlined} from '@ant-design/icons';
import {selectCarrentUsersLogin, selectIsAuth} from "../../redux/auth-selectors";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunkCreator} from "../../redux/auth-reducer";



export const Header = (props) => {

    const isAuth = useSelector(selectIsAuth)               /* это мой mapStateToProps только через селекторы */
    const login = useSelector(selectCarrentUsersLogin)       /*это мой mapStateToProps только через селекторы*/

    const dispatch = useDispatch()        /*это мой mapDispatchToProps только через селекторы*/

    const logoutCallback = () => {           /*функция для вызова санки */
        dispatch(logoutThunkCreator())
    }

    const { Header, } = Layout;

    return (

        <Header className="header">
            <Row>  {/*обозначает что это одна страка */}
                <Col span={18}>     {/* разбиваем сколько занимает колонак всего 24 */}
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><NavLink to="/users" >Developers</NavLink></Menu.Item>
                    </Menu>
                </Col>

                    {isAuth
                        ? <><Col span={1}>
                        <Avatar alt={login || ""} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </Col>
                        <Col span={5}>
                        <div style={{ color: '#fff'}}>{login}<Button type="primary" icon={<PoweroffOutlined />} style={{marginLeft: '10px'}}
                                 onClick={logoutCallback}> Log out!</Button></div>
                        </Col>
                        </>
                        /*? <div>{props.login} <button onClick={props.logout} type={}>Log out</button></div>*/
                        : <Col span={6}>
                            <Button>
                                <NavLink to={"/Login"}>Login</NavLink>
                            </Button>
                        </Col>}
            </Row>
        </Header>);
 /*                                             мой старый хедр до применения стилей
        <header className={s.header}>
            <img  src = {Logo}/>
            <div className={s.loginBlock}>
                {props.isAuth
                ?<Button type="primary" icon={<PoweroffOutlined />}
                onClick={props.logout}> Log out!</Button>
                     /!*? <div>{props.login} <button onClick={props.logout} type={}>Log out</button></div>*!/
                    : <NavLink to={"/Login"}>Login</NavLink>}   {/!*если isAuth тру то первое если фолс то 2 *!/}
            </div>
        </header>);*/
}


