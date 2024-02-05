import { Navigate } from "react-router-dom"
import { Box, FormGroup, Grid, Paper, TextField } from "@mui/material"
import React from "react"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useAuthForm } from "../lib/useAuthForm"
import GoogleIcon from "@mui/icons-material/Google"

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
    <Grid container justifyContent={"center"} marginTop={"150px"}>
      <Paper sx={{ padding: "40px", width: "330px" }}>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant={'h3'} sx={{ textAlign: "center", fontSize: "22px", fontWeight: "bold" }}>{title}</Typography>
            <TextField label="Email" type="email" margin="normal" variant={'standard'}
                       {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ?
              <Box sx={{ color: "red" }}>{formik.errors.email}</Box> : null}
            <TextField type="password" label="Password" margin="normal" variant={'standard'}
                       {...formik.getFieldProps("password")} />
            {formik.touched.password && formik.errors.password ?
              <Box sx={{ color: "red" }}>{formik.errors.password}</Box> : null}

            <Button type={"submit"} variant={"contained"} color={"inherit"} fullWidth
                    onClick={signInGoogleHandler} sx={{m: '10px 0 15px', height: '50px'}}>
              <GoogleIcon sx={{mr: '10px'}} />
              Login with Google
            </Button>

            <Button type={"submit"} variant={"contained"} color={"secondary"}
                    disabled={!(formik.isValid && formik.dirty)}>
              {buttonText}
            </Button>
          </FormGroup>
        </form>
      </Paper>
    </Grid>
  )
}