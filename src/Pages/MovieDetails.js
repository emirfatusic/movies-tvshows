import React, { useContext, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { LocationURLContext, MovieContext, showSearchBarContext } from '../Context';
import axios from 'axios';
import ReactPlayer from 'react-player';

export default function MovieDetails() {
    
    const url_poster = "https://image.tmdb.org/t/p/original";
    const location = useLocation();
    const {globalMovieList} = useContext(MovieContext);
    const {setLocationURL} = useContext(LocationURLContext);
    const {setShowSearchBarState} = useContext(showSearchBarContext);
    setShowSearchBarState("none");

    setLocationURL("movie");
    const [videoURL, setVideoURL] = useState("");

    
    let movieToDisplay;
    let youTubeKey;
    var hasTrailer = useRef(false);

    globalMovieList.forEach(element => {
        if(`/movies/${element.title}` === location.pathname){
            movieToDisplay = element;
        }
    });
    
        let urlRequestTrailerInfo = `https://api.themoviedb.org/3/movie/${movieToDisplay.id}/videos?api_key=ea51221982d56a556eae4bf95cbfc41d&language=en-US`;
        
        axios.get(urlRequestTrailerInfo).then((response)=>{
            const trailerInfo = response.data.results;
            if (trailerInfo.length === 0){
                hasTrailer.current = false;
            }
            else {
                hasTrailer.current = true;
                youTubeKey = trailerInfo[0].key;
                setVideoURL("https://www.youtube.com/watch?v=" + youTubeKey);
            }
        })

    return (
        <>   
        <div className = "movieDetailedView">
        <div>
            <button className = "button2 backButton" onClick ={useHistory().goBack}> &#60; Back</button>
        </div> 
                <div className = "detailedViewPoster">
                    { !hasTrailer.current &&
                    <img src = {url_poster + movieToDisplay.poster_path} alt = {movieToDisplay.title}/>}
                </div>
                <div className = "detailedViewTrailer">
                { hasTrailer.current && 
                <ReactPlayer url = {videoURL} controls = {true}/>}
                </div>
                <div className = "detailedViewMovieTitle">
                    <p>{movieToDisplay.title}</p> 
                </div>
                <div className = "movieDescription">
                    <p>{movieToDisplay.overview}</p>
                </div>   
        </div>
        </>
    )
}
