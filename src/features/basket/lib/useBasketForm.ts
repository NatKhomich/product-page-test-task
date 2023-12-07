import { useAppDispatch, useAppSelector } from "../../../app/model/store"
import { useFormik } from "formik"
import { basketActions } from "../model/basketSlice"
import { selectBasketItems, selectBasketTotal } from "../model/basketSelectors"

type BasketForm = {
  name: string
  surname: string
  address: string
  phone: number | string
}

export const useBasketForm = () => {

  const basketItems = useAppSelector(selectBasketItems)
  const total = useAppSelector(selectBasketTotal)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      address: "",
      phone: ""
    },
    validate: (values) => {
      const errors = {} as BasketForm
      if (!values.name) errors.name = "Required"
      if (!values.surname) errors.surname = "Required"
      if (!values.address) errors.address = "Required"
      if (!values.phone) errors.phone = "Required"
      return errors
    },
    onSubmit: (values) => {
      const orderData = {
        ...values,
        items: basketItems,
        total: total
      }
      dispatch(basketActions.orderToSend(orderData))
    }
  })

  return {
    formik
  }
}