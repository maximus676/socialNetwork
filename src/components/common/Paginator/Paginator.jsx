import React, {useState} from "react";
import styles from "./Paginator.module.css";
import cn from "classnames"
import "antd/dist/antd.css";
import {Button, Pagination} from 'antd';


function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a className={styles.pageNavigator}>Previous</a>;
  }
  if (type === 'next') {
    return <a className={styles.pageNavigator}>Next</a>;
  }
  return originalElement;
}

const Paginator = ({totalUsersCount, pageSize, onPageChanged}) =>{

    let pagesCount = Math.ceil(totalUsersCount / pageSize); /*Math.ceil - округляет полученое число до целого в большую сторону */

    return (
        <div className={styles.test}>
            <Pagination onChange={(page) =>{onPageChanged(page)}}       /* page приходит из под капота анта мы получаем нажатую страницу и передаем ее функции изменения  onPageChanged*/
                       total={pagesCount} defaultPageSize = {1} showQuickJumper  /*total={pagesCount} - анту передаю что бы он знал колво страниц / defaultPageSize = {1} для того xnj  для того что бы не делил кколво страниц на 10 / showQuickJumper- включаем Go to   */
                       showSizeChanger = {false} itemRender={itemRender}/></div>  /*showSizeChanger = {false} - отключает выподающий список */
        )
}


/*export let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10}) =>{

  let pagesCount = Math.ceil(totalUsersCount / pageSize); /!*Math.ceil - округляет полученое число до целого в большую сторону *!/

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);      /!*хук useState  в ней будем хранить со старта первую порцию portionNumber setPortionNumber функция которая придет  с хука *!/
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return <div className={styles.paginator}>
    {portionNumber > 1 &&
    <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

    {pages
        .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
        .map((page) => {
          return <span className={ cn({
            [styles.selectedPage]: currentPage === page
          }, styles.pageNumber)}
                       key={page}
                       onClick={(e) => {
                         onPageChanged(page);
                       }}>{page}</span>
        })}
    {portionCount > portionNumber &&
    <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}

  </div>
  }*/
export default Paginator

