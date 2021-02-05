import React from "react";
import s from "./Users.module.css";
import userPhoto from "../Icons/images.png";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";



let Users = (props) => {

  /*  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize); /!*Math.ceil - округляет полученое число до целого в большую сторону *!/

    let pages = [];
    for(let i=1; i <= pagesCount; i++){                     /!* всё сокрыто в  <Paginator /> *!/
        pages.push(i);
    }*/
    return  <div>
         <div className={s.paginator}>
             <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                        totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
                        portionSize={props.portionSize} className={s.selectedPages}  />
         </div>

       {/*  ^ вместо кода вставленого в конце компаненты  ^ */}
        {
            props.users.map(user => <div key = {user.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id} >
                                <img src={user.photos.small != null ? user.photos.small : userPhoto}  className={s.img}/>
                            </NavLink>
                        </div>
                        <div>
                            {user.followed   /* отрисовывваем кнопки через теронарное вырожение   почему его нет в моем стейте???    */
                                ?  <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {      /*followingInProgress - это масив и он по умолчанию true и по этому делаем через .some если хоть одна id ровна id пользователя то тогда disabled*/
                                    props.unfollowThunkCreator(user.id);      /*вызов ThunkCreator //в параметры мы передаем то что нам нужно для обращения к серверу или для моих ActionCreator*/
                                }}>Unfollow</button>
                                :  <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {    /*disabled атрибут при каких условиях нам нужно кнопку задизейблить */
                                    props.followThunkCreator(user.id);        /*вызов ThunkCreator //в параметры мы передаем то что нам нужно для обращения к серверу или для моих ActionCreator*/
                                }}>Follow</button>}
                        </div>
                    </span>
                <span>
                        <span>
                            <div>{user.name}</div><div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"user.locatione.country"}</div>
                            <div>{"user.locatione.city"}</div>
                        </span>
                    </span>
            </div>)
        }
    </div>
}

export default Users


/*
<div className={s.selectedPages}>
    { pages.map(page => {
            return <span className={props.currentPage === page && s.selectedPage}    /!*если число нажатой цифры то цифра добавляет класс s.selectedPage*!/
                         onClick={(event) => {props.onPageChanged(page);}}>{page}</span>

        })}
</div>*/
