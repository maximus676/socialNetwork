import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthThunkCreator, required} from "../../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";



const maxLenght10 = maxLengthThunkCreator(10)

const AddPostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}> {/*handleSubmit  появляется из reduxForm*/}
            <div>
                <Field name="newPostBody" component={Textarea}
                       placeholder= "Enter yore post"
                       validate={[required,maxLenght10] }/> {/*validate мои волидаторы как отзывается поле на мои действия над ним */}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm({form: "profileAddPostForm"})(AddPostForm);   /*reduxForm этот хок нужен что бы form работал коректно и и он комбайнелся в том же месте где и редьюсоры  в redux-store*/
