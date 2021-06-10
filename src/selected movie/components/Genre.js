import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import genres from "../../shared/genres";
import styles from "../styles/SelectedMovie.module.css";

function Genre(props) {  
    const [genreNames, setGenresNames] = useState([]);
    
    useEffect(() => {
        if (props.genreIds) {
            const getGenreNames = () => {
                const genreNames = [];
                props.genreIds.forEach(genreId => {
                    //genres data comes from file with id and corresponding genre names
                    genres.forEach((genre) => {
                        if (genre.id === genreId) {
                            genreNames.push(genre.name);
                        };
                    });
                });
                setGenresNames(genreNames);
            }
            getGenreNames();
        }
    }, [props])
    
    
    const [genresToDisplay, setGenresToDisplay] = useState();
    
    useEffect(() => {
        if (genreNames) {
            const toDisplay = genreNames.map((genreName) => {
                return <span className={styles.genre} key={uuidv4()}>{genreName}</span>
            });
            setGenresToDisplay(toDisplay);
        };
    }, [genreNames]);

    
    return (
        [genresToDisplay]
    )
}

export default Genre