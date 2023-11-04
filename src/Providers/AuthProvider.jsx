import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext()
const auth = getAuth(app);


const AuthProvider = ({children}) => {
    
//   const location = useLocation();
//   const navigate = useNavigate();

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
              axios.post(' https://car-doctor-server-teal-three.vercel.app/jwt', loggedUser, {withCredentials:true})
              .then(res =>
                {
                    // if (res.data) {
                    //     navigate(location?.state ? location?.state : '/')
                    // }
                    console.log(res.data)
                }
                )
              
            }
            else{
                axios.post(' https://car-doctor-server-teal-three.vercel.app/logout', loggedUser, {useCredentials:true})
              .then(res => console.log('after log out', res.data))
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