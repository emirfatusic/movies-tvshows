import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TVContext, LocationURLContext, showSearchBarContext } from '../Context';

export default function TV() { 
  const url_poster = "https://image.tmdb.org/t/p/original";
  
  var[TVList, setTVListState] = useState([]);
  const{globalTVList} = useContext(TVContext);
  const{setLocationURL} = useContext(LocationURLContext);
  const {setShowSearchBarState} = useContext(showSearchBarContext);
  setShowSearchBarState("");

  setLocationURL("tv");
  
  useEffect( () => {
      setTVListState(globalTVList);
      }, [globalTVList])
  
  TVList.splice(10);

const mapMoviesToPage = TVList.map(movie => 
  <> 
    <div className = "singleMovieContainer">   
      <Link to = {{pathname: `TV/${movie.name}`}}>
        <div className = "moviePoster">  
          <img src = {url_poster + movie.poster_path} alt = {movie.name} />
        </div>
        <div className = "movieTitle">
          <p>{movie.name}</p> 
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
