import profileReducer, {addPostActionCreator, deletePostActionCreator} from "./profile-reducer";
import {render} from "@testing-library/react";
import App from "../App";
import React from "react";

let  state =  {
    PostData: [
        {id:1,massage:"Hi, how are you?",likeCount:"15"},
        {id:2,massage:"It's my first post",likeCount:"21"},
        {id:3,massage:"Blabla",likeCount:"7"},
        {id:4,massage:"DaDa",likeCount:"30"},
    ],
}

test('length of posts should be incremented', () => {
    //1. готовим исхлдгые данные test data
    let action = addPostActionCreator("MAX-test");       /*деспачем MAX-test а в экшен */
    //2. мы делаем какой то экшен
    let newState = profileReducer (state, action);      /*и мы проверяем что при прееданом старом стейте и акшене ответ такой какой мы ожижаем получить*/
    //3. потом мы проверяем ожидание expectation
    expect (newState.PostData.length) .toBe(5);
});

test('massage of new post should be correct', () => {
    //1. готовим исхлдгые данные test data
    let action = addPostActionCreator("MAX-test");    /*деспачем MAX-test а в экшен */
    //2. мы делаем какой то экшен
    let newState = profileReducer (state, action);      /*и мы проверяем что при прееданом старом стейте и акшене ответ такой какой мы ожижаем получить*/
    //3. потом мы проверяем ожидание expectation
    expect (newState.PostData[4].massage) .toBe("MAX-test");
});

test('after deleting length of messages should be decrement', () => {
    //1. готовим исхлдгые данные test data
    let action = deletePostActionCreator(1);   /*деспачем 1 а в экшен */
    //2. мы делаем какой то экшен
    let newState = profileReducer (state, action);      /*и мы проверяем что при прееданом старом стейте и акшене ответ такой какой мы ожижаем получить*/
    //3. потом мы проверяем ожидание expectation
    expect (newState.PostData.length) .toBe(3);
});

test('after deleting length should not be decrement if id is incorrect', () => {
    //1. готовим исхлдгые данные test data
    let action = deletePostActionCreator(1000); /*деспачем 1000 а в экшен */
    //2. мы делаем какой то экшен
    let newState = profileReducer (state, action);      /*и мы проверяем что при прееданом старом стейте и акшене ответ такой какой мы ожижаем получить*/
    //3. потом мы проверяем ожидание expectation
    expect (newState.PostData.length) .toBe(4);
});
