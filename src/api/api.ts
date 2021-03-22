import axios from "axios";
import React from "react";
import {ProfileType} from "../types/types";


const instance = axios.create({    /*axios.create отдельный экземпляр аксиуса работает с разными апишками который подставляет настроеные значения*/

    withCredentials: true,      /*  отправляем печеньку со своим Id  */
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,  /*baseURL именно так и нужно писать по другому он работать не будет*/
    headers: {                 /*с реквест загаловками мы должны отправить ещё ключ который генерируется на сайте */
        "API-KEY": "3b7c00c8-f707-44eb-a483-1f0782ce5c0d"
    }
});

export enum ResultCodesEnum {      // это некоторое пречесление оно может перечислять строки или числа
    Sucssess = 0,
    Error = 1,
}
export  enum ResultCodesEnumForCaptcha {    // разделили enum для того что бы в ответах где не предпологается капча не предлогало ее
    CaptchaIsRequired = 10
}

type GetHeaderResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array <string>
}
export const  usersAPI = {
    getUsers (currentPage = 1, pageSize = 10, ) {     /*эти два параметра мы получаем через пропы у контейнерной компоненты UsersContainer */
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)  /*baseURL сам приклеивается в начало запроса */
            .then(response => {        /*это промис другое обещание мы делаем ниже */
                return response.data;   /* response перезатираем потому что в ответе сидит весь  response а нам нельзя передавать все компаненте и мы вытягивем с него только  response.data*/
            });
    },
    deleteUsers (userId: number){
        return instance.delete(`/follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },
   postUsers(userId: number){
       return instance.post(`/follow/${userId}`)
           .then(response => {
               return response.data;
           });
   },
    getHeader(){
        return instance.get <GetHeaderResponseType> (`auth/me`)  //<GetHeaderResponseType> когда мы делаем этот гет запрос мы ожидаем ответ этого типа
            .then(response => {
                return response.data;
            });
    },
    getProfileC(userId: number | null){
        return instance.get(`profile/`+ userId)
            .then(response => {
                return response.data;
            });
    },
}


type LoginResponseType = {
    resultCode: ResultCodesEnum | ResultCodesEnumForCaptcha
    messages: Array <string>
    data: {
        userId: number
    }
}
export const  profileAPI = {
    getStatus(userId: number) {
        return instance.get(`profile/status/`+ userId);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status});         /* put i post имеют второй пораметр который требует сервер и это JSON обьект statys смотрим в документации что требует сервер*/
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null){    //по умолчанию  rememberMe false если не придет как заглушка
        return instance.post <LoginResponseType> (`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data;
            });
    },
    logout(){    //по умолчанию  rememberMe false если не придет как заглушка
        return instance.delete (`auth/login`)
            .then(response => {
                return response.data;
            });
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();    //  const formData = new FormData(); (Артем ? )
        formData.append("image", photoFile);   /* .append- добавляем в конец  (? артем )     image - это свойство смотреть в документации API и значение у него file он приходит к нам пропсах*/
        return instance.put ('profile/photo', formData, {
            headers: {
                "Content-Type": "multipart/form-data"     /* headers это третий параметр для отправуи файла на сервер  так всё время писать  */
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },

}