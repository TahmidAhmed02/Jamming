import Track from '../track/track.js';
import React, { useState } from 'react';
import './searchResults.css';


function SearchResult({ passedSong, artistName, tracksName }) {
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [visiblePlaylists, setVisiblePlaylists] = useState([]); // To track visibility of playlists

  // Function to handle adding a track to the current playlist
  const handleClick = (track, artistName) => {
    setCurrentPlaylist((prevPlaylist) => [...prevPlaylist, { track, artistName }]);
  };

  // Function to handle removing a track from the current playlist
  const handleDeleteTrack = (indexToRemove) => {
    setCurrentPlaylist((prevPlaylist) => 
      prevPlaylist.filter((_, index) => index !== indexToRemove)
    );
  };

  // Function to save the current playlist with a name
  const savePlaylist = () => {
    if (playlistName.trim() === '' || currentPlaylist.length === 0) {
      alert("Please provide a playlist name and add at least one song.");
      return;
    }
    
    // Add the new playlist to the list of playlists
    setPlaylists((prevPlaylists) => [
      ...prevPlaylists,
      { name: playlistName, songs: currentPlaylist, isVisible: false }
    ]);

    // Reset the current playlist and name
    setCurrentPlaylist([]);
    setPlaylistName('');
  };

  // Function to toggle visibility of songs in a playlist
  const togglePlaylistVisibility = (index) => {
    setPlaylists((prevPlaylists) => 
      prevPlaylists.map((playlist, idx) => 
        idx === index ? { ...playlist, isVisible: !playlist.isVisible } : playlist
      )
    );
  };

  // Function to delete a saved playlist
  const deletePlaylist = (indexToDelete) => {
    setPlaylists((prevPlaylists) => 
      prevPlaylists.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div>
      <h1 className='playlistHeader'>Tracks</h1>
      <ul>
        {tracksName.map((track, index) => (
          <div key={index}>
            <span className="track"> {track} <span className='italic'>by</span> {artistName}</span>
            <button className="addTrackButton" onClick={() => handleClick(track, artistName)}>+</button>
          </div>
        ))}
      </ul>

      <div className='seperate'>
      <h1 className='playlistHeader'>Playlists</h1>
      <input 
        className='playlistName'
        type="text" 
        placeholder="Enter Playlist Name" 
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <button className='savePlaylist' onClick={savePlaylist}>Save Playlist</button>
      
      {/* Render the current playlist */}
      <ul>
        {currentPlaylist.map((item, index) => (
          <div key={index}>
            <span className='track'>{item.track} by {item.artistName}</span>
            <button className='deleteTrackButton' onClick={() => handleDeleteTrack(index)}>Delete</button>
          </div>
        ))}
      </ul>

      <h4 id='myPlaylist'>My Playlists</h4>
      <ul className='playlists'>
        {playlists.map((playlist, index) => (
          <div className='playlistBorder' key={index}>
            <h3 className='playlists' >
              {playlist.name}
              <br/>
            </h3>
            {playlist.isVisible && (
              <ul>
                {playlist.songs.map((song, songIndex) => (
                  <div>
                  <span className='track' key={songIndex}>{song.track} by {song.artistName}</span>
                  </div>
                ))}
              </ul>
            )}
              <button className='hideAndDelete' onClick={() => togglePlaylistVisibility(index)}>
              {playlist.isVisible ? "Hide Songs" : "Show Songs"}
              </button>
              <button className='hideAndDelete' onClick={() => deletePlaylist(index)}>Delete Playlist</button>
          </div>
        ))}
      </ul>
      </div>

      <Track />
    </div>
  );
}

export default SearchResult;
