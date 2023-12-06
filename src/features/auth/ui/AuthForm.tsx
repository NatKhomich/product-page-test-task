import {useAppDispatch, useAppSelector} from '../../../app/model/store';
import {useFormik} from 'formik';
import {Navigate} from 'react-router-dom';
import {FormControl, FormGroup, Grid, Paper, TextField} from '@mui/material';
import React from 'react';
import Button from '@mui/material/Button';
import googleImg from '../../../common/image/registerGoogle.png'
import {authThunks} from '../model/authSlice';

type AuthFormProps = {
    title: string
    buttonText: string;
    onSubmit: (values: AuthProps) => void;
};

export type AuthProps = {
    email: string;
    password: string;
};

export const AuthForm = ({title, buttonText, onSubmit }: AuthFormProps) => {

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors = {} as AuthProps;
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else {
                if (values.password.length < 4) {
                    errors.password = 'Password must be at least 4 characters long';
                }
                if (!/^[a-zA-Z0-9]+$/.test(values.password)) {
                    errors.password = 'Password must contain only English letters and numbers';
                }
            }
            return errors;
        },
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    const signInGoogleHandler =  () => {
            dispatch(authThunks.signInGoogle());
        }

    if (isLoggedIn) {
        return <Navigate to={'/'} />;
    }

    return (
        <div>
            <Grid container justifyContent={'center'} marginTop={'150px'}>
                <Paper sx={{ padding: '40px' }}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormGroup>
                                <h3 style={{textAlign: 'center', fontSize: '20px'}}>{title}</h3>
                                <TextField label="Email" type="email" margin="normal"
                                           {...formik.getFieldProps('email')} />
                                {formik.touched.email && formik.errors.email ?
                                    <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
                                <TextField type="password" label="Password" margin="normal"
                                           {...formik.getFieldProps('password')} />
                                {formik.touched.password && formik.errors.password ?
                                    <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}

                                <div style={{ cursor: 'pointer' }} onClick={signInGoogleHandler}>
                                    <img src={googleImg} alt={'img'} style={{ width: '300px' }} />
                                </div>

                                <Button type={'submit'} variant={'contained'} color={'secondary'}
                                        disabled={!(formik.isValid && formik.dirty)}>
                                    {buttonText}
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
};