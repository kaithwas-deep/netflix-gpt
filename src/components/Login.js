import { useRef, useState } from "react";
import Header from "./Header";
import { checkSignInValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_POSTER_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [validationMessage, setValidationMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignIn = () => {
        setIsSignInForm(!isSignInForm);
    }

    const dispatch = useDispatch();

    const handleSignInFormBtn = () => {

        const message = checkSignInValidData(email?.current?.value, password?.current?.value);
        setValidationMessage(message);
        
        if(message) return;

        if(!isSignInForm){
            
            createUserWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: email?.current?.value, 
                        photoURL: USER_AVATAR
                    }).then(() => {
                        const user = auth.currentUser;
                        const {uid, email, displayName, photoURL} = user;
                       
                        dispatch(addUser({email: email, uid:uid, displayName:displayName, photoURL:photoURL}));
                        
                    }).catch((error) => {
                        
                        setValidationMessage(error.message);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    
                    setValidationMessage(errorCode+" - "+errorMessage);
                });
        }else{
            signInWithEmailAndPassword(auth, email?.current?.value, password?.current?.value)
                .then((userCredential) => {
                    // Signed in 
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    
                    setValidationMessage(errorCode+" - "+errorMessage);
                });

        }
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img src={BACKGROUND_POSTER_URL} alt="main-image" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="p-8 bg-black absolute w-3/12 text-white rounded-md left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-80">
                <h2 className="font-bold text-3xl mb-4">{isSignInForm ? "Sign In" : "Sign Up" }</h2>
                {!isSignInForm && (<input ref={name} type="text" placeholder="Full Name" className="p-2 my-2 w-full bg-gray-800 rounded-md" />)}
                <input ref={email} type="text" placeholder="Enter Email" className="p-2 my-2 w-full bg-gray-800 rounded-md" />
                <input ref={password} type="password" placeholder="Enter Password" className="p-2 my-2 w-full bg-gray-800 rounded-md" />
                <p className="text-red-600 font-bold text-md">{validationMessage}</p>
                <button className="p-2 my-4 w-full bg-red-600 font-bold rounded-md" onClick={handleSignInFormBtn}>{isSignInForm ? "Sign In" : "Sign Up" }</button>
                <p className="text-gray-600 font-medium cursor-pointer" onClick={toggleSignIn}>{!isSignInForm ? "Already registered?" : "New to Netflix?" }<span className="px-2 font-bold text-white">{!isSignInForm ? "Sign In now" : "Sign Up now" }</span></p>
            </form>
        </div>
    )
}

export default Login;