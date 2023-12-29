import React from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../../../app/model/store"
import { BasketForm } from "../BasketForm"
import { BasketItem } from "./BasketItem/BasketItem"
import basketImg from "../../../../common/image/emptyshopping.jpg"
import { Box, Paper } from "@mui/material"
import Typography from "@mui/material/Typography"

export const Basket = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const basketItems = useAppSelector((state) => state.basket.basketItems)
  const productList = useAppSelector((state) => state.product.productList)
  const total = useAppSelector((state) => state.basket.total)

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    total > 0 ?
      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly" alignItems="center" minHeight="90vh">
        <Box  m="20px">
          {basketItems.map(item => {
            const product = productList.find((p) => p.id === item.id)
            return <Box key={item.id}>
              {product &&
                <Paper><BasketItem product={product} item={item} /></Paper>}
            </Box>
          })}
        </Box>

        <Box >
          {total > 0 && <Typography>Total Price: {total} rub</Typography>}
          <BasketForm />
        </Box>
      </Box>

      :
      <Box minHeight="90vh" display="flex" alignItems="center">
        <img style={{ maxWidth: "100%", margin: "10px auto" }} src={basketImg} alt="basket" />
      </Box>

  )
}
