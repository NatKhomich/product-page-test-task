import React from "react"
import { Box, Button, FormControl, FormGroup, Grid, Paper, TextField } from "@mui/material"
import { BasketItemType } from "../model/basketSlice"
import { useBasketForm } from "../lib/useBasketForm"

export type OrderData = {
  items: BasketItemType[]
  total: number
  name: string
  surname: string
  address: string
  phone: string
}

export const BasketForm = () => {

  const { formik } = useBasketForm()

  return (
    <Grid container>
      <Paper sx={{ padding: "40px" }}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormGroup>
              <TextField label="name" margin="normal"{...formik.getFieldProps("name")} />
              {formik.touched.name && formik.errors.name ?
                <Box sx={{ color: "red" }}>{formik.errors.name}</Box> : null}

              <TextField label="surname" margin="normal"{...formik.getFieldProps("surname")} />
              {formik.touched.surname && formik.errors.surname ?
                <Box sx={{ color: "red" }}>{formik.errors.surname}</Box> : null}

              <TextField label="address" margin="normal"{...formik.getFieldProps("address")} />
              {formik.touched.address && formik.errors.address ?
                <Box sx={{ color: "red" }}>{formik.errors.address}</Box> : null}

              <TextField label="phone" margin="normal"{...formik.getFieldProps("phone")} />
              {formik.touched.phone && formik.errors.phone ?
                <Box sx={{ color: "red" }}>{formik.errors.phone}</Box> : null}

              <Button type={"submit"} variant={"contained"} color={"success"}
                      disabled={!(formik.isValid && formik.dirty)}>
                Order
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Paper>
    </Grid>
  )
}