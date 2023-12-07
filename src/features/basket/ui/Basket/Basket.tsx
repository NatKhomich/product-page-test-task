import React from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../../../app/model/store"
import styles from "./Basket.module.css"
import { BasketForm } from "../BasketForm"
import { BasketItem } from "./BasketItem/BasketItem"
import basketImg from "../../../../common/image/emptyshopping.jpg"
import { Box } from "@mui/material"

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
      <Box className={styles.container}>
        <div>
          {basketItems.map(item => {
            const product = productList.find((p) => p.id === item.id)
            return (
              <div key={item.id} className={styles.product}>
                {product && <BasketItem product={product} item={item} />}
              </div>
            )
          })}
        </div>

        <div>
          {total > 0 && <p>Total Price: {total} руб</p>}
          <BasketForm />
        </div>
      </Box>

      : <img className={styles.basketImg} src={basketImg} alt="img" />

  )
}
