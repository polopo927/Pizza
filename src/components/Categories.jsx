import { useState } from "react"

export const Categories = () => {

  const [active, setActive] = useState(0)
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]
  const switchActive = (index) => {
    setActive(index)
  }

  return (
    < div className="categories" >
      <ul>
        {categories.map((categorie, index) => (
          <li
            key={index}
            onClick={() => switchActive(index)}
            className={active === index ? 'active' : ''}
          >
            {categorie}
          </li>
        ))}
      </ul>
    </div >
  )
}