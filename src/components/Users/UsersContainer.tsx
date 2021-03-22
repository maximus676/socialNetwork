import React from "react";
import {connect} from "react-redux";
import {
    followingInProgressActionCreator, followThunkCreator, requestUsersThunkCreator,
    setCurrentPageActionCreator, unfollowThunkCreator,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching, getPageSize,
    getTotalUsersCount, getUsersSuperSelector
} from "../../redux/users-selectors";
import {UsersType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array <UsersType>
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    followThunkCreator: (userId: number) => void
    unfollowThunkCreator: (userId: number) => void
}
type OwnPropsType = {     // пропсы на прямую
    pageTitle: string
}


type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType // разбиваем приходящие значения на 3 типа 1 приходящий стейт 2 диспатчи 3 перяданые пропсы на прямую

class UsersContainer extends React.Component <PropsType> {            /* классовая компонента*/    //описание типов в классовой компаненте PropsType и StateType но  StateType описание для локального стейта и тут он нам не нужен

    componentDidMount() {      /*метод для всех сайт эфектов и вызывается один раз в отличии от жизни объекта */
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {           /*pageNumber нажатое число страницы */
        this.props.requestUsers(pageNumber, this.props.pageSize);     /*вызов ThunkCreator //в параметры мы передаем то что нам нужно для обращения к серверу или для моих ActionCreator*/

    }
    render() {
        return<>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader /> : null}      {/* смотрит в onPageChanged на значения true или false*/}
            <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      users={this.props.users}
                      onPageChanged={this.onPageChanged}
                      followThunkCreator={this.props.followThunkCreator}
                      unfollowThunkCreator={this.props.unfollowThunkCreator}
                      followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return{
       /* users:getUsersSelector (state),*/  /*пример работы реселекта и просто селектора ниже реселектор имеют свою логику и может анализировать стоит ли перезапускать функцию или нет */
        users:getUsersSuperSelector (state), /* он принемает стейт но в нутри идет сравнение зависимостей и есть ли какой то ответ в памити  и только потом если нужно перезапусти функцию и нам вернется новый массив */
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        currentPage: getCurrentPage(state)
    }
}

/*let mapDispatchToProps = (dispatch) => {
    return{
        foollow: (userId) => {
            dispatch(followedActionCreator(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowedActionCreator(userId))
        },
        toggleIsFetching:(isFetching) => {
            dispatch(setIsFetchingActionCreator(isFetching))
        },
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users))
        },
        setTotalUsersCount:(totalCount) =>{
            dispatch(setTotalUsersCountActionCreator(totalCount))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(serCurrentPageActionCreator(pageNumber))
        },
    }
}*/

export default compose <React.ComponentType>(
    connect <MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType> (
        mapStateToProps, {      //AppStateType тип глобального стейта
    requestUsers: requestUsersThunkCreator,
    followThunkCreator:followThunkCreator,
    unfollowThunkCreator:unfollowThunkCreator,
}),
    // withAuthRedirect        /* сначала закидыввает  UsersContainer в withAuthRedirect а потом получиный результат в выше в connect*/     /* withAuthRedirect это HOC и в нее мы предаем целевую компоненту UsersContainer и к нам возращается новая классовая компанента после обработки */
)(UsersContainer)

