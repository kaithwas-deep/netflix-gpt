import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
    const language = useSelector(store => store.config.lang);
    return (
        <div className="pt-[10%] flex justify-center">
            <form className=" bg-gray-800 p-3 text-white w-1/2 rounded-md">
                <input className="border-2 border-black w-10/12 p-2 rounded-md" type="text" placeholder={lang[language].gptSearchPlaceHolder} />
                <button className="bg-red-700 py-2 px-6 ml-4 font-bold rounded-md">{lang[language].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar;