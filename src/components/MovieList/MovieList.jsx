import React from "react";
import './MovieList.css';



const MovieList = (props) => {

    const FavouriteComponent=props.favouriteComponent;

    if (!Array.isArray(props.movies)) {
        return <div>No movies available</div>; 
      }
    
    return (
        <div className="movieItems">
            {props.movies?.map((movie, index) => (
                <div className="image-container" >
                    <img src={movie.Poster} alt="movie" />
                    <div onClick={()=>props.handleFavouritesClick(movie)} className="addfavourite">
                        <FavouriteComponent/>
                    </div> 
                </div>
            ))}
        </div>
    )
}

export default MovieList;