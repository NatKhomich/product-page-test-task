import { useAppDispatch } from "../../../../app/model/store"
import { authThunks } from "../../model/authSlice"
import { AuthForm, AuthProps } from "../AuthForm"


export const Login = () => {

  const dispatch = useAppDispatch()

  const handleLoginSubmit = (values: AuthProps) => {
    dispatch(authThunks.signIn(values))
  }

  return <AuthForm title={"Log in to account"} buttonText="Login" onSubmit={handleLoginSubmit} />
}