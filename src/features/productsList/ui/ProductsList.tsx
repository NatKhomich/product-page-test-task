import React, { useEffect } from "react"
import { Product } from "./Product/Product"
import { Box, Grid, Paper } from "@mui/material"
import { Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/model/store"
import { selectAuthIsLoggedIn } from "../../auth/model/authSelectors"
import { selectProductList } from "../model/productSelectors"
import { productThunks } from "../model/productSlice"

export const ProductsList = () => {

  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
  const productList = useAppSelector(selectProductList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(productThunks.fetchProductList())
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <Box display='flex' flexWrap='wrap' justifyContent='space-evenly' mt='80px'>
      {productList.map(p => {
        return (
          <Grid item key={p.id}>
            <Paper>
              <Product item={p} />
            </Paper>
          </Grid>
        )
      })}
    </Box>
  )
}

