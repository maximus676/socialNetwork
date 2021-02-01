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
    getIsFetching,
    getPageSize, getPortionSize,
    getTotalUsersCount,
    getUsersSelector, getUsersSuperSelector
} from "../../redux/users-selectors";





class UsersContainer extends React.Component {            /* классовая компонента*/

    componentDidMount() {      /*метод для всех сайт эфектов и вызывается один раз в отличии от жизни объекта */
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {           /*pageNumber нажатое число страницы */
        this.props.requestUsers(pageNumber, this.props.pageSize);     /*вызов ThunkCreator //в параметры мы передаем то что нам нужно для обращения к серверу или для моих ActionCreator*/
             /* ^ все спрятоно это в санке ^ */
       /* this.props.setCurrentPage(pageNumber);  /!* отрисовываем нажатую цифру  *!/
        this.props.toggleIsFetching(true);             /!*крутёлка*!/

        usersAPI.getUsers(pageNumber, this.props.pageSize) .then(data => {      /!*getUsers() иой  запрос API из DAL уровня *!/
            this.props.toggleIsFetching(false);/!*полсе ответа сервера передает значение false и крутилка откоючается *!/
            this.prop,,s.setUsers(data.items);      /!*запрашиваем все данные пользователей определенного отрезка пользователей  но тут мы выбираем определенный отрезок по номеру нажатой цифры page=${pageNumber}*!/
        });*/
    }
    render() {
        console.log("USERS")
        return<>
            {this.props.isFetching ? <Preloader /> : null}      {/* смотрит в onPageChanged на значения true или false*/}
            <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      users={this.props.users}
                      onPageChanged={this.onPageChanged}
                      followThunkCreator={this.props.followThunkCreator}
                      unfollowThunkCreator={this.props.unfollowThunkCreator}
                      followingInProgress={this.props.followingInProgress}
                     /* portionSize = {this.props.portionSize}*/

            />
        </>
    }
}

let mapStateToProps = (state) => {
    console.log("mapStateToProps USERS")
    return{
       /* users:getUsersSelector (state),*/  /*пример работы реселекта и просто селектора ниже реселектор имеют свою логику и может анализировать стоит ли перезапускать функцию или нет */
        users:getUsersSuperSelector (state), /* он принемает стейт но в нутри идет сравнение зависимостей и есть ли какой то ответ в памити  и только потом если нужно перезапусти функцию и нам вернется новый массив */
        /*users: getUsers(state),*/
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
       /* portionSize: getPortionSize(state),*/
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

export default compose(
    connect (mapStateToProps, {
    setCurrentPage: setCurrentPageActionCreator,
    requestUsers: requestUsersThunkCreator,
    followThunkCreator:followThunkCreator,
    unfollowThunkCreator:unfollowThunkCreator,
}),
    // withAuthRedirect        /* сначала закидыввает  UsersContainer в withAuthRedirect а потом получиный результат в выше в connect*/     /* withAuthRedirect это HOC и в нее мы предаем целевую компоненту UsersContainer и к нам возращается новая классовая компанента после обработки */
)(UsersContainer);

