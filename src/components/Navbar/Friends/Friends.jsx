import React from "react";
import s from "./Friends.module.css";
import Friend from "./Friend/Friend";


const Friends = (props) => {
    let FriendsElements = props.friendsData.map(people => <Friend name={people.name} key={people.id} id={people.id} src={people.src} />);

    return (
        <div>
            <h3 className={s.header}>Friends</h3>
                <div className={s.queueFriends}>
                    {FriendsElements}
                 </div>
        </div>
    );
}


export default Friends;