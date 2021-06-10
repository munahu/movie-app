import { Link } from "react-router-dom";
import styles from "../styles/HiddenMenu.module.css";

function HiddenMenu(props) {
    return (
        <div className={styles.hiddenMenu}>
            <ul>
                <Link to="/" onClick={props.handleCloseClick}>
                    <li>Home</li>
                </Link>
                <Link to="/trending" onClick={props.handleCloseClick}>
                    <li>Trending</li>
                </Link>
                <Link to="/top-rated" onClick={props.handleCloseClick}>
                    <li>Top Rated</li>
                </Link>
                <Link to="/now-playing" onClick={props.handleCloseClick}>
                    <li>Now Playing</li>
                </Link>   
                <Link to="/watchlist" onClick={props.handleCloseClick}>
                    <li>Watchlist</li>
                </Link>   
            </ul>      
            <div onClick={props.handleCloseClick} className={styles.close}>
                <span className={`${styles.line} ${styles.line1}`}></span>
                <span className={styles.line}></span>
            </div>
        </div>
    )
}

export default HiddenMenu
