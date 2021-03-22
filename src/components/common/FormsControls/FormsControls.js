import React from "react";
import s from "./FormsControls.module.css";
import {Field} from "redux-form";


const FormControl = ({input, meta,child1, ...props}) => {   /*мы деструкторизируем props и достаем из него input и meta и ...props оставшиеся приходящие пропсы оставить в пропсах*/ /*в meta сидят данные об ошибках если validate сработал не коректно */
    /*debugger;*/                /*глянуть что приходит в пропсах и понять что нам нужно предать в textarea */
    const hasError = meta.touched && meta.error;
    return(
        <div className={s.formControl +" "+ (hasError ? s.error : "")}> {/*если трогали окно и пришла ошибка то добавь класс эрор если нет добавь пустоту */}
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span> }   {/*если у нас ошибка то покажи спан в противном случае не показывай */} {/*и в meta есть error и в нем записана какая именно ошибка  , touched был ли тронут элемент*/}
        </div>
    )
}

export const Textarea = (props) => {   /*мы деструкторизируем props и достаем из него input и meta и ...props оставшиеся приходящие пропсы оставить в пропсах*/ /*в meta сидят данные об ошибках если validate сработал не коректно */
    const {input, meta,child1, ...restProps} = props;
    return <FormControl {...props}><textarea {...input}  {...restProps}/></FormControl>  /* инпут получается отдельно а в ...props нету input и meta*/
}

export const Input = (props) => {   /*мы деструкторизируем props и достаем из него input и meta и ...props оставшиеся приходящие пропсы оставить в пропсах*/ /*в meta сидят данные об ошибках если validate сработал не коректно */
    const {input, meta,child1, ...restProps} = props;
    return <FormControl {...props}><input {...input}  {...restProps}/></FormControl>  /* инпут получается отдельно а в ...props нету input и meta*/
}

export const  createField = (placeholder, name, validators, component, props = {}, text = "" ) => (
    <div>
        <Field placeholder = {placeholder} name={name}
               validate={validators}
               component={component}
            {...props}
            />{text}
    </div>
)
