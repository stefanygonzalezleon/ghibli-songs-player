import { React } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

function NotFound() {
    return (
        <div className="card 1">
            <div className="card_image">
                <img className='background' src="https://wallpapercave.com/wp/wp9531750.jpg" alt='background' />
                <div className='content'>
                    <div className="card_title title-white">
                        <Link to="/" className='link'>Ghibli Songs</Link>
                        <h1>Not Found</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;