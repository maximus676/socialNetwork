import React from "react";
import Preloader from "../components/common/Preloader/Preloader";


 /*HOC  это функция которая принемает компанент на входе и возращает другой компанент*/

export const withSuspense = (Component) => {         /*withAuthRedirect конектит mapStateToPropsForRedirect с RedirectComponent и передает ему isAuth*/

    return (props) => {
        return <React.Suspense fallback = {<div><Preloader /></div>}>
                <Component {...props} />
            </ React.Suspense > /*React.Suspense обварачиваем ту компаненту ктоторую мы должны подгрузить толкьто при переходе на нее*/
    };
}