import { Navigate } from "react-router-dom"
import { Box, FormControl, FormGroup, Grid, Paper, TextField } from "@mui/material"
import React from "react"
import Button from "@mui/material/Button"
import googleImg from "../../../common/image/registerGoogle.png"
import Typography from "@mui/material/Typography"
import { useAuthForm } from "../lib/useAuthForm"

type AuthFormProps = {
  title: string
  buttonText: string
  onSubmit: (values: AuthProps) => void
};

export type AuthProps = {
  email: string
  password: string
};

export const AuthForm = ({ title, buttonText, onSubmit }: AuthFormProps) => {

  const { isLoggedIn, formik, signInGoogleHandler } = useAuthForm({
    onSubmit: (values) => {
      onSubmit(values)
    }
  })

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <div>
      <Grid container justifyContent={"center"} marginTop={"150px"}>
        <Paper sx={{ padding: "40px" }}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormGroup>
                <Typography sx={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>{title}</Typography>
                <TextField label="Email" type="email" margin="normal"
                           {...formik.getFieldProps("email")} />
                {formik.touched.email && formik.errors.email ?
                  <Box sx={{ color: "red" }}>{formik.errors.email}</Box> : null}
                <TextField type="password" label="Password" margin="normal"
                           {...formik.getFieldProps("password")} />
                {formik.touched.password && formik.errors.password ?
                  <Box sx={{ color: "red" }}>{formik.errors.password}</Box> : null}

                <Box sx={{ cursor: "pointer" }} onClick={signInGoogleHandler}>
                  <img src={googleImg} alt={"img"} style={{ width: "300px" }} />
                </Box>

                <Button type={"submit"} variant={"contained"} color={"secondary"}
                        disabled={!(formik.isValid && formik.dirty)}>
                  {buttonText}
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}