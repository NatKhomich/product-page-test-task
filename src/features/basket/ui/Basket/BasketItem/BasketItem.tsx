import React from "react"
import { Box } from "@mui/material"
import styles from "./BasketItem.module.css"
import Button from "@mui/material/Button"
import { basketActions, BasketItemType } from "../../../model/basketSlice"
import { useAppDispatch } from "../../../../../app/model/store"
import { ProductProps } from "../../../../ProductsList/model/productSlice"
import Typography from "@mui/material/Typography"

export type Props = {
  product: Partial<ProductProps>
  item: BasketItemType
}
export const BasketItem = ({ product, item }: Props) => {

  const dispatch = useAppDispatch()

  const decreaseQuantity = (id: string) => () => {
    dispatch(basketActions.decreaseQuantity({ id }))
  }

  const increaseQuantity = (id: string) => () => {
    dispatch(basketActions.increaseQuantity({ id }))
  }

  return (
    <Box display="flex" flexWrap="wrap" mt="20px" p="20px" justifyContent="space-around">
      <img style={{ height: "200px", objectFit: "cover", maxWidth: "300px" }} src={product.photo}
           alt="photo" />

      <Box ml="30px" width="200px" height='100%'>
        <Typography variant="h4" fontSize="20px" textAlign="center"> {product.title}</Typography>
        <Typography variant="h6" m='5px 0'>Price: {product.price} rub</Typography>
        <Typography variant="h6">Quantity: {item.quantity} </Typography>

        <Box display='flex' justifyContent='space-around' mt='30px'>
          <Button variant="contained" color={"secondary"}
                  onClick={decreaseQuantity(item.id)}>-</Button>

          <Button variant="contained" color={"secondary"}
                  onClick={increaseQuantity(item.id)}>+</Button>
        </Box>

      </Box>

    </Box>
  )
}
