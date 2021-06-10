import { useEffect, useState } from "react";
import sectionStyles from "../styles/SelectedMovie.module.css";
import styles from "../styles/Cast.module.css";

function Cast(props) {
    const [castImages, setCastImages] = useState();
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.movieId}/credits?api_key=5f8e2a6208ed991afa6dcc25efde0c2d&language=en-US`)
        .then(response => response.json())
        .then(data => getCastImages(data.cast));
    }, [props])
    
    const getCastImages = (cast) => {
        cast.length = 5;
        localStorage.setItem("cast", JSON.stringify(cast));
        const castImagesToDisplay = cast.map(actor => {
            if (actor.profile_path) {
                return (
                    <div key={actor.id} className={styles.actor}>
                        <img 
                            className={styles.image}
                            alt={actor.name}
                            src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}/>
                        <span className={styles.name}>{actor.name}</span>
                    </div>
                ) 
            } else {
                return null
            };
        });
        setCastImages(castImagesToDisplay);
        };
    
    return (
        <div className={sectionStyles.section}>
            <p className={`${sectionStyles.heading}`}>Cast</p>
            <div className={styles.cast}>
                {castImages}
            </div>
        </div>
    )
}

export default Cast