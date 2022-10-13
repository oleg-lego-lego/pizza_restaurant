import React from 'react';
import ReactPaginate from "react-paginate";
import s from "./Pagination.module.scss"

type PaginationPropsType = {
    onChangePage: (page: number) => void
    currentPage: number
}

export const Pagination = (props: PaginationPropsType) => {
    return (
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={event => props.onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={props.currentPage - 1}
        />
    );
};
