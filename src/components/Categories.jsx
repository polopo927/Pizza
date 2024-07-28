export const Categories = ({ categoryId, onChangeCategory }) => {

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
            onClick={() => onChangeCategory(index)}
            className={categoryId === index ? 'active' : ''}
          >
            {categorie}
          </li>
        ))}
      </ul>
    </div >
  )
}