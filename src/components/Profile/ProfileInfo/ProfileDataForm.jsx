import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import s from "../../common//FormsControls/FormsControls.module.css";


const ProfileDataForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><button>seve</button></div>
        { props.error && <div className={s.formSummaryError}>  {/*если у нас есть то тогда покажи эту дивку с ошибкой */}
            {props.error} {/*error мы прокинули из аус-редьюсора свойство _error и вызываем его*/}
        </div>
        }
        <div>
            <b>Full name </b> : { createField("Full name", "fullName", [], Input) }   {/*createField наш элемент который помогает создавать элементы форм он в FormsControls.js*/}
        </div>
        <div>
            <b>Looking for a job </b> : { createField("", "lookingForAJob", [], Input, {type:"checkbox"}) }
        </div>
        <div>
            <b>My professional skills </b> : { createField("My professional skills", "lookingForAJobDescription", [], Textarea) }
        </div>
        <div>
            <b>About me </b> : { createField("About me", "aboutMe", [], Textarea) }     {/* name - aboutMe должен совпадать с названием свойства приходящего с сервера оьбъекта */}
        </div>
        <div>
            <b>Contacts</b> : {Object.keys(props.profile.contacts).map(key => {
            return <div>
                <b>{key}:</b> { createField(key, "contacts." + key, [], Input) }   {/* "contacts." + key потому что это вложенный объект и его нужно как пропсы через точку */}
            </div>
        }) }
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm)

export default ProfileDataFormReduxForm;