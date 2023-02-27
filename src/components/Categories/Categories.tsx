import React from "react";

type CategoriesPropsType = {
    categoryId: number
    onClickCategory: (activeButton: number) => void
}

export const Categories: React.FC<CategoriesPropsType> = ({categoryId, onClickCategory}) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((el, i) => (
                    <li
                        key={i}
                        onClick={() => onClickCategory(i)}
                        className={categoryId === i ? "active" : ''}>
                        {el}
                    </li>
                ))}
            </ul>
        </div>
    )
}