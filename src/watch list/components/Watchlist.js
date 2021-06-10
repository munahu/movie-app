import { useEffect, useState } from "react";
import Nav from "../../shared/components/Nav";
import WatchlistMovie from "./WatchlistMovie";
import "../../App.css";
import styles from "../styles/Watchlist.module.css";

function Watchlist() {
    const [movies, setMovies] = useState([]);
    const [movieComponents, setMovieComponents] = useState();

    useEffect(() => {
        const displayMovies = () => {
            const storedMovies = JSON.parse(localStorage.getItem("watchlist"));
            if (storedMovies) {
                const movies = storedMovies.map((movie) => {
                    return (
                        <WatchlistMovie
                            movie={movie}
                            key={movie.id}
                            handleClick={removeMovie} />
                    )
                });
                setMovieComponents(movies);
            };
        };
        displayMovies();
    }, [movies])


    const removeMovie = (e) => {
        const movieId = e.target.parentElement.id;
        const storedMovies = JSON.parse(localStorage.getItem("watchlist"));
        storedMovies.forEach(movie => {
            if (JSON.stringify(movie.id) === movieId) {
                let index = storedMovies.indexOf(movie);
                if (index >= 0) {
                    storedMovies.splice(index, 1);
                    localStorage.setItem("watchlist", JSON.stringify(storedMovies));
                };
            };
        });
        setMovies(storedMovies);
    }

    if (movieComponents && movieComponents.length > 0) {
        return (
            <>
                <Nav />
                <div className="wrapper">
                    <div className={styles.category}>
                        <h1 className={styles.heading}>Watchlist</h1>
                        <ul className={styles.movieList}>
                            {movieComponents}
                        </ul>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Nav />
                <div className="wrapper">
                    <div className={styles.category}>
                        <h1 className={styles.heading}>Watchlist</h1>
                        <p className={styles.emptyMessage}>Your watchlist is empty.</p>
                    </div>
                </div>
            </>
        )
    };
}

export default Watchlist
