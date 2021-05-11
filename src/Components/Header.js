import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
// import {MovieContext, TVContext, onPageLoadMoviesContext, onPageLoadTVContext} from '../Context';

export default function Header() {
  const focusOnTVShowsButton = useRef(null);

  useEffect( () => {
    focusOnTVShowsButton.current.focus();
  }, []);

    return (
        <div className = "navbar">
        <header>
          
          <Link to = "/movies"> 
            <button id = "moviesbtn"  className = "button2 b-orange rot-135"
            > Movies</button> 
          </Link>

          <Link to = "/tv">
            <button id = "tvbtn" className = "button2 b-red rot-135"
            ref = {focusOnTVShowsButton}
            >TV Shows</button> 
          </Link>
        </header>
        </div>
    )
}
