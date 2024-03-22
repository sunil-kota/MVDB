import { useEffect, useState } from 'react';
import './App.css';
import MovieList from './components/MovieList/MovieList';
import SearchBox from './components/searchBox/SearchBox';
import MovieListHeading from './components/movieListHeading/MovieListHeading';
import AddToFavourites from './components/favourites/AddToFavourites';
import RemoveFromFavourites from './components/favourites/RemoveFromFavourites';





function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('avengers');
  const [favourites, setFavourites] = useState([]);


  useEffect(() => {
    fetchMovies(searchValue);
  }, [searchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('mvdb-favourites'));
    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    try {
      localStorage.setItem('mvdb-favourites', JSON.stringify(items));
    }
    catch (error) {
      console.error('Error saving to local Storage: ', error);
    }
  };

  const fetchMovies = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=990c3e8f`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.Search) {
      setMovies(data.Search);
    }
  }

  const addFavouriteMovie = (movie) => {
    if (!favourites) {
      setFavourites([movie]);
    }
    else if (!favourites.includes(movie)) {
      setFavourites((prev) => {
        const updatedFavourites = [...prev, movie];
        saveToLocalStorage(updatedFavourites);
        return updatedFavourites;
      });
    }
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourites) => favourites.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }



  console.log('favourite movies:', favourites);
  return (
    <div className="App">

      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />

      <MovieListHeading name='Search results' />
      <MovieList
        movies={movies}
        handleFavouritesClick={addFavouriteMovie} 
        favouriteComponent={AddToFavourites} />

      <MovieListHeading name='Favorites' />
      <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie}
        favouriteComponent={RemoveFromFavourites} />


      <MovieListHeading name='Top 10 this week' />
      <MovieList
        movies={movies}
        handleFavouritesClick={addFavouriteMovie}
        favouriteComponent={AddToFavourites}
      />


      <MovieListHeading name='Popular movies and TV shows' />
      <MovieList
        movies={movies}
        handleFavouritesClick={addFavouriteMovie}
        favouriteComponent={AddToFavourites}
      />

      <MovieListHeading name='Thriller and Suspense' />
      <MovieList
        movies={movies}
        handleFavouritesClick={addFavouriteMovie}
        favouriteComponent={AddToFavourites}
      />

      <MovieListHeading name='Action & Adventure' />
      <MovieList
        movies={movies}
        handleFavouritesClick={addFavouriteMovie}
        favouriteComponent={AddToFavourites}
      />

      <MovieListHeading name='Comedy and Drama' />
      <MovieList
        movies={movies}
        handleFavouritesClick={addFavouriteMovie}
        favouriteComponent={AddToFavourites}
      />

    </div>
  );
}

export default App;
