import React from 'react';
import ReactPaginate from "react-paginate";
import s from "./Pagination.module.scss"

type PaginationPropsType = {
    onChangePage: (page: number) => void
    currentPage: number
}

export const Pagination: React.FC<PaginationPropsType> = ({onChangePage, currentPage}) => {
    return (
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={event => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
        />
    );
};
