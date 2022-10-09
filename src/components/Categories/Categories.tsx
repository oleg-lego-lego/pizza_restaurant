import React, {useState} from "react";

export const Categories = () => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    const [activeIndex, setActiveIndex] = useState(0)

    const onClickCategory = (activeButton: number) => {
        setActiveIndex(activeButton)
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((el, i) => (
                    <li onClick={() => onClickCategory(i)} className={activeIndex === i ? "active" : ''}>{el}</li>
                ))}
            </ul>
        </div>
    )
}