import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const urlPattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (name: keyof Movie, value: string) => {
    setMovie(prev => ({ ...prev, [name]: value }));
  };

  const isValid = (): boolean => {
    return (
      movie.title.trim() !== '' &&
      movie.imgUrl.trim() !== '' &&
      movie.imdbUrl.trim() !== '' &&
      movie.imdbId.trim() !== '' &&
      urlPattern.test(movie.imgUrl) &&
      urlPattern.test(movie.imdbUrl)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }

    onAdd({ ...movie });

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setTouched({});
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value => handleChange('title', value)}
        required
        data-cy="movie-title"
      />
      {touched.title && !movie.title.trim() && (
        <p className="help is-danger">Title is required</p>
      )}

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => handleChange('description', value)}
        data-cy="movie-description"
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        required
        data-cy="movie-imgUrl"
      />
      {touched.imgUrl && !urlPattern.test(movie.imgUrl) && (
        <p className="help is-danger">Invalid URL</p>
      )}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
        data-cy="movie-imdbUrl"
      />
      {touched.imdbUrl && !urlPattern.test(movie.imdbUrl) && (
        <p className="help is-danger">Invalid URL</p>
      )}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value => handleChange('imdbId', value)}
        required
        data-cy="movie-imdbId"
      />
      {touched.imdbId && !movie.imdbId.trim() && (
        <p className="help is-danger">IMDB ID is required</p>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
