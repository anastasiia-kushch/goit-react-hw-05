import { useEffect, useState } from 'react';
import { searchMovieByQuery } from '../../api';
import { Formik, Form, Field } from 'formik';
import MovieList from '../../components/MovieList/MovieList';
import { useId } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMsg from '../../components/ErrorMessage/ErrorMessage';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import css from '../MoviesPage/MoviesPage.module.css'

const initialValues = {
  query: '',
};


export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const nameFieldId = useId();

  const searchQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    const fetchByQuery = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await searchMovieByQuery(searchQuery);
        setMovies(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchByQuery(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (values, actions) => {
    searchParams.set('query', values.query);
    setSearchParams(searchParams);
    
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <Field type="text" name="query" id={nameFieldId} className={css.input} placeholder="Search movies.."></Field>
          <button type="submit" className={css.button}> <FiSearch /></button>
        </Form>
      </Formik>

      {movies !== null && <MovieList films={movies} />}
      {isLoading && <Loader />}
      {isError && <ErrorMsg />}
    </div>
  );
}
