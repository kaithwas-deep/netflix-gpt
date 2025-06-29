import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { APP_LOGO, DEFAULT_USER_AVATAR, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName, photoURL} = user;
                
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
            navigate("/error")
        });
    }

    const user = useSelector(store => store.user);
    const gptSearchView = useSelector(store => store.gpt.gptSearchView);
    
    const handleGptSearchButtonClick = () => {
        dispatch(toggleGptSearchView());
    }

    // function handleLanguageChange(){
    //     console.log("asccas")
    // }

    const handleLanguageChange = (e) => {
        // console.log(e.target.value);
        dispatch(changeLanguage(e.target.value));
    }

    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
            <img className="w-44" src={APP_LOGO} alt="logo" />
            {user && <div className="flex">
                {
                    gptSearchView && <select className="bg-black text-white my-5 rounded-md border-white border-2" onChange={handleLanguageChange}>
                        {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
                    </select>

                }
                <button className="text-white font-bold m-5 bg-purple-700 px-3 py-0 rounded-md" onClick={handleGptSearchButtonClick}>{gptSearchView ? "Browse Movies" : "GPT Search"}</button>
                <img className="w-10 h-10 my-5 rounded-md" src={user?.photoURL ?? DEFAULT_USER_AVATAR} alt="user-image" />
                <button className="font-bold mx-2 text-white" onClick={handleSignOut}>(Sign Out)</button>
            </div>}
        </div>
    )
}

export default Header;