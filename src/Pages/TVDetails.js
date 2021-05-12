import React, { useContext, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { TVContext, LocationURLContext, showSearchBarContext } from '../Context';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';

export default function TVDetails() {
    const url_poster = "https://image.tmdb.org/t/p/original";
    const location = useLocation();
    const {globalTVList} = useContext(TVContext);
    const {setLocationURL} = useContext(LocationURLContext);
    const {setShowSearchBarState} = useContext(showSearchBarContext);
    setShowSearchBarState("none");

    setLocationURL("tv");
    const [videoURL, setVideoURL] = useState("");
    console.log(location.pathname);
    let movieToDisplay;
    let youTubeKey;
    var hasTrailer = useRef(false);
    globalTVList.forEach(element => {
        if(`/TV/${element.name}` === location.pathname || `/movies-tvshows/TV/${element.name}` === location.pathname){
            movieToDisplay = element;
        }
    });

        let urlRequestTrailerInfo = `https://api.themoviedb.org/3/tv/${movieToDisplay.id}/videos?api_key=ea51221982d56a556eae4bf95cbfc41d&language=en-US`;
        
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
                    <img src = {url_poster + movieToDisplay.poster_path} alt = {movieToDisplay.name}/>}
                </div>
                <div className = "detailedViewTrailer">
                { hasTrailer.current && 
                <ReactPlayer url = {videoURL} controls = {true}/>}
                </div>
                <div className = "detailedViewMovieTitle">
                    <p>{movieToDisplay.name}</p> 
                </div>
                <div className = "movieDescription">
                    <p>{movieToDisplay.overview}</p>
                </div>   
        </div>
        </>
    )
}
