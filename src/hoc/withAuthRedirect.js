import React from "react";
import Redirect from "react-router-dom/es/Redirect";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }};

/*HOC  это функция которая принемает компанент на входе и возращает другой компанент*/
export const withAuthRedirect = (Component) => {         /*withAuthRedirect конектит mapStateToPropsForRedirect с RedirectComponent и передает ему isAuth*/

    class RedirectComponent extends React.Component {
        render() {
            if (this.props.isAuth === false) return <Redirect to={"/login"} /> ;  /*this.props.isAuth нам приходит из mapStateToPropsForRedirect*/

            return <Component {...this.props} />
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}