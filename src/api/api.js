import * as axios from "axios";
import Profile from "../components/Profile/Profile";
import React from "react";


const instance = axios.create({    /*axios.create отдельный экземпляр аксиуса работает с разными апишками который подставляет настроеные значения*/

    withCredentials: true,      /*  отправляем печеньку со своим Id  */
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,  /*baseURL именно так и нужно писать по другому он работать не будет*/
    headers: {                 /*с реквест загаловками мы должны отправить ещё ключ который генерируется на сайте */
        "API-KEY": "3b7c00c8-f707-44eb-a483-1f0782ce5c0d"
    }
});

export const  usersAPI = {
    getUsers (currentPage = 1, pageSize = 10, pageNumber) {     /*эти два параметра мы получаем через пропы у контейнерной компоненты UsersContainer */
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)  /*baseURL сам приклеивается в начало запроса */
            .then(response => {        /*это промис другое обещание мы делаем ниже */
                return response.data;   /* response перезатираем потому что в ответе сидит весь  response а нам нельзя передавать все компаненте и мы вытягивем с него только  response.data*/
            });
    },
    deleteUsers (userId){
        return instance.delete(`/follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },
   postUsers(userId){
       return instance.post(`/follow/${userId}`)
           .then(response => {
               return response.data;
           });
   },
    getHeader(){
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            });
    },
    getProfileC(userId){
        return instance.get(`profile/`+ userId)
            .then(response => {
                return response.data;
            });
    },
}

export const  profileAPI = {
    getStatus(userId) {
        return instance.get(`profile/status/`+ userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status});         /* put i post имеют второй пораметр который требует сервер и это JSON обьект statys смотрим в документации что требует сервер*/
    },
    login(email, password, rememberMe = false, captcha = null){    //по умолчанию  rememberMe false если не придет как заглушка
        return instance.post (`auth/login`, {email, password, rememberMe, captcha});
    },
    logout(){    //по умолчанию  rememberMe false если не придет как заглушка
        return instance.delete (`auth/login`);
    },
    savePhoto(photoFile) {
        const formData = new FormData();    //  const formData = new FormData(); (Артем ? )
        formData.append("image", photoFile);   /* .append- добавляем в конец  (? артем )     image - это свойство смотреть в документации API и значение у него file он приходит к нам пропсах*/
        return instance.put ('profile/photo', formData, {
            headers: {
                "Content-Type": "multipart/form-data"     /* headers это третий параметр для отправуи файла на сервер  так всё время писать  */
            }
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },

}