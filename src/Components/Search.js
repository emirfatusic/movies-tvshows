import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { MovieContext, TVContext, LocationURLContext, onPageLoadMoviesContext, onPageLoadTVContext, showSearchBarContext } from '../Context';

function Search() {
    const url_movies = "https://api.themoviedb.org/3/search/movie?api_key=ea51221982d56a556eae4bf95cbfc41d&query=";
    const url_tvshows = "https://api.themoviedb.org/3/search/tv?api_key=ea51221982d56a556eae4bf95cbfc41d&query=";
    
    const {locationURL} = useContext(LocationURLContext);
    const {setGlobalMovieList} = useContext(MovieContext);
    const {setGlobalTVList} = useContext(TVContext);
    const {movieListOnPageLoad} = useContext(onPageLoadMoviesContext);
    const {TVListOnPageLoad} = useContext(onPageLoadTVContext);
    const {showSearchBar} = useContext(showSearchBarContext);

    const [searchQuery, setSearchQueryState] = useState("");

    var url;
    var searchPlaceholderText = "";
    if (locationURL === "movie") {
        url = url_movies;
        searchPlaceholderText = "search for movies...";
    }
    else {
        url = url_tvshows;
        searchPlaceholderText = "search for TV shows...";
    }

    useEffect(() => {
        if(searchQuery.length >= 3){
                const delay = setTimeout ( () => {
                axios.get(url + searchQuery).then(response => {
                    const movieList = response.data.results;
                    if (locationURL === "movie") {
                    setGlobalMovieList(movieList);
                    }
                    else {
                    setGlobalTVList(movieList);
                    }
                })
                }, 1000);
            return() => clearTimeout(delay);
        }
        else{
                setGlobalMovieList(movieListOnPageLoad);
                setGlobalTVList(TVListOnPageLoad);
        }
    // Attributes in the array below define when the search should be triggered
    // The second argument defines that the search should be triggered whenever user switches between
    // "Movies" and "TV Shows" tabs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchQuery, locationURL]);
    
    return (
        <div classList = "searchWrap "style={{display: showSearchBar}}>
        <div id = "search_bar_container">
            <input type = "text" 
             className = "search_bar" 
             placeholder = {searchPlaceholderText} 
             onChange = {(event) => {
                    setSearchQueryState(event.target.value);
            }
            }>
            </input>   
        </div>
        </div>
    )
}

export default Search
