import React from "react";
import {addPostActionCreator, } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

  /* connect он и есть мой store через подключиную библиотеку  */

let mapStateToProps = (state) => {
    return{
        PostData: state.profilePage.PostData,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch) => {
    return{
       addPost: (newPostBody) => {                              /*функция для нажатия по кнопке */
            dispatch(addPostActionCreator(newPostBody));             /*  addPost это уже вызов прокинутой функции из state */
        },
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;