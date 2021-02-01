import React from "react";
import s from "./Paginator.module.css";
/*import cn from "classnames"*/

 /* let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10})

    let pagesCount = Math.ceil(totalItemsCount / props.pageSize); /!*Math.ceil - округляет полученое число до целого в большую сторону *!/

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);      /!*хук useState  в ней будем хранить со старта первую порцию portionNumber setPortionNumber функция которая придет  с хука *!/
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={s.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

        {pages
            .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map(page => {
                return <span className={cn({
                    [s.selectedPage]: currentPage === page
                }, s.pageNumber)}
                             key={page}
                             onClick={(event) => {
                                 onPageChanged(page);
                             }}>{page}</span>
            })}
        {portionCount > portionNumber &&
        <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}

    </div>
}

export default Paginator*/

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize); /*Math.ceil - округляет полученое число до целого в большую сторону */

    let pages = [];
    for(let i=1; i <= pagesCount; i++){
        pages.push(i);
    }

    return <div>
        { pages.map(page => {
            return <span className={props.currentPage === page && s.selectedPage}    /*если число нажатой цифры то цифра добавляет класс s.selectedPage*/
                         onClick={(event) => {props.onPageChanged(page);
                         }}>{page}</span>

        })}
    </div>
}

export default Paginator
