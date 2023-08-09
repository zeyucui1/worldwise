import { useParams } from 'react-router-dom'
import styles from './City.module.css'
import { useEffect } from 'react'
import { useCities } from '../contexts/CitiesContext'
import Spinner from './Spinner'
import BackButton from './BackButton'
const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date))

function City() {
  // step 3 : read the data from the url，在city组件中用useParams()来读取url中的参数
  // 这里的id对应的是app.js中的path中的:id
  const { id } = useParams()
  const { getCity, currentCity, isLoading } = useCities()

  useEffect(() => {
    getCity(id)
  }, [id,getCity])
  if (isLoading) return <Spinner></Spinner>
  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join('')
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    )
  }
  const { cityName, emoji, date, notes } = currentCity

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji ? flagemojiToPNG(emoji) : ''}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackButton />
      </div>
    </div>
  )
}

export default City
