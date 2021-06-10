import { useEffect, useState } from "react";
import useGetStorage from "../shared/hooks/useGetStorage";
import useFetchMovies from "../shared/hooks/useFetchMovies";
import Nav from '../shared/components/Nav';
import Movie from "../shared/components/Movie";
import styles from "../shared/styles/Category.module.css";


function NowPlaying() {
    const [movieComponents, setMovieComponents] = useState();

    const [movies, setMovies] = useState();

    useEffect(() => {
        if (movies) {
            const movieList = [];
            movies.length = 12;
            movies.forEach((movie) => {
                const movieComponent =
                    <Movie key={movie.id} movie={movie} />
                movieList.push(movieComponent);
            });
            const shuffleMovies = (movieList) => {
                for (let i = movieList.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [movieList[i], movieList[j]] = [movieList[j], movieList[i]];
                };
            };
            shuffleMovies(movieList);
            setMovieComponents(movieList);
        }
    }, [movies])

    const movieData = useFetchMovies('https://api.themoviedb.org/3/movie/now_playing?api_key=5f8e2a6208ed991afa6dcc25efde0c2d&language=en-US&page=1', "now-playing");

    const storedMovies = useGetStorage("now-playing");

    useEffect(() => {
        if (storedMovies) {
            setMovies(storedMovies);
        } else {
            setMovies(movieData);
        }
    }, [storedMovies, movieData])

    if (movieComponents) {
        return (
            <>
                <Nav/>
                <div className="wrapper">
                    <div className={styles.category}>
                        <span className={styles.heading}>Now Playing</span>
                        <ul className={styles.movieList}>
                            {movieComponents}
                        </ul>
                    </div>
                </div>
            </>
        )
    } else {
        return null;
    };
}

export default NowPlaying