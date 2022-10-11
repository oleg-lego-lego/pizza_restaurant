import React from 'react';
import s from './NodFoundBlock.module.scss';

export const NotFoundBlock = () => {
    return (
        <div className={s.root}>
            <h1 >
                <span>😕</span>
                <br/>
                Ничего не найдено
            </h1>
            <p className={s.description}>Страница отсутствует</p>
        </div>
    );
};
