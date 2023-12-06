import {useAppDispatch} from '../../../../app/model/store';
import {authThunks} from '../../model/authSlice';
import {AuthForm, AuthProps} from '../AuthForm';


export const Login = () => {
    const dispatch = useAppDispatch();

    const handleLoginSubmit = (values: AuthProps) => {
        console.log('Login form submitted:', values);
        dispatch(authThunks.signIn(values));
    };

    return <AuthForm title={'Login'} buttonText="Login" onSubmit={handleLoginSubmit} />;
};