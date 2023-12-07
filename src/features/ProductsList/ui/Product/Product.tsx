import React from "react"
import { Box, Button } from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import styles from "./Product.module.css"
import { useAppDispatch } from "../../../../app/model/store"
import { basketActions } from "../../../basket/model/basketSlice"
import { ProductProps } from "../../model/productSlice"

export type Props = {
  item: Partial<ProductProps>
}

export const Product = ({ item }: Props) => {

  const dispatch = useAppDispatch()

  const addToBasketHandler = (id: string, price: number) => () => {
    dispatch(basketActions.addToBasket({ id, price }))
  }

  return (
    <Box className={styles.container}>
      <h2 className={styles.titlePrice}>{item.title}</h2>
      <img className={styles.productPhoto} src={item.photo} alt="photo" />
      <p className={styles.description}>{item.description}</p>
      <h2 className={styles.titlePrice}>Price: {item.price} rub</h2>

      <Button variant={"contained"} color={"secondary"}
              onClick={addToBasketHandler(item.id ? item.id : "", item.price ? item.price : 0)}
      >
        Add to cart
        <AddShoppingCartIcon sx={{ width: "100px" }} />
      </Button>
    </Box>
  )
}
