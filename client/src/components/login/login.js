import React, {useState, useEffect} from 'react';
import SearchBar from '../searchBar/searchBar.js';

const CLIENT_ID = 'd23e9a773f1a43adb4b82fa6fecbb149';
const CLIENT_SECRET = "fc68ef62b2cb4c2ba3d15e0d36081c7e";

function Login() {

    const [token, setToken] = useState('');



    //const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=beae9b4dc3ff424bb9f29cb50ceb29d7&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
    //const redirect_uri = () => {
    //    window.location.href = AUTH_URL
    //}

    useEffect(() => {
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setToken(data.access_token))
    }, []) 



//return
  return (
  <div>
    <SearchBar token={token}/>
  </div>
)
}

export default Login;