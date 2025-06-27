import { MOVIE_POSTER_URL } from "../utils/constants";

const MovieCard = ({posterPath, title}) => {
    return (
        <div className="min-w-[180px] ml-5 cursor-pointer">
            <img src={MOVIE_POSTER_URL+posterPath} alt={title} />
        </div>
    )
}

export default MovieCard;