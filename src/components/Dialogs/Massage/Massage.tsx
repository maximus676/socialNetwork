import React from "react";
import s from "./Massage.module.css";

type PropsType = {
    massage: string
    id: number
}

const Massage: React.FC <PropsType>  = (props) =>{

    return(
        <div>
            <div className={s.massage}>{props.massage}</div>
        </div>
    );
}


export default Massage;