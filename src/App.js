import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=2a38167'

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {

    searchMovie();

  }, [])


  return (
    <div className="app">
      <h1>MovieFlix</h1>

      <div className='search'>
        <input
          placeholder='Search for movies'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search-icon'
          onClick={() => searchMovie(search)}
        />
      </div>

      {
        movies.length > 0
          ? (
            <div className='container'>

              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}

            </div>
          )
          : (
            <div className='empty'>
              <h2>No Movies Found</h2>
            </div>
          )
      }


    </div>
  );
}

export default App;
