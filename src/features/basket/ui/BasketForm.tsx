import React from 'react';
import {Button, FormControl, FormGroup, Grid, Paper, TextField} from '@mui/material';
import {useFormik} from 'formik';

type BasketForm = {
    name: string;
    surname: string;
    address: string
    phone: number
};

export const BasketForm = () => {

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            address: '',
            phone: ''
        },
        validate: (values) => {
            const errors = {} as BasketForm
            if (!values.name) {
                errors.name = "Required"
            }
            if (!values.surname) {
                errors.surname = "Required"
            }
            if (!values.address) {
                errors.surname = "Required"
            }
            if (!values.phone) {
                errors.surname = "Required"
            }
            return errors
        },
        onSubmit: (values) => {
            console.log(values)
            // dispatch(authThunks.signIn(values))
        }
    })

    return (
        <div>
            <Grid container>
                <Paper sx={{padding: '40px'}}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormGroup>
                                <TextField label="name"
                                           type="name"
                                           margin="normal"
                                           {...formik.getFieldProps("name")}
                                />
                                {formik.touched.name && formik.errors.name ?
                                    <div style={{ color: "red" }}>{formik.errors.name}</div> : null}

                                <TextField type="surname"
                                           label="surname"
                                           margin="normal"
                                           {...formik.getFieldProps("surname")}
                                />
                                {formik.touched.surname && formik.errors.surname ?
                                    <div style={{ color: "red" }}>{formik.errors.surname}</div> : null}

                                <TextField type="address"
                                           label="address"
                                           margin="normal"
                                           {...formik.getFieldProps("address")}
                                />
                                {formik.touched.address && formik.errors.address ?
                                    <div style={{ color: "red" }}>{formik.errors.address}</div> : null}

                                <TextField type="phone"
                                           label="phone"
                                           margin="normal"
                                           {...formik.getFieldProps("phone")}
                                />
                                {formik.touched.phone && formik.errors.phone ?
                                    <div style={{ color: "red" }}>{formik.errors.phone}</div> : null}

                                <Button type={"submit"}
                                        variant={"contained"}
                                        color={"success"}
                                        disabled={!(formik.isValid && formik.dirty)}
                                >
                                    Order
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
};