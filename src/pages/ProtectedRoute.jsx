import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/FakeAuthContext'
import { useEffect } from 'react'
// 这个页面的作用是确保在用户没有登录的情况下，当访问applayout页面，也就是使用网页功能时，自动调回到主页而不是报错
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])
  return isAuthenticated ? children : null
}

export default ProtectedRoute
