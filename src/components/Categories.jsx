export const Categories = ({ categoryId, onClickCategory }) => {

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  return (
    < div className="categories" >
      <ul>
        {categories.map((categorie, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={categoryId === index ? 'active' : ''}
          >
            {categorie}
          </li>
        ))}
      </ul>
    </div >
  )
}