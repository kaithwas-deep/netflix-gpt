import { BACKGROUND_POSTER_URL } from "../utils/constants";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
    return (
        <div>
            <div className="absolute -z-10">
                <img src={BACKGROUND_POSTER_URL} alt="main-image" />
            </div>
            <GptSearchBar />
        </div>
    )
}

export default GptSearch;