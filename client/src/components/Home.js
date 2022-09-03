import { React, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import '../App.css';

function Home() {
    const apiUrl = process.env.API_URL;
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);

    useEffect(() => {
        getSongs();
    }, []);

    const getSongs = async () => {
        const response = await fetch(apiUrl + "songs");
        const data = await response.json();
        setSongs(data);
    }

    const renderListOfSongs = (list) => {
        return list.map(song =>
            <div className='song' key={song._id} onClick={() => setSelectedSong(song)}>
                <img className='artwork' src={apiUrl + song.cover} alt={song.title} />
            </div>
        )
    }

    const renderSelectedSongs = (item) => {
        return (
            <>
                <img className='artworkS' src={apiUrl + selectedSong.cover} alt={selectedSong.title} />
                <h2>{selectedSong.title}</h2>
                <p>{selectedSong.artistName}</p>
                <p>{selectedSong.genres}</p>
                <audio src={apiUrl + selectedSong.fileName} controls>
                    <source src={apiUrl + selectedSong.fileName} type="audio/mpeg" />
                </audio>
            </>
        )
    }

    return (
        <div className="card 1">
            <div className="card_image">
                <img className='background' src="https://wallpapercave.com/wp/wp9531750.jpg" alt='background' />
                <div className='content'>
                    <div className="card_title title-white">
                        <Link to="/upload" className='link'>Upload Songs</Link>
                        <h1>Studio Ghibli</h1>
                    </div>
                    <div className='scroll'>{songs != null ? renderListOfSongs(songs) : null}</div>
                    <div className='player'>
                        {selectedSong != null ? renderSelectedSongs(selectedSong) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;