import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { APP_LOGO, DEFAULT_USER_AVATAR } from "../utils/constants";

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName, photoURL} = user;
                // console.log("user ====== "+user);
                dispatch(addUser({email: email, uid:uid, displayName:displayName, photoURL:photoURL}));  
                navigate("/browse");             
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        // unsubscribe when component unmounts
        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/")
        }).catch((error) => {
            console.log(error.message);
        });
    }

    const user = useSelector(store => store.user);

    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
            <img className="w-44" src={APP_LOGO} alt="logo" />
            {user && <div className="flex">
                <img className="w-10 h-10 my-5" src={user?.photoURL ?? DEFAULT_USER_AVATAR} alt="user-image" />
                <button className="font-bold mx-2 text-white" onClick={handleSignOut}>(Sign Out)</button>
            </div>}
        </div>
    )
}

export default Header;