import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sectionStyles from "../styles/SelectedMovie.module.css";
import styles from "../styles/RecommendedMovies.module.css";

function RecommendedMovies(props) {
    const [movies, setMovies] = useState();
        
    useEffect(() => {
        if (props) {
            fetch(`https://api.themoviedb.org/3/movie/${props.movieId}/similar?api_key=5f8e2a6208ed991afa6dcc25efde0c2d&language=en-US&page=1`)
            .then(response => response.json())
            .then(data => getRecommendedMovies(data.results));
        };
        
        const getRecommendedMovies = (movies) => {
            if (movies.length > 0) {
                movies.length = 10;
                localStorage.setItem("recommendedMovies", JSON.stringify(movies));
                const moviesToDisplay = movies.map(movie => {
                    let overview = movie.overview;
                    let sentences = overview.split(".");
                    if (movie.title && movie.overview && movie.poster_path) {
                        return (
                            <div id={movie.id} key={movie.id} className={styles.movie}>
                                <Link to={`/${movie.id}`}>
                                    <img
                                        alt={movie.title}
                                        className={styles.poster}
                                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                        onClick={props.handleClick} />
                                </Link>
                                <div className={styles.text}>
                                    <Link to={`/${movie.id}`}>
                                        <span
                                            className={styles.title}
                                            onClick={props.handleClick}>{movie.title}
                                        </span>
                                    </Link>
                                    <span className={styles.description}>{sentences[0]}.</span>
                                </div>
                            </div>
                        );
                    } else {
                        return null
                    }
                });
                setMovies(moviesToDisplay);
            };
        };
        
    }, [props])
    
    if (movies) {
        return (
            <div className={`${sectionStyles.section}`}>
                <p className={`${sectionStyles.heading} ${styles.heading}`}>Recommended Movies</p>
                <div className={styles.movies}>
                    {movies}
                </div>
            </div>
        )
    } else {
        return null
    };
}

export default RecommendedMovies