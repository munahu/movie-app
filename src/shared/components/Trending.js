import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchMovies from "../hooks/useFetchMovies";
import Nav from "./Nav";
import Movie from "./Movie";
import styles from "../styles/Category.module.css";
import useGetStorage from "../hooks/useGetStorage";


function Trending(props) {
    
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
    
    const movieData = useFetchMovies('https://api.themoviedb.org/3/trending/all/day?api_key=5f8e2a6208ed991afa6dcc25efde0c2d', "trending");
    
    useEffect(() => {
        if (movieData) {
            setMovies(movieData);
        }
    }, [movieData])
    
    const storedMovies = useGetStorage("trending");
    
    useEffect(() => {
        if (storedMovies) {
            setMovies(storedMovies)
        }
    }, [storedMovies])
    
    const [onTrendingPage, setOnTrendingPage] = useState(false);

    useEffect(() => {
        if (props.location && movieComponents) {
            setOnTrendingPage(true);
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
                { onTrendingPage && <Nav/> }
                <div className="wrapper">
                    <div className={styles.headingFlex}>
                        <span className={styles.heading}>Trending Movies</span>
                        { !onTrendingPage && <Link to={"/trending"}>All Trending Movies</Link>}
                    </div>
                    <ul className={styles.movieList}>
                        {movieComponents}
                    </ul>
                </div>
            </div>
        )
    } else {
        return null;
    };
}

export default Trending