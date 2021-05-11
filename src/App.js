import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from './Components/Search';
import Header from './Components/Header';
import Movies from './Pages/Movies';
import TV from './Pages/TV';
import MovieDetails from './Pages/MovieDetails';
import TVDetails from './Pages/TVDetails';
import { MovieContext, TVContext, LocationURLContext,onPageLoadMoviesContext, onPageLoadTVContext, showSearchBarContext } from './Context';
import axios from 'axios';

function App() {  
const url_top10movies = "https://api.themoviedb.org/3/movie/top_rated?api_key=ea51221982d56a556eae4bf95cbfc41d&language=en-US&page=1";
const url_top10tv = "https://api.themoviedb.org/3/tv/top_rated?api_key=ea51221982d56a556eae4bf95cbfc41d&language=en-US&page=1";   

const [globalMovieList, setGlobalMovieList] = useState([]);
const [globalTVList, setGlobalTVList] = useState([]);
const [locationURL, setLocationURL] = useState("");
//state below is used to store retrieved top 10 movies and tv data on page load to reduce number of api calls
const [movieListOnPageLoad, setmovieLIstOnPageLoad] = useState([]);
const [TVListOnPageLoad, setTVListOnPageLoad] = useState([]);
const [showSearchBar, setShowSearchBarState] = useState("");


useEffect( () => {  
  axios.get(url_top10movies).then(resp => {
    const movieList = resp.data.results;
    setGlobalMovieList(movieList);
    setmovieLIstOnPageLoad(movieList);
  })

  axios.get(url_top10tv).then(resp => {
    const tvList = resp.data.results;
    setGlobalTVList(tvList);
    setTVListOnPageLoad(tvList);
  })
}, []);

  return(
    <>
    <Router>
    <MovieContext.Provider value={{globalMovieList, setGlobalMovieList}}>
    <TVContext.Provider value={{globalTVList, setGlobalTVList}}>
    <LocationURLContext.Provider value={{locationURL, setLocationURL}}>
    <onPageLoadMoviesContext.Provider value={{movieListOnPageLoad}}>
    <onPageLoadTVContext.Provider value={{TVListOnPageLoad}}>
    <showSearchBarContext.Provider value={{showSearchBar, setShowSearchBarState}}>
    <Header/>
    <Search/>
      <Switch>
        <Route path = "/" exact component = {TV}/>
        <Route path = "/tv" exact component = {TV}/>
        <Route path = "/movies-tvshows" exact component = {TV}/>
        <Route path = "/movies/*" exact component = {MovieDetails}/>
        <Route path = "/TV/*" exact component = {TVDetails}/>
        <Route path = "/movies" exact component = {Movies}/>
      </Switch>
    </showSearchBarContext.Provider>
    </onPageLoadTVContext.Provider>
    </onPageLoadMoviesContext.Provider>
    </LocationURLContext.Provider>
    </TVContext.Provider> 
    </MovieContext.Provider>
    </Router>
    </>
  );
}

export default App;
