import { useNavigate } from 'react-router-dom'
import PageNav from '../components/PageNav'
import { useAuth } from '../contexts/FakeAuthContext'
import styles from './Login.module.css'
import Button from '../components/Button'
import { useEffect, useState } from 'react'
export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com')
  const [password, setPassword] = useState('qwerty')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) login(email, password)
  }

  // When replace is set to true, the new URL will replace the current URL in the browser history stack, which means that the user cannot use the browser's back button to navigate back to the previous page. This is useful when you want to prevent the user from navigating back to a page that they should not be able to access after logging out or completing a form submission.
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true })
    }
  }, [isAuthenticated, navigate])
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  )
}
