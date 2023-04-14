import React, { useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.init';

const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();


    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser)
            })
            .catch(error => {
                console.log('error: ', error);
            })
    }
    const handleGoogleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            { user?
            <button onClick={handleGoogleSignOut}>Sign Out</button>
            :
            <button onClick={handleGoogleSignIn}>google login</button>}
            <h2>User: {user ? user.displayName : 'No user'}</h2>
        </div>
    );
};

export default Login;