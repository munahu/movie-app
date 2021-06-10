import { useState } from "react";
import { Link } from "react-router-dom";
import HiddenMenu from "./HiddenMenu";
import styles from "../styles/Nav.module.css";
import hamburgerIcon from "../../assets/hamburgerIcon.png";

function Nav() {
    
    // Disable scrolling when nav is open
    const [navClicked, setNavClicked] = useState(false);

    const handleNavClick = () => {
        setNavClicked(true);
        document.body.classList.add('lock');
        document.body.classList.add('darken');
    }

    // Allow for scrolling again when nav is closed
    const handleCloseClick = () => {
        setNavClicked(false);
        document.body.classList.remove('lock');
        document.body.classList.remove('darken');
    }
    
    return (
        <div className="wrapper">
            <div className={styles.nav}>
                <img 
                    className={styles.hamburgerIconImg}
                    onClick={handleNavClick}
                    src={hamburgerIcon} alt=""/>
                {navClicked && <HiddenMenu handleCloseClick={handleCloseClick}/>}
                <ul className={styles.visibleNav}>
                    <Link to="/trending">
                        <li>Trending</li>
                    </Link>
                    <Link to="/top-rated">
                        <li>Top Rated</li>
                    </Link>
                    <Link to="/now-playing">
                        <li>Now Playing</li>
                    </Link>
                    <Link to="/watchlist">
                        <li>Watchlist</li>
                    </Link>
                </ul>  
            </div>
        </div>
    )
}

export default Nav