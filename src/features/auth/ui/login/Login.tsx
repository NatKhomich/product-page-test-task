import React from 'react';
import {Button, FormControl, FormGroup, Grid, Paper, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../../../app/model/store';
import {authThunks} from '../../model/authSlice';
import googleImg from '../../../../common/image/registerGoogle.png'
import {auth, googleProvider} from '../../../../config/firebase';
import {signInWithPopup} from 'firebase/auth';
import {Navigate} from 'react-router-dom';

export type RegistrationProps = {
    email: string;
    password: string;
};

export const Login = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: (values) => {
            const errors = {} as RegistrationProps
            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }

            if (!values.password) {
                errors.password = "Required"
            } else {
                if (values.password.length < 4) {
                    errors.password = "Password must be at least 4 characters long"
                }
                if (!/^[a-zA-Z0-9]+$/.test(values.password)) {
                    errors.password = "Password must contain only English letters and numbers"
                }
            }
            return errors
        },
        onSubmit: (values) => {
            console.log(values)
            dispatch(authThunks.signIn(values))
        }
    })

    const signInGoogleHandler = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (e) {
            console.log(e);
        }
    };

    if (isLoggedIn) {
        return <Navigate to={"/"} />
    }

    return (
        <div>
            <Grid container justifyContent={"center"} marginTop={'150px'}>
                <Paper sx={{padding: '40px'}}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormGroup>
                                <TextField label="Email"
                                           type="email"
                                           margin="normal"
                                           {...formik.getFieldProps("email")}
                                />
                                {formik.touched.email && formik.errors.email ?
                                    <div style={{ color: "red" }}>{formik.errors.email}</div> : null}
                                <TextField type="password"
                                           label="Password"
                                           margin="normal"
                                           {...formik.getFieldProps("password")}
                                />
                                {formik.touched.password && formik.errors.password ?
                                    <div style={{ color: "red" }}>{formik.errors.password}</div> : null}

                                <div style={{cursor: 'pointer'}} onClick={signInGoogleHandler}>
                                    <img src={googleImg} alt="register" style={{width: '300px'}}/>
                                </div>

                                <Button type={"submit"}
                                        variant={"contained"}
                                        color={"success"}
                                        disabled={!(formik.isValid && formik.dirty)}
                                >
                                    Login
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
};