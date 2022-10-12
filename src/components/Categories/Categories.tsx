import React from "react";

type CategoriesPropsType = {
    categoryId: number
    onClickCategory: (activeButton: number) => void
}

export const Categories = (props: CategoriesPropsType) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((el, i) => (
                    <li
                        key={i}
                        onClick={() => props.onClickCategory(i)}
                        className={props.categoryId === i ? "active" : ''}>
                        {el}
                    </li>
                ))}
            </ul>
        </div>
    )
}