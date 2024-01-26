import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { ProductsList } from "../../../features/productsList/ui/ProductsList"
import { AuthPage } from "../../../features/auth/ui/AuthPage"
import { Basket } from "../../../features/basket/ui/Basket/Basket"
import { Error } from "../../../components/error404/Error"

export const Routing = () => {
  return (
    <Routes>
      <Route path={"/"} element={<ProductsList />} />
      <Route path={"/login"} element={<AuthPage />} />
      <Route path={"/basket"} element={<Basket />} />
      <Route path={"/404"} element={ <Error /> } />
      <Route path={"*"} element={ <Navigate to={'/404'} /> } />
    </Routes>
  )
}

