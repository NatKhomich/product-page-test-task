import { useAppDispatch, useAppSelector } from "../../../app/model/store"
import { selectAuthIsLoggedIn } from "../model/authSelectors"
import { useFormik } from "formik"
import { authThunks } from "../model/authSlice"
import { AuthProps } from "../ui/AuthForm"

type Props = {
  onSubmit: (values: AuthProps) => void;
}

export const useAuthForm = ({ onSubmit }: Props) => {

  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate: (values) => {
      const errors = {} as AuthProps
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
      onSubmit(values)
    }
  })

  const signInGoogleHandler = () => {
    dispatch(authThunks.signInGoogle())
  }

  return {
    formik, isLoggedIn, signInGoogleHandler
  }
}