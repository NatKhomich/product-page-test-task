import React, { useEffect } from "react"
import { Product } from "./Product/Product"
import { Box, Grid, Paper } from "@mui/material"
import { Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/model/store"
import { productThunks } from "../model/productSlice"
import styles from "./ProductsList.module.css"
import { selectAuthIsLoggedIn } from "../../auth/model/authSelectors"
import { selectProductList } from "../model/productSelectors"

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
    <Box className={styles.lists}>
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

