import MovieCard from "./MovieCard";

const MovieList = ({title, movies}) => {
    return (
        <div className="p-5 text-white">
            <h1 className="font-bold text-2xl mb-3">{title}</h1>
            <div className="flex overflow-x-auto no-scrollbar space-x-4">
                <div className="flex">
                    {movies?.map((movie) => <MovieCard key={movie.id} posterPath={movie.poster_path} title={movie.original_title} />)}
                </div>
            </div>
        </div>
    )
}

export default MovieList;