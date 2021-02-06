import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatusThunkCreator, savePhotoThunkCreator, saveProfileThunkCreator,
    setUsersProfileThunkCreator,
    updateStatusThunkCreator
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("this", this.props, "next", nextProps )
        return nextProps !== this.props || nextState !== this.state;
    }

    refreshProfile(){
        let userId = this.props.match.params.userId   /*записываем параметр соответствия из Route*/  /*эти пропсы записываются автоматически из withRouter они обволакивают компаненту ProfileContainer*/
        if (!userId){
            userId = this.props.authorizedUserId;   /*authorizedUserId наше id полсе авторизации */
            if (!userId) {
                this.props.history.push("/login"); /*.history это пусть урла и если нет айди мы редиректим новый путь и при помощи .push добавляем ему кусок путя*/
            }
        }
        this.props.setUsersProfile(userId);       /* Санка */
        this.props.getStatus(userId);         /* Санка */
        /*axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUsersProfile(response.data);     /!*запрашиваем все данные пользователя  *!/
        });*/
    }

    componentDidMount(){
        this.refreshProfile();
    }

    componentDidUpdate (prevProps, prevState, snapshot){   /* компанента жизненого цикла сравнивает изменения и если они есть то она перерисовывается*/
        if(this.props.match.params.userId != prevProps.match.params.userId){   /*если айдишка из пришедших пропсов не ровна предыдушему айди то*/
            this.refreshProfile();
        }
    }

    render () {

        console.log("RENDER PROFILE");
        return (
                <Profile {...this.props}
                        isOwner={!this.props.match.params.userId}  /*  isOwner - владелиц или нет  у меня URL строка приходит без айди   */
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        savePhoto={this.props.savePhoto} saveProfile={this.props.saveProfile}/>  /* передаем пропсы которые приходят из вне и передаем те что нам приходят из store*/
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }};

export default compose(
    connect (mapStateToProps, {
        setUsersProfile: setUsersProfileThunkCreator,
        getStatus: getStatusThunkCreator,
        updateStatus: updateStatusThunkCreator,
        savePhoto: savePhotoThunkCreator,
        saveProfile: saveProfileThunkCreator,
    }),
    withRouter,              /*а после обработки выше в compose*/
   /* withAuthRedirect  */      /* сначала закидыввает ProfileContainer в withAuthRedirect а потом получиный результат в выше в withRouter*/     /* withAuthRedirect это HOC и в нее мы предаем целевую компоненту ProfileContainer и к нам возращается новая классовая компанента после обработки */
)(ProfileContainer);


/*
let AuthRedirectComponent = withAuthRedirect(ProfileContainer);   /!* withAuthRedirect это HOC и в нее мы предаем целевую компоненту ProfileContainer и к нам возращается новая классовая компанента после обработки *!/

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }};

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect (mapStateToProps, {
    setUsersProfile: setUsersProfileThunkCreator,
})(WithUrlDataContainerComponent);*/
