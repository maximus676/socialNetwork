import React from "react";
import s from "./Header.module.css";
import Logo from "../Icons/Logo.png";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
            <img  src = {Logo}/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={"/Login"}>Login</NavLink>}   {/*если isAuth тру то первое если фолс то 2 */}
            </div>
        </header>);
}


export default Header;
