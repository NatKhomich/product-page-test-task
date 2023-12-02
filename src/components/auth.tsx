import React, {useState} from 'react';
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import {auth, googleProvider} from '../config/firebase';

export const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInHandler = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
            console.log(e);
        }
    };

    const signInGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (e) {
            console.log(e);
        }
    };

    const logoutHandler = async () => {
        try {
            await signOut(auth);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <h2>Login Page</h2>
            <input
                placeholder={'Email'}
                onChange={(e) => {
                    setEmail(e.currentTarget.value);
                }}
            />
            <input
                placeholder={'Password'}
                type="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <button onClick={signInHandler}>Sign In</button>
            <div>
                <button onClick={signInGoogle}>Sign In With Google</button>
            </div>

            <div>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    );
};