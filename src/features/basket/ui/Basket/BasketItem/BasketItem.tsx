import React from "react"
import { Paper } from "@mui/material"
import styles from "../Basket.module.css"
import Button from "@mui/material/Button"
import { basketActions, BasketItemType } from "../../../model/basketSlice"
import { useAppDispatch } from "../../../../../app/model/store"
import { ProductProps } from "../../../../ProductsList/model/productSlice"

export type Props = {
  product: Partial<ProductProps>
  item: BasketItemType
}
export const BasketItem = ({ product, item }: Props) => {

  const dispatch = useAppDispatch()

  const decreaseQuantity = (id: string) => {
    dispatch(basketActions.decreaseQuantity({ id }))
  }

  const increaseQuantity = (id: string) => {
    dispatch(basketActions.increaseQuantity({ id }))
  }

  return (
    <Paper className={styles.paper}>
      <img className={styles.productPhoto} src={product.photo} alt="photo" />
      <div>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>Price: {product.price} руб</p>
        <p className={styles.price}>Quantity: {item.quantity} </p>
        <div>
          <Button variant="contained" color={"secondary"}
                  onClick={() => decreaseQuantity(item.id)}>
            -
          </Button>
          <Button variant="contained" color={"secondary"}
                  onClick={() => increaseQuantity(item.id)}>
            +
          </Button>
        </div>
      </div>
    </Paper>
  )
}
