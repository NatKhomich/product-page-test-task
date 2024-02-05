import { useAppDispatch } from "../../../../app/model/store"
import { authThunks } from "../../model/authSlice"
import { AuthForm, AuthProps } from "../AuthForm"

export const Register = () => {

  const dispatch = useAppDispatch()

  const handleRegisterSubmit = (values: AuthProps) => {
    dispatch(authThunks.register(values))
  }

  return <AuthForm title={"Registration"} buttonText="Register" onSubmit={handleRegisterSubmit} />
}