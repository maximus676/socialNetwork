import React from "react";
import Header from "./Header";
import { logoutThunkCreator} from "../../redux/auth-reducer";
import {connect} from "react-redux";

/*
class HeaderContainer extends React.Component {

    render () {

        return (
            <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout} />
        );
    }
}


let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,

    }
};
export default connect(mapStateToProps, {
    logout: logoutThunkCreator,
}) (HeaderContainer);
*/
