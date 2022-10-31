import { useEffect, useState } from 'react';
import React from "react";
import './App.css';
import Login from './Login';
import { getTokenFromResponse} from './spotify'
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import { useDataLayerVaue } from './DataLayer';

const spotify = new SpotifyWebApi();
function App() {
  //const [token, setToken] = useState(null);
  const [{user, token}, dispatch] = useDataLayerVaue()
  useEffect(()=>{
    const hash = getTokenFromResponse();
    window.location.hash =""
    const _token = hash.access_token
    if(_token){
      //setToken(_token);
      dispatch({
        type: 'SET_TOKEN',
        token:_token,
      } );
      spotify.setAccessToken(_token);
      spotify.getMe().then(user => {
      dispatch({
        type: 'SET_USER',
        user: user,
      });
      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });;
      

      spotify.getPlaylist("37i9dQZEVXcJZyENOWUFo7").then((response) =>
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      })
    );
    }
  },[token, dispatch]);

  return (
    <div className="app">
      {
        token ? <Player spotify={spotify}/> :   <Login/>

      }
  
    </div>
  );
}

export default App;
