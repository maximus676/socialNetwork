import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/auth-reducer";
import Redirect from "react-router-dom/es/Redirect";
import s from "../common/FormsControls/FormsControls.module.css";

const LoginForm = (props) => {
    return (
           <form onSubmit={props.handleSubmit}>   {/*onSubmit метод формы    //  handleSubmit в пропсах приходит данные вписаные в поля */}
               <div>
                   <Field placeholder={"Email"} name = {"email"}
                          component={Input}                         /*component={"input"}указываем что за элемент  //  name = {"login"} атрибут нейм и мы называем это свойство и оно под этим именем уходит на сервер */
                          validate={[required] }/>
               </div>
               <div>
                   <Field placeholder={"Password"} name = {"password"}  /*Field компонента формы*/
                          type={"password"}
                          component={Input}
                          validate={[required] }/>
               </div>
               <div>
                   <Field name = {"rememberMe"} type={"checkbox"}
                          component={Input}/> remember me
               </div>

               {props.captchaUrl && <img src={props.captchaUrl} />}
               {props.captchaUrl && createField("Symbols from image", "captcha", [required], Input)}

               { props.error && <div className={s.formSummaryError}>  {/*если у нас есть то тогда покажи эту дивку с ошибкой */}
                   {props.error} {/*error мы прокинули из аус-редьюсора свойство _error и вызываем его*/}
               </div>
               }
               <div>
                   <button>Login</button>
               </div>
           </form>
    );
}

const LoginReduxForm = reduxForm({form: "loginnn"})(LoginForm)     /*вокруг LoginForm создаем контейнерную компоненту reduxForm под названием LoginReduxForm  и каждой форме предаеи уникальное название как в пропсах form: "login"*/

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
        props.loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha)      /* formData.captcha - отправляеам капчу на сервер */
    }
    if(props.isAuth){                               /*если залогинены и нам приходит isAuth то редирект */
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
           <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />   {/*вырисовываем контейнерную компаненту  */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    }
};

export default connect (mapStateToProps, {loginThunkCreator}) (Login); /* mapStateToProps в нем isAuth*/  /* а вторым параметром мы диспчим вызов санки*/