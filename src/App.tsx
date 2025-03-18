import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';
import { v4 as uuidv4 } from 'uuid'; // UUID library import

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);

  const handleAddMovie = (newMovie: Movie) => {
    setMovies(prevMovies => [
      ...prevMovies,
      { ...newMovie, id: uuidv4() }, // Use UUID for generating unique ID
    ]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie key={movies.length} onAdd={handleAddMovie} />
      </div>
    </div>
  );
};
