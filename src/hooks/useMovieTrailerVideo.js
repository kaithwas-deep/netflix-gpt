import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailerVideo = (movieId) => {
    const dispatch = useDispatch();
    const getMovieVideos = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US', API_OPTIONS);
        const jsonData = await data.json();
        const movieTrailers = jsonData?.results.filter(video => video.type === "Trailer");
        const movieTrailer = movieTrailers.length ? movieTrailers[1] : jsonData?.results[0];
        dispatch(addMovieTrailerVideo(movieTrailer));
    }

    useEffect(() => {
        getMovieVideos();
    }, [])
}

export default useMovieTrailerVideo;