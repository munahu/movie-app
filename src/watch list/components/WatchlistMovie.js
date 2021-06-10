import useGetYear from "../../shared/hooks/useGetYear";
import deleteIcon from "../../assets/deleteIcon.png";
import styles from "../styles/WatchlistMovie.module.css";

function WatchlistMovie(props) {
    return (
        <div id={props.movie.id} className={styles.movie}>
            <img 
                onClick={props.handleClick}
                className={styles.deleteIcon}
                src={deleteIcon}
                alt="delete"/>
            <div>
                <img
                    className={styles.poster}
                    src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
                    alt={props.movie.title}
                />
            </div>
            <div>
                <p className={styles.title}>
                    <span>{props.movie.title} ({useGetYear(props.movie.release_date)})</span>
                </p>
            </div>
        </div>
    );
}

export default WatchlistMovie