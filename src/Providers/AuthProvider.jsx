import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext()
const auth = getAuth(app);


const AuthProvider = ({children}) => {

    const[user, setUser] = useState(null)
    const[loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser);

            // to get the token commonly for sign,signout, register we do this
            const userEmail = currentUser?.email|| user?.email;
            const loggedUser = {email: userEmail};
            if(currentUser){
              axios.post('http://localhost:5173/jwt', loggedUser, {useCredentials:true})
              .then(res => console.log(res.data))
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo ={
        user,
        loading,
        createUser, 
        signIn, 
        logOut
    }
    

    return (
        <AuthContext.Provider value ={authInfo}>
           {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;