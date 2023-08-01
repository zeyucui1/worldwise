import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
const CountryList = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on a map" />
    )
  // use reduce to get unique countries
  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country)) {
      return [...acc, { country: city.country, emoji: city.emoji }]
    } else {
      return acc
    }
  }, [])
  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  )
}

export default CountryList
