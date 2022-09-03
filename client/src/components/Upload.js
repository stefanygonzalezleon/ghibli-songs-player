import { React } from 'react'
import { Link } from "react-router-dom";
import '../App.css';

function Upload() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const apiUrl = process.env.API_URL;
        const { title, artistName, genres, date, song, cover } = event.target;
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('artistName', artistName.value);
        formData.append('genres', genres.value);
        formData.append('date', date.value);
        formData.append('song', song.files[0]);
        formData.append('cover', cover.files[0]);
        fetch(apiUrl + "songs", {
            method: 'POST',
            contentType: 'multipart/form-data',
            body: formData
        }).then((response) => console.log(response));
    }

    return (
        <div className="card 1">
            <div className="card_image">
                <img className='background' src="https://wallpapercave.com/wp/wp9531750.jpg" alt='background' />
                <div className='content'>
                    <div className="card_title title-white">
                        <Link to="/" className='link'>Ghibli Songs</Link>
                        <h1>Upload Songs</h1>
                    </div>
                    <div className='form'>
                        <form onSubmit={handleSubmit}>
                            <div className='input-container'><label>title</label><input type="text" name="title" required /></div>
                            <div className='input-container'> <label>artistName</label><input type="text" name="artistName" required /></div>
                            <div className='input-container'><label>genres</label> <input type="text" name="genres" required /></div>
                            <div className='input-container'> <label>date</label><input type="date" name="date" required /></div>
                            <div className='input-container'> <label>song</label><input type="file" name="song" required /></div>
                            <div className='input-container'> <label>cover</label><input className='file' type="file" name="cover" required /></div>
                            <div className='submit-container'><input type="submit" value="Guardar" /></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload;