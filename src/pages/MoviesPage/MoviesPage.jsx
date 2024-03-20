import { useEffect, useState } from 'react';
import { searchMovieByQuery } from '../../api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MovieList from '../../components/MovieList/MovieList';
import * as Yup from 'yup';
import { useId } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMsg from '../../components/ErrorMessage/ErrorMessage';

const initialValues = {
  query: '',
};

const FormSchema = Yup.object().shape({
  query: Yup.string()
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
});

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const nameFieldId = useId();

  useEffect(() => {
    const fetchByQuery = async (searchQuery) => {
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
    setSearchQuery(values.query);

    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FormSchema}
      >
        <Form>
          <Field type="text" name="query" id={nameFieldId}></Field>
          <ErrorMessage
            type="text"
            name="query"
            component="p"
            //className={css.error}
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>

      {movies !== null && <MovieList films={movies} />}
      {isLoading && <Loader />}
      {isError && <ErrorMsg />}
    </div>
  );
}
