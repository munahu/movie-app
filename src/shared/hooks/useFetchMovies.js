import { useState, useEffect } from 'react';

function useFetchMovies(url, name) {
    const [movies, setMovies] = useState();
    
    useEffect(() => {
      if (localStorage.getItem(name) === null) {
        async function getMovies() {
          try {
            const response = await fetch(url);
            const data = await response.json();
            cleanUp(data.results);
          } catch (error) {
            console.log(error);
          }
        }
          getMovies();
      };
      
      const cleanUp = (movies) => {
        const movieList = [];
        movies.forEach(movie => {
          const movieObj = {
            id: movie.id,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            genre_ids: movie.genre_ids,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count
          }

          if (movieObj.id
            && movieObj.poster_path
            && movieObj.backdrop_path
            && movieObj.title
            && movieObj.overview
            && movieObj.release_date
            && movieObj.genre_ids
            && movieObj.vote_average
            && movieObj.vote_count) {
            movieList.push(movieObj);
          }
        });
        setMovies(movieList);
        localStorage.setItem(name, JSON.stringify(movieList));
      }  
      
    }, [url, name]) 
    
    return movies;
}

export default useFetchMovies;