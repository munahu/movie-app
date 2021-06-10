import { useEffect, useState } from "react";
import useGetStorage from "../../shared/hooks/useGetStorage";
import Nav from "../../shared/components/Nav";
import Genre from "./Genre";
import Cast from "./Cast";
import RecommendedMovies from "./RecommendedMovies";
import "../../App.css";
import styles from "../styles/SelectedMovie.module.css";
import star from "../../assets/star.png";


function SelectedMovie(props) {
  
  const trending = useGetStorage("trending");
  const topRated = useGetStorage("topRated");
  
  const [movie, setMovie] = useState();
  
  const [year, setYear] = useState();
  
  useEffect(() => {
    if (trending && topRated) {
      const movies = [...trending, ...topRated];
      movies.forEach(movie => {
        if (JSON.stringify(movie.id) === props.match.params.id) {
          setMovie(movie);
          getYear(movie.release_date);
        };
      });
    } else {
      fetch(`https://api.themoviedb.org/3/movie/${props.match.params.id}?api_key=5f8e2a6208ed991afa6dcc25efde0c2d&language=en-US`)
      .then(response => response.json())
      .then(data => {
        setMovie(data);
        getYear(data.release_date);
      })
      
    }
  }, [trending, topRated, props.match.params.id])
  
  const getYear = (date) => {
    date = date.split("-");
    setYear(date[0]);
  }
  
  const addToWatchlist = () => {
    if (localStorage.watchlist) {
      const watchlist = JSON.parse(localStorage.getItem("watchlist"));
      watchlist.push(movie);
      const uniqueList = [...watchlist.reduce((map, movie) => 
          map.set(movie.id, movie), new Map()).values()];
      localStorage.setItem("watchlist", JSON.stringify(uniqueList));
    } else {
      const watchlist = [];
      watchlist.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }
  
  const handleRecommendedMovieClick = (e) => {
    if (e.target.tagName === "IMG") {
      const movieId = e.target.parentNode.parentNode.id;
      getRecommendedMovieInfo(movieId);
    } else {
      const movieId = e.target.parentNode.parentNode.parentNode.id;
      getRecommendedMovieInfo(movieId);
    }
  }
  
  const getRecommendedMovieInfo = (movieId) => {
    const recommendedMovies = JSON.parse(localStorage.getItem("recommendedMovies"));
    recommendedMovies.forEach(movie => {
      if (JSON.stringify(movie.id) === movieId) {
        setMovie(movie);
        getYear(movie.release_date);
      }
    });
  }
  
  if (movie) {
    return (
      <>
        <Nav/>
        <div className={styles.wrapper}>
          <div className={styles.flexParent}>
            <div className={styles.poster}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>
            </div>
            <div className={styles.movieInfo}>
              <Genre genreIds={movie.genre_ids}/>
              <p className={styles.title}>{movie.title} ({year}) </p>
              <span className={styles.review}>
                 <img src={star} alt=""/>
                  {movie.vote_average}/10 ({movie.vote_count})
              </span>
              <div className={styles.section}>
                <p className={styles.heading}>Description</p>
                <span className={styles.description}>{movie.overview}</span>
             </div>
             <Cast movieId={movie.id}/>
              <button className={styles.desktopButton} onClick={addToWatchlist}>
                Add To Watchlist
              </button>
              <RecommendedMovies movieId={movie.id} handleClick={handleRecommendedMovieClick}/>
            </div>
              <button className={styles.mobileButton} onClick={addToWatchlist}>
                Add To Watchlist
              </button>
          </div>
        </div>
      </>
    )
  } else {
    return null;
  };
}

export default SelectedMovie;