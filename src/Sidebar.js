import React from 'react'
import "./Sidebar.css"
import SidebarOptions from './SidebarOptions'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useDataLayerVaue } from './DataLayer';
import { getTokenFromResponse } from "./spotify";

function Sidebar() {
  const [{playlists},dispatch]= useDataLayerVaue();
  return (
    <div className='sidebar'>

<img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <SidebarOptions Icon={HomeIcon} title='Home'/>
      <SidebarOptions Icon={SearchIcon} title='Serach'/>
      <SidebarOptions Icon={LibraryMusicIcon} title= 'Your Library'/>
      <br/>
     <strong className='sidebar__title'>PLAYLISTS</strong>
     <hr />
    
     {playlists.items?.map((playlist) => (
        <SidebarOptions title={playlist.name} />
      ))}
	  
    </div>
  );
}


export default Sidebar