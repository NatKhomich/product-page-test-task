import React from "react"
import { Box, Button } from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import { useAppDispatch } from "../../../../app/model/store"
import { basketActions } from "../../../basket/model/basketSlice"
import { ProductProps } from "../../model/productSlice"
import Typography from "@mui/material/Typography"

export type Props = {
  item: Partial<ProductProps>
}

export const Product = ({ item }: Props) => {

  const dispatch = useAppDispatch()

  const addToBasketHandler = (id: string, price: number) => () => {
    dispatch(basketActions.addToBasket({ id, price }))
  }

  return (
    <Box p='25px' m='20px 10px'>
      <Typography variant='h5' mb='15px' textAlign='center'>{item.title}</Typography>
      <img style={{width: '250px', height:'280px', objectFit: 'cover'}} src={item.photo} alt="photo" />
      <Typography m={'10px 0'}>{item.description}</Typography>
      <Typography variant='h6' m='0 0 10px'>Price: {item.price} rub</Typography>

      <Button variant={"contained"} color={"secondary"}
              onClick={addToBasketHandler(item.id ? item.id : "", item.price ? item.price : 0)}>
        Add to cart
        <AddShoppingCartIcon sx={{ width: "100px" }} />
      </Button>
    </Box>
  )
}
