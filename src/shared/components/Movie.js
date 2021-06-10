import { Link } from 'react-router-dom';
import Genre from '../../selected movie/components/Genre';
import useGetYear from '../../shared/hooks/useGetYear';
import star from '../../assets/star.png';
import styles from '../styles/Movie.module.css';

function Movie(props) {
    
    const handleClick = () => {
        document.body.classList.remove('lock');
        document.body.classList.remove('darken');
    }
    
    return (
        <div id={props.movie.id} className={styles.movie}>
            <Link to={`/${props.movie.id}`} onClick={handleClick}>
                <img
                className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
                alt={props.movie.title}
                />
            </Link>
            <Link to={`/${props.movie.id}`} onClick={handleClick}>
                <p className={styles.title}>
                    <span>{props.movie.title} ({useGetYear(props.movie.release_date)})</span>
                </p>
            </Link>
            <div className={styles.info}>
            <span>
                <Genre genreIds={props.movie.genre_ids}/>
            </span>
            <div className={styles.rating}>
                <img src={star} alt="star" />
                <span>{props.movie.vote_average}/10</span>
                <span>({props.movie.vote_count})</span>
            </div>
            </div>
        </div>
    );
}

export default Movie