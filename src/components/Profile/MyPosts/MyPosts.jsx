import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import AddPostForm from "./AddPostForm/AddPostForm";

const MyPosts = React.memo (props => { /*стрелочная функция с хоком .memo которя проверяет компоненту и если она вернет  такой же jsx то не перерисовывать ее*/


    let PostsElements = props.PostData.map(post => <Post message={post.massage} likeCount={post.likeCount}
                                                         key={post.id} id={post.id}/>);   /* key={post.id} просто что бы не выскакивало ошибки */

    let addNewPost = (values) => {
        props.addPost(values.newPostBody)  /* и будут сидеть свойства в этом обьекте и эти свойствабудут называется как name="newPostBody" в Field там будет все то что ты написал в техтэрию */
    }

    return (
        <div className={s.postBlock}>
            <h3>My post</h3>

            <AddPostForm onSubmit={addNewPost}/>

            <div className={s.posts}>
                {PostsElements} {/*   массив элементов постов   */}
            </div>
        </div>
    );
});

export default MyPosts;