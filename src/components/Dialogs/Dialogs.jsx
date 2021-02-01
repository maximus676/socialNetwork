import React from "react";
import s from "./Dialogs.module.css";
import Massage from "./Massage/Massage";
import DialogItem from "./DialogItem/DialogItem";
import Redirect from "react-router-dom/es/Redirect";
import AddMassageForm from "./AddMessegeForm/AddMessageForm";


const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogsData.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} /> );   /* key={dialog.id} просто что бы не выскакивало ошибки*/

    let massagesElements = state.massagesData.map(massage => <Massage massage={massage.massage} key={massage.id} id={massage.id}/> );    /*вместо  <Massage massage={massagesData[1].massage} id={massagesData[1].id}/>*/

    let  addNewMessage = (values) => {
        props.addMassage (values.newMassageBody);  /*и будут сидеть свойства в этом обьекте и эти свойствабудут называется как name="newMassageBody" в Field там будет все то что ты написал в техтэрию */
    }

   /* if (props.isAuth === false) return <Redirect to={"/login"} /> ;     эту логику редеректы нам заменил  HOC withAuthRedirect*/

    return (
       <div className={s.dialogs}>
           <div className={s.dialogsItems}>
               { dialogsElements }      {/*     -название переменной в которой сидит массив из имеён с компанентой    */}
           </div>

           <div className={s.massages}>
               { massagesElements }     {/*     -название переменной в которой сидит массив из сообщений с компанентой */}
           </div>
           <div>
                  {/*что бы попасть в другую калонку гридва*/}
           </div>
           <AddMassageForm onSubmit={addNewMessage} />
       </div>
        )
}

/*
const AddMassageForm = (props) => {
    console.log(props)
    return(
        <form onSubmit={props.handleSubmit} className={s.send}> {/!*handleSubmit  появляется из reduxForm*!/}
            <div>
                <Field name="newMassageBody" component="textarea" placeholder= "Enter yore massage" className={s.massages__field}/>
                {/!*<textarea onChange={onMassageChange}
                             value={state.newMassageText}
                             placeholder= "Enter yore massage"
                             className={s.massages__field}></textarea>*!/}
            </div>
            <div>
                <button className={s.button__send} >Send</button>
            </div>
        </form>
    )
}

const AddMassageFormRedux = reduxForm({form: "dialogAddMassageForm"})(AddMassageForm);
*/

export default Dialogs;
