import React from "react";
import s from "../Dialogs.module.css";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthThunkCreator, required} from "../../../utils/validators/validators";

const maxLenght50 = maxLengthThunkCreator(50)
const AddMassageForm = (props) => {
    console.log(props)
    return(
        <form onSubmit={props.handleSubmit} className={s.send}> {/*handleSubmit  появляется из reduxForm*/}
            <div>
                <Field name="newMassageBody" component={Textarea}
                       placeholder= "Enter yore massage" className={s.massages__field}
                       validate={[required,maxLenght50] }/>
                {/*<textarea onChange={onMassageChange}
                             value={state.newMassageText}
                             placeholder= "Enter yore massage"
                             className={s.massages__field}></textarea>*/}
            </div>
            <div>
                <button className={s.button__send} >Send</button>
            </div>
        </form>
    )
}

export default reduxForm({form: "dialogAddMassageForm"})(AddMassageForm);   /*экспортируем AddMassageForm обернутый хоком */  /*reduxForm этот хок нужен что бы form работал коректно и и он комбайнелся в том же месте где и редьюсоры  в redux-store*/

