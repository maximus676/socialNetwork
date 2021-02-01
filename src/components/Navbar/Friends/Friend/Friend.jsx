import React from "react";
import s from "./Friend.module.css";
import {NavLink} from "react-router-dom";

const Friend = (props) => {
    let path = "/profile" + "/" + props.id;
    return (
        <NavLink to={path} className={s.friendItem}>
            <img src={props.src} className={s.circle} />
            <span className={s.name}>{props.name}</span>
        </NavLink>
    );
}


export default Friend;