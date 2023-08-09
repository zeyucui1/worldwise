import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './pages/ProtectedRoute'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import SpinnerFullPage from './components/SpinnerFullPage'
import { lazy, Suspense } from 'react'

// import Product from './pages/Product'
// import Pricing from './pages/Pricing'
// import HomePage from './pages/Homepage'
// import PageNotFound from './pages/PageNotFound'
// import AppLayout from './pages/AppLayout'
// import Login from './pages/Login'

// 在 React 应用程序中，通常会将所有组件打包到一个 JavaScript 文件中，这可能会导致应用程序加载时间过长，尤其是在较慢的网络连接下。为了解决这个问题，可以使用代码分割技术，将应用程序拆分为多个较小的代码块，然后在需要时动态加载这些代码块。在上面的代码中，lazy 函数用于动态导入 HomePage、Product、Pricing、PageNotFound、AppLayout 和 Login 组件。这些组件将在第一次渲染时动态加载，而不是在应用程序加载时立即加载。这可以提高应用程序的性能和用户体验。
const HomePage = lazy(() => import('./pages/Homepage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const Login = lazy(() => import('./pages/Login'))

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          {/* Suspense 是 React 16.6 中引入的一个新特性，它可以让组件在等待异步操作完成时显示一个 fallback（回退）UI，以提高用户体验。 */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* root path */}
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />

              <Route path="login" element={<Login />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* index route是展示default route ，当没有匹配的url时，展示在applayout的页面*/}
                {/* 这里用navigate replace to city 等于一进入这个defalut 页面，url就会redirect到/cities */}
                <Route index element={<Navigate replace to="cities" />} />
                {/* 这里使用了nest route */}
                <Route path="cities" element={<CityList />} />
                {/* step1 : 在使用param的组件下创建一个新的route path后面带/:param */}
                <Route path="cities/:id" element={<City />}></Route>
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              {/* path设为*一般用于page not found */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
