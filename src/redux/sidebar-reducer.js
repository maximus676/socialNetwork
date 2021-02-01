let  initialState =  {  /* инициалтзационный стейт который будет инициализировать подветку sidebar*/
    friendsData : [
        {id:7500, name: "Max", src : "https://sun2.velcom-by-minsk.userapi.com/impg/JgMiPlBJyic7Y_QdDJeJ8Ffpyr76frlDnIeDDA/P7b-RjVi6_c.jpg?size=50x0&quality=88&crop=602,63,1292,1292&sign=cbc740a2c2009b149875ae7fc157aa25&ava=1" },
        {id:2, name: "Artyom", src : " https://sun1.velcom-by-minsk.userapi.com/impf/c834304/v834304387/d6766/DjqtlSyn4Bg.jpg?size=50x0&quality=88&crop=0,262,1149,1149&sign=1749a1c6ebdc2c298972dcc3048ddc9b&ava=1 " },
        {id:3, name: "Polly", src : "https://sun2.velcom-by-minsk.userapi.com/impg/e7NByNdMxkFO_2I3MEZl9Q36jUIFBhZO0YJC7g/SWITza64E_o.jpg?size=50x0&quality=88&crop=7,7,1011,1011&sign=e938a12253701ab8b2e39f6cf2536260&ava=1" },
    ],
}

const sidebarReducer = (state = initialState, action) => {
    let stateCope = {...state}   /* создаем копию state */
    return stateCope;
}

export default sidebarReducer;