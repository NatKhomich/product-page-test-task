import React, { useEffect } from "react"
import { Header } from "./Header/Header"
import { useAppDispatch, useAppSelector } from "../model/store"
import { authThunks } from "../../features/auth/model/authSlice"
import { Box, CircularProgress, LinearProgress } from "@mui/material"
import { ErrorSnackbar } from "../../components/ErrorSnackbar/ErrorSnackbar"
import { selectAppIsInitialized, selectAppStatus } from "../model/appSelectors"
import { Routing } from "./Routing/Routing"


function App() {

  const status = useAppSelector(selectAppStatus)
  const isInitialized = useAppSelector(selectAppIsInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.checkAuthStatus({}))
  }, [])

  if (!isInitialized) {
    return <Box sx={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
      <CircularProgress />
    </Box>
  }

  return (
    <>
      <Header />
      {status === "loading" && <LinearProgress color={"primary"} />}
      <Routing />
      <ErrorSnackbar />
    </>
  )
}

export default App