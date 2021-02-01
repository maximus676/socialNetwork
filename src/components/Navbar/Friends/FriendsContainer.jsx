import React from "react";
import {connect} from "react-redux";
import Friends from "./Friends";



let mapStateToProps = (state) =>{
    return{
        friendsData: state.sidebar.friendsData,
    }
}
let mapDispatchToProps = (dispatch) =>{
    return{

    }
}

const FriendsContainer = connect(mapStateToProps, mapDispatchToProps) (Friends);

export default FriendsContainer;