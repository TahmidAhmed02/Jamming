import React, { useEffect, useState } from 'react';
import SearchResult from '../searchResults/searchResults.js';
import './searchBar.css';


function SearchBar({ token }) {

    //states
    const [liveinput, setliveinput] = useState(''); //live changing input
    const [songSearched, setsongSearched] = useState(''); //send song input to api to retrieve chosen song
    const [artist, setArtist] = useState([]); 
    const [tracks, setTracks] = useState([]); //api search 
    
    //    const artistName = artist;
    const tracksName = [];
    tracks.forEach(item => tracksName.push(item.name));

    //functions
    function liveChange(event) {
        setliveinput(event.target.value); 
    }  

    async function search() {
      var artistParameters = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ` + token
          }
      };
      var artistId = await fetch(`https://api.spotify.com/v1/search?q=${songSearched}&type=track,artist&limit=7`, artistParameters)
        .then(response => response.json())
        .then(data => {
            setArtist(data.artists.items[0].name); // Added optional chaining to avoid errors
          });
      var tracksId = await fetch(`https://api.spotify.com/v1/search?q=${songSearched}&type=track,artist&limit=7`, artistParameters)
        .then(response => response.json())
        .then(data => {
            setTracks(data.tracks.items); // Added optional chaining to avoid errors
          });
    }



    // Use useEffect to call search() whenever songSearched is updated
    useEffect(() => {
        if (songSearched) {
            search();
        }
    }, [songSearched]);


    //return
    return (
      <div>
        <h1 id='jamming'>JAMMMING</h1>
        <input className='input' type="text" placeholder="Search for Songs" onChange={liveChange}/>
        <button className='button' onClick={() => setsongSearched(liveinput)}>Search</button>
        <SearchResult passedSong={songSearched} artistName={artist} tracksName={tracksName} />

      </div>
    );
}

export default SearchBar;
