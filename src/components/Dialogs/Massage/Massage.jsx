import React from "react";
import s from "./Massage.module.css";

const Massage = (props) =>{

    return(
        <div>
            <div className={s.massage}>{props.massage}</div>
        </div>
    );
}


export default Massage;