import { Link } from 'react-router-dom'
import styles from './CityItem.module.css'
import { useCities } from '../contexts/CitiesContext'
const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join('')
  return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
}
const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCities()
  const { cityName, emoji, date, id, position } = city
  const handleClick = (e) => {
    // 这里使用preventDefault是阻止当点击删除按钮时，自己进入Link
    e.preventDefault()
    deleteCity(id)
  }
  return (
    <li>
      {/* step2 在点击的组件下用link包裹所有可点击的内容，并且设定path ，记住这里不要加/  */}
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  )
}

export default CityItem
