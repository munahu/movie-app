import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchMovies from "../hooks/useFetchMovies";
import Nav from "./Nav";
import Movie from "./Movie";
import styles from "../styles/Category.module.css";
import useGetStorage from "../hooks/useGetStorage";

function TopRated(props) {
        
    const [movieComponents, setMovieComponents] = useState();

    const [movies, setMovies] = useState();

    useEffect(() => {
        if (movies) {
            const movieList = [];
            props.location ? movies.length = 18 : movies.length = 9;
            movies.forEach((movie) => {
                const movieComponent =
                    <Movie key={movie.id} movie={movie} />
                movieList.push(movieComponent);
            });
            setMovieComponents(movieList);
        }
    }, [movies, props.location])

    const movieData = useFetchMovies("https://api.themoviedb.org/3/movie/top_rated?api_key=954e8e9ead7577d8b30eb1517b818530&language=en-US&page=1", "topRated");

    useEffect(() => {
        if (movieData) {
            setMovies(movieData);
        }
    }, [movieData])

    const storedMovies = useGetStorage("topRated");

    useEffect(() => {
        if (storedMovies) {
            setMovies(storedMovies)
        }
    }, [storedMovies])
    
    const [onTopRatedPage, setOnTopRatedPage] = useState(false);

    useEffect(() => {
        if (props.location && movieComponents) {
            setOnTopRatedPage(true);
            const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
            shuffleArray(movieComponents);
        }
    }, [props, movieComponents])

    if (movieComponents) {
        return (
            <div className={styles.category}>
                { onTopRatedPage && <Nav /> }
                <div className="wrapper">
                    <div className={styles.headingFlex}>
                        <span className={styles.heading}>Top Rated Movies</span>
                        {!onTopRatedPage && <Link to={"/top-rated"}>All Top Rated Movies</Link>}
                    </div>
                    <ul className={onTopRatedPage ? `${styles.movieList} ${styles.singleSection}` : `${styles.movieList}`}>
                        {movieComponents}
                    </ul>
                </div>
            </div>
        )
    } else {
        return null;
    };
}

export default TopRated