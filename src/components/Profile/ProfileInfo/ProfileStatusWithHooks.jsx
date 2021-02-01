import React, {useEffect, useState} from "react";
import s from "./ProfileInfo.module.css";

/*let arr = [0, () => {}];
let [a, setA] = arr;     а = 0, setA= функции  */

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false); /*значение useState изначально false*/  /*useState возращает нам масив и в нем сидят два элемента 1 значение само значение стейта  и мы его записали как false 2 значение  функция которая устанавливает значение стейта  */
    let [status, setStatus] = useState(props.status); /*значение useState изначально props.status приходящий снаружи  */  /*useState возращает нам масив и в нем сидят два элемента 1 значение само значение стейта  и мы его записали как props.status 2 значение  функция которая устанавливает значение стейта  */

    useEffect( () => {      /*один из главных хуков и помним что в функциональной компаненте запрещено делать сайд эфекты и useEffect() это такой хук который говорит закинте в меня функцию которую я выполню когда произойдет отрисовка после */
        setStatus(props.status);                     /*к примеру засенханизировать наш статус */
    },[props.status] );                /* и мы говорим useEffect запускайся не всегда а только 1 раз в момент когда наша компанента вмантировалась первый раз это если [] пустой   // массив [props.status] говорит у тебя есть зависимость props.status и если при очередной отрисовки props.status будет не такой как раньше то запусти наш эфект  */

const activateEditMode = () => {
        setEditMode(true);
    }
 
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);   /* санка */
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value );        /*currentTarget ?????????*/
    }

    return (
        <div>
            { !editMode &&
            <div>
                <b>Status: </b> <span onDoubleClick={activateEditMode}>{props.status || "NO Status"}</span>
            </div>
            }
            { editMode &&
            <div>
                <input onBlur={deactivateEditMode} onChange={onStatusChange} value={status} autoFocus={true}    /* onChange ??????*//> {/*onBlur- метод когда у нас фокус в элементе а потом он уходит из него */} {/*autoFocus={true} автоматическуи за нас делает нажатие на поле ввода */}
            </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;