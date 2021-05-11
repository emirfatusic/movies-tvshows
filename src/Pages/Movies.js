import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext, LocationURLContext, showSearchBarContext } from '../Context';

export default function Movies() {
  const url_poster = "https://image.tmdb.org/t/p/original";
  
  var[moviesList, setMoviesListState] = useState([]);
  const {globalMovieList} = useContext(MovieContext);
  const {setLocationURL} = useContext(LocationURLContext);
  const {setShowSearchBarState} = useContext(showSearchBarContext);
  setShowSearchBarState("");
  setLocationURL("movie");

  useEffect( () => {  
      setMoviesListState(globalMovieList);
      }, [globalMovieList]);
      
  moviesList.splice(10);

const mapMoviesToPage = moviesList.map(movie => 
  <> 
    <div className = "singleMovieContainer">   
      <Link to = {{pathname: `movies/${movie.title}`}}>
        <div className = "moviePoster">  
          <img src = {url_poster + movie.poster_path} alt = {movie.title} />
        </div>
        <div className = "movieTitle">
          <p>{movie.title}</p> 
        </div> 
      </Link>
    </div>  
  </>)
  return (
    <div className = "movieContainer">
      { mapMoviesToPage }
    </div>
  )
}
