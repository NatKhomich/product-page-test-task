import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import { useAppDispatch, useAppSelector } from "../../model/store"
import { authThunks } from "../../../features/auth/model/authSlice"
import { useNavigate } from "react-router-dom"
import { Box } from "@mui/material"

export const Header = () => {

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const total = useAppSelector((state) => state.basket.total)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(authThunks.logout())
  }

  const openProductHandler = () => {
    navigate("/")
  }

  const openBasketHandler = () => {
    navigate("/basket")
  }

  return (
    <AppBar sx={{ background: "#563c86", position: "fixed" }}>
      <Toolbar>
        <Typography onClick={openProductHandler} variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
          Handiwork page
        </Typography>
        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
        {isLoggedIn && <Box onClick={openBasketHandler} sx={{ cursor: "pointer" }}>
          <AddShoppingCartIcon sx={{ width: "100px" }} />
          {total > 0 && <Box sx={{ marginLeft: "25px" }}>{total}</Box>}
        </Box>}
      </Toolbar>
    </AppBar>
  )
}

