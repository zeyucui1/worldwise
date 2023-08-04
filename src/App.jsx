import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Product from './pages/Product'
import Pricing from './pages/Pricing'
import HomePage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import ProtectedRoute from './pages/ProtectedRoute'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
