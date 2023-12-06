import React from 'react';
import {Button, FormControl, FormGroup, Grid, Paper, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../../app/model/store';
import {BasketItemType, basketProductActions} from '../model/basketProductSlice';

type BasketForm = {
    name: string;
    surname: string;
    address: string
    phone: number | string
};

export type OrderData = {
    items: BasketItemType[];
    total: number;
    name: string;
    surname: string;
    address: string;
    phone: string;
}

export const BasketForm = () => {

    const items = useAppSelector((state) => state.basket.items);
    const total = useAppSelector((state) => state.basket.total);
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            address: '',
            phone: '',
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
                errors.address = "Required"
            }
            if (!values.phone) {
                errors.phone = "Required"
            }
            return errors
        },
        onSubmit: (values) => {
            const orderData = {
                ...values,
                items: items,
                total: total,
            };
            // console.log('Order placed:', values);
            dispatch(basketProductActions.orderToSend(orderData))
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
                                           margin="normal"
                                           {...formik.getFieldProps("name")}
                                />
                                {formik.touched.name && formik.errors.name ?
                                    <div style={{ color: "red" }}>{formik.errors.name}</div> : null}

                                <TextField label="surname"
                                           margin="normal"
                                           {...formik.getFieldProps("surname")}
                                />
                                {formik.touched.surname && formik.errors.surname ?
                                    <div style={{ color: "red" }}>{formik.errors.surname}</div> : null}

                                <TextField label="address"
                                           margin="normal"
                                           {...formik.getFieldProps("address")}
                                />
                                {formik.touched.address && formik.errors.address ?
                                    <div style={{ color: "red" }}>{formik.errors.address}</div> : null}

                                <TextField label="phone"
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